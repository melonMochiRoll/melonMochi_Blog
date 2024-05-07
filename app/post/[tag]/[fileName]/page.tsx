import fs from 'fs';
import path from "path";
import matter from 'gray-matter';
import { Suspense } from "react";
import CustomMDX from "@/App/post/[tag]/[fileName]/_components/CustomMDX";
import Loading from "@/App/post/[tag]/[fileName]/loading";
import { metadata } from '@/App/layout';
import FixedBox from './_components/FixedBox';

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

export default function PostPage({
  params,
}: TPostPageProps) {
  const { tag, fileName } = params;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <CustomMDX
          tag={tag}
          fileName={fileName} />
      </Suspense>
      <FixedBox />
    </>
  );
}