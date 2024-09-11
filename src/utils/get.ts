import { SomeObject } from '../types/commonTypes.ts';

function get<T>(object: SomeObject, path: string): T {
  return path.split('.').reduce((acc, item) => acc[item], object);
}

export default get;
