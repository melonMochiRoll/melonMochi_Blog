import { TPostInfo } from "@Typings/post";

export const TAGLIST = {
  React: 'React',
  Javascript: 'Javascript',
  Typescript: 'Typescript',
  ETC: 'etc',
} as const;

/** 
 * format: require('./folderName').info
 * 인덱스 0번에 가까울수록 최신
 */
const postList: TPostInfo[] =
[
  // require('./Eighth_Post').info,
  // require('./Seventh_Post').info,
  // require('./Sixth_Post').info,
  // require('./Fifth_Post').info,
  // require('./Fourth_Post').info,
  // require('./Third_Post').info,
  // require('./Second_Post').info,
  // require('./First_Post').info,
];

export const getPosts = (
  startIdx: number,
  endIdx: number,
  ) => {
  return postList.slice(startIdx, endIdx);
};

export const getPostsByTag = (
  tag: string,
  cursor: number,
  ) => {
  const result: TPostInfo[] = [];
  let lastCursor = 0;

  for (let i=cursor; i<postList.length; i++) {
    if (result.length > 5) {
      break;
    }

    const post = postList[i];
    lastCursor = i;

    if (post.tags.includes(tag)) {
      result.push(post);
    }
  }

  return { posts: result, lastCursor: lastCursor + 1 };
};