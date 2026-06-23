export interface Env {
  GROQ_API_KEY: string;
  CHUNKS_URL?: string;
  ALLOWED_ORIGIN?: string;
}

type Chunk = {
  id: string;
  category: string;
  text: string;
  keywords: string[];
};

type ChunksFile = {
  version: number;
  chunks: Chunk[];
};

const DEFAULT_CHUNKS_URL = "https://meethcodes.github.io/rag/chunks.json";

function scoreChunk(chunk: Chunk, query: string): number {
  const q = query.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  let score = 0;
  const text = chunk.text.toLowerCase();
  for (const word of q) {
    if (text.includes(word)) score += 2;
    if (chunk.keywords?.includes(word)) score += 1;
  }
  return score;
}

function retrieveTopK(chunks: Chunk[], query: string, k = 3): Chunk[] {
  return [...chunks]
    .map((c) => ({ chunk: c, score: scoreChunk(c, query) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((x) => x.chunk);
}

async function getChunks(env: Env): Promise<Chunk[]> {
  const url = env.CHUNKS_URL || DEFAULT_CHUNKS_URL;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load knowledge base");
  const data: ChunksFile = await res.json();
  return data.chunks;
}

async function askGroq(apiKey: string, context: string, question: string): Promise<string> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are Meeth Amin's portfolio assistant. Answer ONLY using the context below. Be concise, friendly, and professional. If the answer isn't in the context, say you don't have that info and suggest contacting Meeth at aminmeeth89@gmail.com.

Context:
${context}`,
        },
        { role: "user", content: question },
      ],
      max_tokens: 400,
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
}

function corsHeaders(origin: string, allowed: string) {
  const allow = origin === allowed || allowed === "*" ? origin || allowed : allowed;
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowed = env.ALLOWED_ORIGIN || "https://meethcodes.github.io";
    const origin = request.headers.get("Origin") || "";
    const headers = corsHeaders(origin, allowed);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/health") {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    if (request.method !== "POST" || url.pathname !== "/chat") {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    try {
      const { message } = (await request.json()) as { message?: string };
      if (!message?.trim()) {
        return new Response(JSON.stringify({ error: "Message required" }), {
          status: 400,
          headers: { ...headers, "Content-Type": "application/json" },
        });
      }

      if (!env.GROQ_API_KEY) {
        return new Response(
          JSON.stringify({
            error: "Chat API not configured. Set GROQ_API_KEY secret.",
          }),
          { status: 503, headers: { ...headers, "Content-Type": "application/json" } },
        );
      }

      const chunks = await getChunks(env);
      const relevant = retrieveTopK(chunks, message);
      const context =
        relevant.length > 0
          ? relevant.map((c) => c.text).join("\n\n")
          : chunks.map((c) => c.text).join("\n\n");

      const reply = await askGroq(env.GROQ_API_KEY, context, message);

      return new Response(JSON.stringify({ reply }), {
        headers: { ...headers, "Content-Type": "application/json" },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      return new Response(JSON.stringify({ error: msg }), {
        status: 500,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }
  },
};
