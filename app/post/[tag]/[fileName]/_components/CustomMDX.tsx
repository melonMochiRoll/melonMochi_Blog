import fs from 'fs';
import path from 'path';
import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import PostHeader from '@/App/post/[tag]/[fileName]/_components/PostHeader';
import Content from '@/App/post/[tag]/[fileName]/_components/Content';
import matter from 'gray-matter';

type TCustomMDXProps = {
  tag: string,
  fileName: string,
};

export default async function CustomMDX({
  tag,
  fileName,
}: TCustomMDXProps) {
  const filePath = path.join(process.cwd(), 'posts', tag, `${fileName}.mdx`);
  const mdxSource = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(mdxSource);

  return (
    <>
      <PostHeader
        info={data} />
      <Content>
        <MDXRemote
          source={content}
          components={components}
          options={{ mdxOptions: {
            rehypePlugins: [ rehypeHighlight as any ],
          }
        }}/>
      </Content>
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
  pre: (props: any) => (
    <pre style={{ margin: '50px 0' }}>
      {props.children}
    </pre>
  ),
};