import fs from 'fs';
import path from "path";
import matter from 'gray-matter';
import { Suspense } from "react";
import Loading from "@/App/post/[tag]/[fileName]/loading";
import { metadata } from '@/App/layout';
import PostHeader from '@/App/post/[tag]/[fileName]/_components/PostHeader';
import PostMain from '@/App/post/[tag]/[fileName]/_components/PostMain';
import { getTags } from '@/Lib/post';

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
  const filePath = path.join(process.cwd(), 'posts', tag, `${fileName}.mdx`);
  const mdxSource = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(mdxSource);

  return {
    title: `${data.title || ''} | ${metadata.title}`,
  };
}

export default async function PostPage({
  params,
}: TPostPageProps) {
  const { tag, fileName } = params;
  const tags = await getTags();
  const filePath = path.join(process.cwd(), 'posts', tag, `${fileName}.mdx`);
  const mdxSource = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(mdxSource);

  return (
    <Suspense fallback={<Loading />}>
      <PostHeader
        info={data} />
      <PostMain
        tags={tags}
        content={content} />
    </Suspense>
  );
}