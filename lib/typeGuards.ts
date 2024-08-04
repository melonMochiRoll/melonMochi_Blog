import { TMetadata, TPostResponse } from "./typing";

export const isArray = <T>(array: any): array is T[] => {
  return Array.isArray(array);
};

export const isArrayOfMetadata = (array: any): array is TMetadata[] => {
  return isArray<TMetadata>(array) && array.every(item => isMetadata(item));
};

export const isMetadata = (obj: any): obj is TMetadata => {
  return typeof obj === 'object' &&
    (obj ?? false) &&
    typeof obj.title === 'string' &&
    typeof obj.tag === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.thumbnail === 'string' &&
    typeof obj.createdAt === 'string' &&
    typeof obj.fileName === 'string';
};

export const isPostResponse = (obj: any): obj is TPostResponse => {
  return typeof obj === 'object' &&
  (obj ?? false) &&
  typeof obj.success === 'boolean' &&
  isMetadata(obj.metaData) &&
  typeof obj.content === 'string';
};