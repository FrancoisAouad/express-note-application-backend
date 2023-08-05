import express, { Request, Response, NextFunction } from 'express';
import { validate } from 'express-validation';
import { UserService } from './user.service';
import { NoteService } from '../notes/notes.service';
import { Controller } from '../global/global.types';

export class UserController extends Controller {
  public path: string;
  public router: any;
  private userService: UserService;

  public constructor() {
    super();
    this.path = '/auth';
    this.userService = new UserService();
    this.router = express.Router();
    this.initRoutes();
  }

  // async createNote(req: Request | any, res: Response, next: NextFunction) {
  //   try {
  //     const result = await this.userService.createNote(req.body, req.files, req.headers.authorization);
  //     res.status(result?.status).json({ success: true, data: result?.data });
  //   } catch (e) {
  //     next(e);
  //   }
  // }
  // async getNoteById(req, res, next) {
  //   try {
  //     const result = await this.userService.getNoteById(req.params, req.headers.authorization);

  //     res.status(200).json({
  //       success: true,
  //       data: result,
  //     });
  //   } catch (e) {
  //     next(e);
  //   }
  // }
  // async editNote(req, res, next) {
  //   try {
  //     const result = await this.userService.editNote(req.headers.authorization, req.body, req.params);
  //     res.status(200).json({
  //       success: true,
  //       message: 'Note updated',
  //       data: result,
  //     });
  //   } catch (e) {
  //     next(e);
  //   }
  // }
  // async deleteNote(req, res, next) {
  //   try {
  //     const result = await this.userService.deleteNote(req.params);

  //     res.status(200).json({
  //       success: true,
  //       data: result,
  //       message: 'note deleted!',
  //     });
  //   } catch (e) {
  //     next(e);
  //   }
  // }
  // async getNotes(req, res, next) {
  //   try {
  //     const result = await this.userService.getNotes(
  //       req.headers.authorization,

  //       req.body,
  //       req.query,
  //     );
  //     res.status(200).json({ success: true, data: result });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  initRoutes() {
    // this.router.post(`/${this.path}`, verifyAccessToken, isEmailVerified, this.createNote);
    // this.router.get(`/${this.path}/:noteId`, verifyAccessToken, isEmailVerified, this.getNoteById);
    // this.router.get(`/${this.path}`, verifyAccessToken, isEmailVerified, this.getNotes);
    // this.router.patch(`/${this.path}/:noteId`, verifyAccessToken, isEmailVerified, isNotePermitted, this.editNote);
    // this.router.delete(`/${this.path}/:noteId`, verifyAccessToken, isEmailVerified, isNotePermitted, this.deleteNote);
  }
}
