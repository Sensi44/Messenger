import { isPlainObject } from './isEqual.ts';
import { isArrayOrObject } from './isEqual.ts';

type StringIndexed = Record<string, any>;

const obj: StringIndexed = {
  key: 1,
  key2: 'test',
  key3: false,
  key4: true,
  key5: [1, 2, 3],
  key6: { a: 1 },
  key7: { b: { d: 2 } },
};

type PlainObject<T = unknown> = {
  [k in string]: T;
};

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = [];

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}

function queryString(data: PlainObject) {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  return getParams(data)
    .map((arr) => arr.join('='))
    .join('&');
}

console.log(queryString(obj));
export default queryString;

queryString(obj);
// 'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2'
