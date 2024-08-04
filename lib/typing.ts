
export type TMetaData = {
  title: string,
  tag: string,
  description: string,
  thumbnail: string,
  createdAt: string,
  fileName: string,
};

export type TPostDir = {
  tag: string,
  fileName: string,
};

export type TTableOfContent = {
  id: string,
  title: string,
  indent: number,
};

export type TTags = {
  tag: string,
  count: number,
};