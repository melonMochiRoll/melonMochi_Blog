
export type TPostInfo = {
  title: string,
  tag: string,
  description: string,
  thumbnail: string,
  createdAt: string,
};

export type TMetaData = TPostInfo & { fileName: string };

export type TPostDir = {
  tag: string,
  fileName: string,
};

export type TTableOfContent = {
  id: string,
  title: string,
  indent: number,
};