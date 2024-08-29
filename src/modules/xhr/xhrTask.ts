const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

type Method = (typeof METHODS)[keyof typeof METHODS];

interface Options {
  headers?: Record<string, string>;
  method?: Method;
  data?: Record<string, any>;
  timeout?: number;
}

function queryStringify(data: Record<string, any>): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be an object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    if (typeof data[key] === 'object') {
      // Обработка вложенных объектов
      const nestedQuery = queryStringify(data[key]);
      return `${result}${key}=${encodeURIComponent(nestedQuery)}${index < keys.length - 1 ? '&' : ''}`;
    }
    return `${result}${key}=${encodeURIComponent(data[key])}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

class HTTPTransport {
  get(url: string, options: Options = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  }

  post(url: string, options: Options = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  }

  put(url: string, options: Options = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  }

  delete(url: string, options: Options = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  }

  private request(url: string, options: Options = {}, timeout = 5000): Promise<XMLHttpRequest> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => resolve(xhr);
      xhr.onabort = () => reject(new Error('Request aborted'));
      xhr.onerror = () => reject(new Error('Request failed'));

      xhr.timeout = timeout;
      xhr.ontimeout = () => reject(new Error('Request timed out'));

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data)); // Преобразование данных в строку для пост-запроса
      }
    });
  }
}
