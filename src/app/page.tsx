import Header from '@/App/_components/Header';
import ArticleList from '@/App/_components/ArticleList';
import { getRecentPosts } from '@/Lib/post';

export default async function RootPage() {
  const posts = await getRecentPosts();

  return (
    <>
      <Header />
      <ArticleList
        posts={posts} />
    </>
  );
};