import { TPostInfo } from '@Typings/post';
import { TAGLIST } from '@Posts/index';

export const info: TPostInfo = {
  fileName: '00004',
  title: '네번째 포스트',
  tags: [ TAGLIST.Javascript, TAGLIST.etc ],
  description: '',
  thumbnail: '',
  createdAt: '2024.02.25',
};

export { default as content } from './content.md';