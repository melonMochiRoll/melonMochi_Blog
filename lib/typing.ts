
export type TPostInfo = {
  title: string,
  tag: string,
  description: string,
  thumbnail: string,
  createdAt: string,
};

export type TMetaData = TPostInfo & { fileName: string };

export type TPagination = {
  cursor: number,
  posts: TMetaData[],
};

export type TPostDir = {
  tag: string,
  fileName: string,
};