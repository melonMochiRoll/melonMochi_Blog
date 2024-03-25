
export const enum ETags {
  Javascript = 'Javascript',
  ETC = 'etc',
};

export type TPostInfo = {
  id: number,
  title: string,
  tags: ETags[],
  preview: string,
  createdAt: string,
};