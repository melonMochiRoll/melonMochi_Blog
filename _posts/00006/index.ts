import { TPostInfo } from '@Typings/post';
import { TAGLIST } from '@Posts/index';

export const info: TPostInfo = {
  fileName: '00006',
  title: '여섯번째 포스트',
  tags: [ TAGLIST.React, TAGLIST.etc ],
  description: '',
  thumbnail: '',
  createdAt: '2024.02.27',
};

export { default as content } from './content.md';