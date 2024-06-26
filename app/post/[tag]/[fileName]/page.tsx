import fs from 'fs';
import path from "path";
import matter from 'gray-matter';
import { Suspense } from "react";
import Loading from "@/App/post/[tag]/[fileName]/loading";
import PostHeader from '@/App/post/[tag]/[fileName]/_components/PostHeader';
import PostMain from '@/App/post/[tag]/[fileName]/_components/PostMain';
import { getTags, parseTOC } from '@/Lib/post';
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
  const filePath = path.join(process.cwd(), 'posts', tag, `${fileName}.mdx`);
  const mdxSource = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(mdxSource);

  return {
    title: `${data.title || ''} | ${blogName}`,
    description: blogDescription,
    openGraph: {
      title: `${data.title || ''} | ${blogName}`,
      description: blogDescription,
      images: [ `${blogBaseURL}${data.thumbnail}` ],
      type: 'article',
    },
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
  const toc = await parseTOC(content);

  return (
    <Suspense fallback={<Loading />}>
      <PostHeader
        info={data} />
      <PostMain
        tags={tags}
        toc={toc}
        content={content} />
    </Suspense>
  );
}