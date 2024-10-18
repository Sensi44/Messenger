import { TAPIError } from '../api/type.ts';

export function apiHasError(response: any): response is TAPIError {
  console.log('apiHasError', response?.reason);
  return response?.reason;
}
