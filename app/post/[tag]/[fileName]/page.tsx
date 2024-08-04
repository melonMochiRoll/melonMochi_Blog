import fs from 'fs';
import path from "path";
import { notFound } from 'next/navigation';
import matter from 'gray-matter';
import { Suspense } from "react";
import Loading from "@/App/post/[tag]/[fileName]/loading";
import PostHeader from '@/App/post/[tag]/[fileName]/_components/PostHeader';
import PostMain from '@/App/post/[tag]/[fileName]/_components/PostMain';
import { getPost, getTags, parseTOC } from '@/Lib/post';
import { blogBaseURL, blogDescription, blogName } from '@/Lib/const';

type TPostPageProps = {
  params: {
    tag: string,
    fileName: string,
  },
};

export async function generateMetadata({
  params,
}: TPostPageProps) {
  const { tag, fileName } = params;
  const { metadata } = await getPost({ tag, fileName });

  return {
    title: `${metadata?.title || ''} | ${blogName}`,
    description: blogDescription,
    openGraph: {
      title: `${metadata?.title || ''} | ${blogName}`,
      description: blogDescription,
      images: [ `${blogBaseURL}${metadata?.thumbnail}` ],
      type: 'article',
    },
  };
}

export default async function PostPage({
  params,
}: TPostPageProps) {
  const { tag, fileName } = params;
  const tags = await getTags();
  const { metadata, content } = await getPost({ tag, fileName });
  const toc = await parseTOC(content);

  if (!metadata) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <PostHeader
        metadata={metadata} />
      <PostMain
        tags={tags}
        toc={toc}
        content={content} />
    </Suspense>
  );
}