import styles from '@/App/post/[tag]/[fileName]/_components/styles/PostMain.module.css';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import Comments from './Comments';
import { TTableOfContent } from '@/Lib/typing';
import rehypeSlug from 'rehype-slug';
import TableOfContent from '@/App/post/[tag]/[fileName]/_components/TableOfContent';

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
        <div className={styles.tags}>
          <strong>TAG LIST</strong>
          <div className={styles.tagList}>
            {
              tags.map((tag: string, idx: number) => {
                return <Link
                  key={tag + idx}
                  href={`/posts/${tag}`}>
                  {tag}
                </Link>;
              })
            }
          </div>
        </div>
      </aside>
      <article className={styles.article}>
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [ rehypePrettyCode as any, options ],
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

const options = {
  theme: 'one-dark-pro',
};