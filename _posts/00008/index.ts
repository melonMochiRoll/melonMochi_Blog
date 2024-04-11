import { TPostInfo } from '@Typings/post';
import { TAGLIST } from '@Posts/index';

export const info: TPostInfo = {
  fileName: '00008',
  title: '여덞번째 포스트',
  tags: [ TAGLIST.React, TAGLIST.etc ],
  description: '설명입니다.',
  thumbnail: '',
  createdAt: '2024.02.29',
};

export { default as content } from './content.md';