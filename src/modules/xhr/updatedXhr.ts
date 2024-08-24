const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function queryStringify(data) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key];
    return `${result}${encodeURIComponent(key)}=${encodeURIComponent(value)}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

class HTTPTransport {
  get = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  post = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  put = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url, options = {}, timeout = 5000) => {
    const { headers = {}, method, data, retries = 1 } = options;

    if (!method) {
      return Promise.reject('No method');
    }

    const isGet = method === METHODS.GET;
    const fullUrl = isGet && data ? `${url}${queryStringify(data)}` : url;

    const fetchOptions = {
      method,
      headers,
      body: isGet ? undefined : JSON.stringify(data),
      timeout,
    };

    return fetchWithRetry(fullUrl, { ...fetchOptions, tries: retries });
  };
}

function fetchWithRetry(url, options = {}) {
  const { tries = 1 } = options;

  function onError(err) {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }
    return fetchWithRetry(url, { ...options, tries: triesLeft });
  }

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Assuming you always want to parse JSON
    })
    .catch(onError);
}

// Example usage of HTTPTransport
const http = new HTTPTransport();
http
  .get('https://jsonplace3holder.typicode.com/todos/1', { retries: 3 })
  .then((response) => console.log(response))
  .catch((err) => console.error(err, '!'));
