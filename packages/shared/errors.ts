import { ErrorCode, type ErrorType } from './types';

export class ApiError extends Error {
  detail: string;

  code: ErrorCode;

  constructor(message: string, detail: string, code: ErrorCode) {
    super(message);
    this.detail = detail;
    this.code = code;
  }

  toObject(): ErrorType {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
