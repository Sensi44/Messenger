import { modulesConstants } from '../constants.ts';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

type HttpMethodKey = (typeof METHODS)[keyof typeof METHODS];

type HTTPMethod = (url: string, options?: RequestOptions) => Promise<XMLHttpRequest>;

interface RequestOptions {
  headers?: Record<string, string>;
  method?: HttpMethodKey;
  data?: Record<string, any>;
  timeout?: number;
}

function queryStringify(data: Record<string, any>): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

//todo src/utils/queryString.ts - проверить что отрабатывает также

export class HTTPTransport {
  // static checkResponse = (res: XMLHttpRequest) => {
  //   if (res.status === 200) {
  //     console.log();
  //     return res.response ?? true;
  //   }
  //   return null;
  // };

  static get: HTTPMethod = (url, options = {}) => {
    if (options.data) {
      url = url + queryStringify(options?.data);
    }
    return HTTPTransport.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  static post: HTTPMethod = (url, options = {}) => {
    return HTTPTransport.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  static put: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  static delete: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  private static request = (
    url: string,
    options: RequestOptions = {},
    timeout: number = 5000
  ): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      if (!method) {
        reject(Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGetMethod = method === METHODS.GET;

      xhr.open(method, modulesConstants.baseUrl + url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.withCredentials = true;
      xhr.responseType = 'json';
      xhr.ontimeout = reject;

      if (isGetMethod || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
