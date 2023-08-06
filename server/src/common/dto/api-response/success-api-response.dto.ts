import { BaseApiResponse } from './base-api-response.dto';

export class SuccessApiResponse<T> extends BaseApiResponse<T> {
  constructor(data: T, message?: string) {
    super();
    this.isSuccess = true;
    this.data = data;
    this.message = message;
  }
}
