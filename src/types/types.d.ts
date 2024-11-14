declare module 'fetch-mock' {
  const fetchMock: FetchMockStatic;
  interface FetchMockStatic {
    get: (url: string, response: unknown) => void;
    post: (url: string, response: unknown) => void;
    lastCall: () => [string, RequestInit | undefined] | undefined;
    reset: () => void;
  }
  export default fetchMock;
}
