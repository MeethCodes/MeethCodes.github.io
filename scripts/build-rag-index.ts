import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { ragSourceChunks } from "../src/data/rag-chunks";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "../public/rag/chunks.json");

mkdirSync(dirname(outPath), { recursive: true });

const chunks = ragSourceChunks.map((chunk) => ({
  ...chunk,
  keywords: chunk.text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3),
}));

writeFileSync(outPath, JSON.stringify({ version: 1, chunks }, null, 2));
console.log(`Wrote ${chunks.length} RAG chunks to public/rag/chunks.json`);
