'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { TMetaData, TPostDir, TTableOfContent } from './typing';

export async function getTags() {
  const dir = path.join(process.cwd(), 'posts');

  const result = await new Promise<string[]>((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject([]);
      }

      resolve(files);
    });
  });
  
  return result;
}

export async function getPostsListByTag(tag: string) {
  const dir = path.join(process.cwd(), 'posts', tag);

  const result = await new Promise<TPostDir[]>((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject([]);
      }
      
      const result = files.reduce((acc: TPostDir[], file: string) => {
        if (!file) {
          return acc;
        }
        const fileName = file
          .split('.')
          .filter(ele => ele !== 'mdx')
          .join('');

        acc.push({ tag, fileName });
        return acc;
      }, []);

      resolve(result);
    });
  });

  return result;
}

export async function getPostsByQuery(
  cursor: number,
  query: string,
) {
  const list = await getPostsListAll();
  const posts: TMetaData[] = [];

  for (let i=cursor; i<list.length; i++) {
    if (posts.length > 9) break;

    const { metaData, content } = await getPost(list[i]);
    const result = content.search(query);
    ++cursor;

    if (result > -1) {
      posts.push(metaData);
    }
  }

  return { cursor, posts };
}

export async function getPostsListAll() {
  const tags = await getTags();
  
  const list = await tags.reduce(async (acc: Promise<TPostDir[]>, tag: string) => {
    const list = await getPostsListByTag(tag);
    const arr = await acc;

    arr.push(...list);
    return arr;
  }, Promise.resolve([]));

  return list;
}

export async function getPost(postDir: TPostDir) {
  const { tag, fileName } = postDir;
  const dir = path.join(process.cwd(), 'posts', tag, `${fileName}.mdx`);

  const source = await new Promise<string>((resolve, reject) => {
    fs.readFile(dir, 'utf-8', (err, post) => {
      if (err) {
        reject('');
      }

      resolve(post);
    });
  });

  const { data, content } = matter(source);
  const result = Object.assign(data, { fileName }) as TMetaData;

  return { metaData: result, content };
}

export async function getRecentPosts(cursor: number) {
  const list = await sortByDate(await getPostsListAll());

  const posts = await Promise.all(
    list
    .slice(cursor, cursor + 6)
    .map(async post => {
      const { metaData } = await getPost(post);
      return metaData;
    })
  );

  return { cursor: cursor + posts.length, posts };
}

export async function getPostsByTag(
  cursor: number,
  tag: string,
) {
  const list = await sortByDate(await getPostsListByTag(tag));

  const posts = await Promise.all(
    list
    .slice(cursor, cursor + 6)
    .map(async post => {
      const { metaData } = await getPost(post);
      return metaData;
    })
  );

  return { cursor: cursor + posts.length, posts };
}

export async function sortByDate(list: TPostDir[]) {
  const array = [...list];

  array.sort((a: TPostDir, b: TPostDir) => {
    const a_Date = a.fileName
      .split('-')
      .slice(0, 3)
      .join('-');
    
    const b_Date = b.fileName
      .split('-')
      .slice(0, 3)
      .join('-');
    
    return new Date(b_Date).getTime() - new Date(a_Date).getTime();
  });

  return array;
}

export async function parseTOC(content: string) {
  const regex = new RegExp(/##.*$/, 'gim');
  const searched = content.match(regex);

  if (Array.isArray(searched) && searched.length) {
    return searched
      .reduce((acc: TTableOfContent[], str: string) => {
        acc.push({
          id: str
            .replace('## ', '#')
            .replace(/ /g, '-')
            .replace(/[\[\]:!@#$/%^&*()+=,.]/g, '')
            .replace('?', '')
            .toLowerCase(),
          title: str.replace('## ', ''),
        });
        return acc;
      }, []);
  }

  return [];
}