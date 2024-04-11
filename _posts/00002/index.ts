import { TPostInfo } from '@Typings/post';
import { TAGLIST } from '@Posts/index';

export const info: TPostInfo = {
  fileName: '00002',
  title: '두번째 포스트',
  tags: [ TAGLIST.Typescript, TAGLIST.etc ],
  description: '',
  thumbnail: '',
  createdAt: '2024.02.23',
};

export { default as content } from './content.md';