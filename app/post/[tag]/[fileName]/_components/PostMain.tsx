import styles from '@/App/post/[tag]/[fileName]/_components/styles/PostMain.module.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import Comments from './Comments';
import { TTableOfContent } from '@/Lib/typing';
import rehypeSlug from 'rehype-slug';
import TableOfContent from '@/App/post/[tag]/[fileName]/_components/TableOfContent';
import TagList from '@/App/post/[tag]/[fileName]/_components/TagList';

type TPostMainProps = {
  tags: string[],
  toc: TTableOfContent[],
  content: string,
}

export default function PostMain({
  tags,
  toc,
  content,
}: TPostMainProps) {
  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <TagList
          tags={tags} />
      </aside>
      <article className={styles.article}>
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [ rehypePrettyCode as any, { theme: 'one-dark-pro' } ],
                rehypeSlug,
              ],
            }
          }} />
        <Comments />
      </article>
      <aside className={styles.aside}>
        <TableOfContent
          toc={toc} />
      </aside>
    </main>
  );
}