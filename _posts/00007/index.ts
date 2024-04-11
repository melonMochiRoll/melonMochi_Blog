import { TPostInfo } from '@Typings/post';
import { TAGLIST } from '@Posts/index';

export const info: TPostInfo = {
  fileName: '00007',
  title: '일곱번째 포스트',
  tags: [ TAGLIST.Typescript, TAGLIST.etc ],
  description: '',
  thumbnail: '',
  createdAt: '2024.02.28',
};

export { default as content } from './content.md';