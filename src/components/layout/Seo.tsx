import { Helmet } from "react-helmet-async";
import { profile } from "@/data/profile";

export default function Seo() {
  const title = `${profile.name} | ${profile.title}`;
  const description =
    "AIML Engineer building automation systems, RAG pipelines, and intelligent products in Mumbai, India. Open to work.";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/og-image.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
