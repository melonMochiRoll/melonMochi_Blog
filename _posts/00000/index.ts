import { TPostInfo } from '@Typings/post';
import { TAGLIST } from '@Posts/index';

/**
 * fileName: '폴더이름',
 * title: '게시글 제목',
 * tags: [ TAGLIST에 명시된 태그 목록 ],
 * description: '글 목록 제목 밑에 표기될 설명',
 * thumbnail: '/_img/thumbnail/** 형식의 썸네일, 헤더에 이용 될 이미지 경로',
 * createdAt: '글 작성 날짜',
 */

export const info: TPostInfo = {
  fileName: '00000',
  title: '제목입니다.',
  tags: [ TAGLIST.etc ],
  description: '',
  thumbnail: '',
  createdAt: '2024.02.22',
};

export { default as content } from './content.md';