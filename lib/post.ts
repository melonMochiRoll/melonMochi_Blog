'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { TMetaData, TPostDir, TTableOfContent, TTags } from './typing';

export async function getTags() {
  try {
    const dir = path.join(process.cwd(), 'posts');

    const result = await new Promise<TTags[]>((resolve, reject) => {
      fs.readdir(dir, (err, files) => {
        if (err) {
          reject([]);
        }
        
        const numberOfPost = files.map(filesDir => {
          const postsArr = fs.readdirSync(`${dir}/${filesDir}`);
          return { tag: filesDir, count: postsArr?.length };
        });
  
        resolve(numberOfPost);
      });
    });
    
    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
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
  query: string,
  cursor: number = 0,
  limit: number = 10,
) {
  const list = await getPostsListAll();
  const cursorIdx = cursor * limit;
  const limitIdx = (cursor + 1) * limit;

  const posts = await Promise.all(
    await list
      .reduce(async (acc: Promise<TMetaData[]>, postDir: TPostDir) => {
        const { metaData, content } = await getPost(postDir);
        const arr = await acc;

        const result = content.includes(query);

        if (result) {
          arr.push(metaData);
        }

        return arr;
      }, Promise.resolve([]))
    );

  return posts.slice(cursorIdx, limitIdx);
}

export async function getPostsListAll() {
  const tags = await getTags();
  
  const list = await tags.reduce(async (acc: Promise<TPostDir[]>, tags: TTags) => {
    const result = await getPostsListByTag(tags?.tag);
    const arr = await acc;

    arr.push(...result);
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

export async function getRecentPosts(
  cursor: number = 0,
  limit: number = 6,
) {
  const list = await sortByDate(await getPostsListAll());
  const cursorIdx = cursor * limit;
  const limitIdx = (cursor + 1) * limit;

  const posts = await Promise.all(
    list
      .slice(cursorIdx, limitIdx)
      .map(async post => {
        const { metaData } = await getPost(post);
        return metaData;
      })
  );

  return posts;
}

export async function getPostsByTag(
  tag: string,
  cursor: number = 0,
  limit: number = 6,
) {
  const list = await sortByDate(await getPostsListByTag(tag));
  const cursorIdx = cursor * limit;
  const limitIdx = (cursor + 1) * limit;

  const posts = await Promise.all(
    list
    .slice(cursorIdx, limitIdx)
    .map(async post => {
      const { metaData } = await getPost(post);
      return metaData;
    })
  );

  return posts;
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
  const regex = new RegExp(/(##|###)(.*$)/, 'gim');
  const searched = content.match(regex);

  if (Array.isArray(searched) && searched.length) {
    return searched
      .reduce((acc: TTableOfContent[], str: string) => {
        acc.push({
          id: '#' +
          str
            .replace('# ', '')
            .replace('#', '')
            .replace(/ /g, '-')
            .replace(/[\[\]:!@#$/%^&*()+=,.]/g, '')
            .replace('?', '')
            .toLowerCase(),
          title: str
            .replace('### ', '')
            .replace('## ', ''),
          indent: str.startsWith('###') ? 1 : 0,
        });
        return acc;
      }, []);
  }

  return [];
}