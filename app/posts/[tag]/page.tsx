import Header from "@/App/_components/Header";
import { metadata } from "@/App/layout";
import PostsByTag from "@/App/posts/[tag]/_components/PostsByTag";

type TPostsPageProps = {
  params: { tag: string },
};

export async function generateMetadata({
  params,
}: TPostsPageProps) {
  return {
    title: `${params.tag} | ${metadata.title}`,
  };
}

export default async function PostsPage({
  params,
}: TPostsPageProps) {
  const { tag } = params;

  return (
    <>
      <Header
        tag={tag} />
      <PostsByTag
        tag={tag} />
    </>
  );
}