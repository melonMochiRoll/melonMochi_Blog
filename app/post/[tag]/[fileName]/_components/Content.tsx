import styles from '@/App/post/[tag]/[fileName]/_components/styles/Content.module.css';
import 'highlight.js/styles/github-dark.min.css';

type TContentProps = {
  children?: React.ReactNode,
};

export default function Content({
  children,
}: TContentProps) {

  return (
    <article className={styles.article}>
      {children}
    </article>
  );
}