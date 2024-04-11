import { TPostInfo } from '@Typings/post';
import { TAGLIST } from '@Posts/index';

export const info: TPostInfo = {
  fileName: '00005',
  title: '다섯번째 포스트',
  tags: [ TAGLIST.etc ],
  description: '',
  thumbnail: '',
  createdAt: '2024.02.26',
};

export { default as content } from './content.md';