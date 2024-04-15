import { TPostInfo } from '@Typings/post';
import { TAGLIST } from '@Posts/index';

export const info: TPostInfo = {
  fileName: '00001',
  title: '호이스팅(Hoisting) 이란?',
  tags: [ TAGLIST.Javascript ],
  description: 'var과 let, const 그리고 함수에 적용되는 호이스팅',
  thumbnail: '/_img/thumbnail/tag.jpg',
  createdAt: '2024.04.15',
};

export { default as content } from './content.md';