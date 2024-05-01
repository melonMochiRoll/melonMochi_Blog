import Header from "@/App/_components/Header";
import PostsByTag from "@/App/posts/[tag]/_components/PostsByTag";

type TPostsPageProps = {
  params: { tag: string },
};

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