import { BaseApiResponse } from './base-api-response.dto';

export class ErrorApiResponse extends BaseApiResponse<void> {
  constructor(message?: string) {
    super();
    this.isSuccess = false;
    this.message = message;
  }
}
