
import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import { getTableOfContents } from "@/lib/toc";

import "@/styles/mdx.css";
import BlogContent from "@/components/blogContent";

interface DocPageProps {
  params: {
    slug: string;
  };
}

async function getDocFromParams({ params }: DocPageProps) {
  const { slug } = await params;

  const doc = allBlogs.find((blog) => blog.slugAsParams === slug);

  if (!doc) {
    return null;
  }

  return doc;
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <BlogContent doc={doc} toc={toc} />
  );
}
