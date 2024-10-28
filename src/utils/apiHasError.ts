import { TAPIError } from '../api/type.ts';

export function apiHasError(response: any): response is TAPIError {
  return response?.reason;
}
