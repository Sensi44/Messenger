import { SomeObject } from '../types/commonTypes.ts';
import { isPlainObject } from './isEqual.ts';
import merge from './merge.ts';
// import type { Indexed } from './merge.ts';

function set(object: SomeObject, path: string, value: unknown): SomeObject {
  if (!isPlainObject(object) || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path должен быть строкой');
  }

  const result = path.split('.').reduceRight<SomeObject>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );

  return merge(object, result);
}

export default set;

/**
 * set({ foo: 5 }, 'bar.baz', 10); // { foo: 5, bar: { baz: 10 } }
 * set(3, 'foo.bar', 'baz'); // 3
 */
