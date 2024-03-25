
export const enum ETags {
  Javascript = 'Javascript',
  ETC = 'etc',
};

export type TPostInfo = {
  fileName: string,
  title: string,
  tags: ETags[],
  createdAt: string,
};