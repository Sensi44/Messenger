const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

type Method = (typeof METHODS)[keyof typeof METHODS];

interface Options<T = Record<string, unknown>> {
  headers?: Record<string, string>;
  method?: Method;
  data?: T;
  timeout?: number;
}

function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be an object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    if (typeof data[key] === 'object' && data[key] !== null) {
      // Обработка вложенных объектов
      const nestedQuery = queryStringify(data[key] as Record<string, unknown>);
      return `${result}${key}=${encodeURIComponent(nestedQuery)}${index < keys.length - 1 ? '&' : ''}`;
    }
    return `${result}${key}=${encodeURIComponent(data[key] as string)}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

class HTTPTransport {
  get<T>(url: string, options: Options<T> = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  }

  post<T>(url: string, options: Options<T> = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  }

  put<T>(url: string, options: Options<T> = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  }

  delete<T>(url: string, options: Options<T> = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  }

  private request<T>(url: string, options: Options<T> = {}, timeout = 5000): Promise<XMLHttpRequest> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && data ? `${url}${queryStringify(data as Record<string, unknown>)}` : url);

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

console.log(HTTPTransport);
