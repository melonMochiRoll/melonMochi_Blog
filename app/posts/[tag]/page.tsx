import Header from "@/App/_components/Header";
import PostsByTag from "@/App/posts/[tag]/_components/PostsByTag";
import { blogName } from "@/Lib/const";

type TPostsPageProps = {
  params: { tag: string },
};

export async function generateMetadata({
  params,
}: TPostsPageProps) {
  return {
    title: `${params.tag} | ${blogName}`,
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