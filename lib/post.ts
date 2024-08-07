'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { TMetadata, TPostDir, TPostResponse, TTableOfContent, TTags } from './typing';
import { isArrayOfMetadata, isPostResponse } from './typeGuards';

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
  } catch (err: any) {
    console.error(`getTags : ${err.name} : ${err.message}`);
    throw err;
  }
}

export async function getPostsListByTag(tag: string) {
  try {
    const dir = path.join(process.cwd(), 'posts', tag);

    const result = await new Promise<TPostDir[]>((resolve, reject) => {
      fs.readdir(dir, (err, files) => {
        if (err || !files) {
          reject(err);
        }
        
        const result = files?.reduce((acc: TPostDir[], file: string) => {
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
  } catch (err: any) {
    console.error(`getPostsListByTag : ${err.name} : ${err.message}`);
    throw err;
  }
}

export async function getPostsByQuery(
  query: string,
  cursor: number = 0,
  limit: number = 10,
) {
  try {
    const list = await getPostsListAll();
    const cursorIdx = cursor * limit;
    const limitIdx = (cursor + 1) * limit;
  
    const posts = await list.reduce(async (acc: Promise<TMetadata[]>, postDir: TPostDir) => {
      const { metadata, content } = await getPost(postDir);
      const arr = await acc;

      if (!metadata) {
        return arr;
      }

      if (content.includes(query)) {
        arr.push(metadata);
      }

      return arr;
    }, Promise.resolve([]));
  
    return posts.slice(cursorIdx, limitIdx);
  } catch (err: any) {
    console.error(`getPostsByQuery : ${err.name} : ${err.message}`);
    throw err;
  }
}

export async function getPostsListAll() {
  try {
    const tags = await getTags();
  
    const list = await tags.reduce(async (acc: Promise<TPostDir[]>, tags: TTags) => {
      const result = await getPostsListByTag(tags?.tag);
      const arr = await acc;
  
      arr.push(...result);
      return arr;
    }, Promise.resolve([]));
  
    return list;
  } catch (err: any) {
    console.error(`getPostsListAll : ${err.name} : ${err.message}`);
    throw err;
  }
}

export async function getPost({ tag, fileName }: TPostDir): Promise<TPostResponse> {
  try {
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
    const result = { metadata: data, content };
    
    if (!isPostResponse(result)) {
      throw new Error('is not postResponse');
    }

    return result;
  } catch (err: any) {
    console.error(`getPost : ${err.name} : ${err.message}`);
    throw err;
  }
}

export async function getRecentPosts(
  cursor: number = 0,
  limit: number = 6,
): Promise<TMetadata[]> {
  try {
    const list = await sortByDate(await getPostsListAll());
    const cursorIdx = cursor * limit;
    const limitIdx = (cursor + 1) * limit;
  
    const posts = await Promise.all(
      list
        .slice(cursorIdx, limitIdx)
        .map(async post => {
          const { metadata } = await getPost(post);
          return metadata;
        })
    );

    if (!isArrayOfMetadata(posts)) {
      throw new Error('is not metadataArray');
    }
  
    return posts;
  } catch (err: any) {
    console.error(`getRecentPosts : ${err.name} : ${err.message}`);
    throw err;
  }
}

export async function getPostsByTag(
  tag: string,
  cursor: number = 0,
  limit: number = 6,
) {
  try {
    const list = await sortByDate(await getPostsListByTag(tag));
    const cursorIdx = cursor * limit;
    const limitIdx = (cursor + 1) * limit;
  
    const posts = await Promise.all(
      list
      .slice(cursorIdx, limitIdx)
      .map(async post => {
        const { metadata } = await getPost(post);
        return metadata;
      })
    );

    if (!isArrayOfMetadata(posts)) {
      throw new Error('is not metadataArray');
    }
  
    return posts;
  } catch (err: any) {
    console.error(`getPostsByTag : ${err.name} : ${err.message}`);
    throw err;
  }
}

export async function sortByDate(list: TPostDir[]) {
  try {
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
  } catch (err: any) {
    console.error(`sortByDate : ${err.name} : ${err.message}`);
    throw err;
  }
}

export async function parseTOC(content: string) {
  try {
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
  } catch (err: any) {
    console.error(`parseTOC : ${err.name} : ${err.message}`);
    throw err;
  }
}