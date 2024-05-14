import fs from 'fs';
import path from 'path';
import styles from '@/App/post/[tag]/[fileName]/_components/styles/Post.module.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import PostHeader from '@/App/post/[tag]/[fileName]/_components/PostHeader';
import matter from 'gray-matter';
import { getTags } from '@/Lib/post';
import Link from 'next/link';

type TCustomMDXProps = {
  tag: string,
  fileName: string,
};

export default async function Post({
  tag,
  fileName,
}: TCustomMDXProps) {
  const tags = await getTags();
  const filePath = path.join(process.cwd(), 'posts', tag, `${fileName}.mdx`);
  const mdxSource = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(mdxSource);

  const options = {
    theme: 'one-dark-pro',
  };

  return (
    <>
      <PostHeader
        info={data} />
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
        </article>
        <aside className={styles.aside}>
          <span className={styles.tags}>TAG LIST</span>
          <div className={styles.tagList}>
            {
              tags.map((tag: string, idx: number) => {
                return (
                  <Link
                    key={tag+idx}
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
    </>
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
    <p style={{ fontSize: '20px', lineHeight: '2em' }}>
      {props.children}
    </p>
  ),
};