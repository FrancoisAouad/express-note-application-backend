import { Exception, Message } from './global.types';

export class HttpException extends Error {
  private status: number;
  private errorCode: string;
  private errorMessage: Message;

  public constructor(params: Exception) {
    super();

    this.status = params.status;
    this.errorCode = params.errorCode;
    this.errorMessage = params.errorMessage;
  }
}
