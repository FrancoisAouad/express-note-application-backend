import { HttpException } from './global.exception';
import { Router } from 'express';

export type LogMessageOptions = {
  responseTime: number;
  body?: object;
  error?: HttpException;
};

export type Exception = {
  status: number;
  errorCode: string;
  errorMessage: { en: string; ar: string; fr: string };
};

export type Message = {
  en: string;
  ar: string;
  fr: string;
};

export abstract class Controller {
  public path: string;
  public router: Router;

  constructor() {
    this.router = Router();
    this.path = '';
    this.initRoutes();
  }

  abstract initRoutes(): void;
}
