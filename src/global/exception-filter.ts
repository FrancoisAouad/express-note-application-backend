import { HttpException } from './global.exception';

export const sendError = async (req: any, res: any, next: any) => {
  next(
    new HttpException({
      errorCode: 'NOT_FOUND',
      status: 404,
      errorMessage: { en: 'Not Found', ar: 'Not Found AR', fr: 'Not Found FR' },
    }),
  );
};

export const errorHandler = (e: any, req: any, res: any, next: any) => {
  res.status(e.status || 500);
  res.send({
    error: {
      status: e.status || 500,
      message: e.message,
    },
  });
};
