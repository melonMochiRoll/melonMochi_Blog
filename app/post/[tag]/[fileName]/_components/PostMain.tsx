import styles from '@/App/post/[tag]/[fileName]/_components/styles/PostMain.module.css';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import Comments from './Comments';

type TPostMainProps = {
  tags: string[],
  content: string,
}

export default function PostMain({
  tags,
  content,
}: TPostMainProps) {

  return (
  <main className={styles.main}>
    <aside className={styles.aside} />
    <article className={styles.article}>
      <MDXRemote
        source={content}
        components={components}
        options={{ mdxOptions: {
          rehypePlugins: [
            [ rehypePrettyCode as any, options ],
          ],
        }
      }}/>
      <Comments />
    </article>
    <aside className={styles.aside}>
      <span className={styles.tags}>TAG LIST</span>
      <div className={styles.tagList}>
        {
          tags.map((tag: string, idx: number) => {
            return (
              <Link
                key={tag + idx}
                className={styles.tag}
                href={`/posts/${tag}`}>
                {tag}
              </Link>
            );
          })
        }
      </div>
    </aside>
  </main>
  );
}

const components = {
  h1: (props: any) => (
    <h1 style={{ fontSize: '48px', marginTop: '50px', }}>
      {props.children}
    </h1>
  ),
  h2: (props: any) => (
    <h2 style={{
      fontSize: '36px',
      marginTop: '50px',
      borderBottom: '2px solid #e3e3e3',
      paddingBottom: '25px',
    }}>
      {props.children}
    </h2>
  ),
  p: (props: any) => (
    <p style={{ fontSize: '17px', lineHeight: '2em' }}>
      {props.children}
    </p>
  ),
};

const options = {
  theme: 'one-dark-pro',
};