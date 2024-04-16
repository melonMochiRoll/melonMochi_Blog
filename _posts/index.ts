import { TPostInfo } from "@Typings/post";

export const TAGLIST = {
  React: 'React',
  Javascript: 'Javascript',
  Typescript: 'Typescript',
  etc: 'etc',
} as const;

const lastSequence = 2;

export const leftPad = (
  num: number,
  length: number,
  ) => {
  const str = `${num}`;
  const cnt = length - str.length;

  if (str.length >= length) return str;

  return '0'.repeat(cnt) + str;
};

export const getPost = (num: number) => {
  try {
    const info = require(`./${leftPad(num, 5)}`);
    return info;
  } catch (err) {
    return false;
  }
};

export const getPosts = (
  cursor?: number,
  limit?: number,
  skipPostName?: string,
  ) => {
  const posts: TPostInfo[] = [];

  if (cursor == undefined) {
    cursor = lastSequence;
  }

  limit = limit == undefined ?
    5 : limit - 1;

  for (let i=cursor; i>0; i--) {
    if (posts.length > limit) break;

    const result = getPost(i);

    if (skipPostName === result?.info?.fileName) {
      continue;
    }

    if (result) {
      posts.push(result.info);
      cursor = i;
    }
  }

  return posts.length ?
    { posts, cursor: cursor - 1 } :
    { posts: [], cursor: 0 };
};

export const getPostsByTag = (
  tag?: string,
  cursor?: number,
  ) => {
  const posts: TPostInfo[] = [];

  if (!tag || !TAGLIST.hasOwnProperty(tag)) {
    return { posts: [], cursor: 0 };
  }

  if (cursor == undefined) {
    cursor = lastSequence;
  }

  for (let i=cursor; i>0; i--) {
    if (posts.length > 5) break;

    const result = getPost(i);

    if (result && result.info.tags.includes(tag)) {
      posts.push(result.info);
      cursor = i;
    }
  }

  return posts.length ?
    { posts, cursor: cursor - 1 } :
    { posts: [], cursor: 0 };
};

export const getPostsBySearchQuery = async (
  searchQuery: string,
  ) => {
  const searchResult: TPostInfo[] = [];

  for (let i=lastSequence; i>0; i--) {
    const result = getPost(i);

    if (!result) continue;

    await fetch(result.content)
      .then(res => res.text())
      .then(content => {

        if (content.includes(searchQuery)) {
          searchResult.push(result.info);
        }
      })
      .catch(err => console.error(err));
  }

  return searchResult;
};