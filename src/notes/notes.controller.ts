/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { NextFunction, Router, Request, Response } from 'express';
// import { isNotePermitted } from '../middleware/isPermitted.js';
// import { verifyAccessToken } from '../lib/jwt/jwtVerify.js';
// import { isEmailVerified } from '../middleware/isUserVerified.js';
import { NoteService } from './notes.service';
import { Controller } from '../global/global.types';
import { Guard } from '../global/global.guard';
// const NotesServices = new noteServices();

export class NoteController extends Controller {
  public path: string;
  public router: Router;
  public guard: Guard;
  private noteService: NoteService;

  public constructor() {
    super();
    this.path = '/notes';
    this.noteService = new NoteService();
    this.guard = new Guard();
    this.initBindings();
    this.router = Router();
    this.initRoutes();
  }

  private async create(req: Request | any, res: Response, next: NextFunction) {
    try {
      const result = await this.noteService.createNote(req.body, req.files, req.headers.authorization);

      res.status(201).json({
        success: true,
        messages: 'added new note!',
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
  private async getById(req: Request | any, res: Response, next: NextFunction) {
    try {
      const result = await this.noteService.getNoteById(req.params, req.headers.authorization);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
  private async update(req: Request | any, res: Response, next: NextFunction) {
    try {
      const result = await this.noteService.editNote(req.headers.authorization, req.body, req.params);
      res.status(200).json({
        success: true,
        message: 'Note updated',
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
  private async deleteOne(req: Request | any, res: Response, next: NextFunction) {
    try {
      const result = await this.noteService.deleteNote(req.params);

      res.status(200).json({
        success: true,
        data: result,
        message: 'note deleted!',
      });
    } catch (e) {
      next(e);
    }
  }
  private async getAll(req: Request | any, res: Response, next: NextFunction) {
    try {
      const result = await this.noteService.getNotes(
        req.headers.authorization,

        req.body,
        req.query,
      );
      res.status(200).json({ success: true, data: result });
    } catch (e) {
      next(e);
    }
  }

  public initRoutes(): void {
    this.router.post(`/${this.path}`, (req, res, next) => this.guard.authenticate(req, res, next), this.create);
    this.router.get(`/${this.path}/:id`, (req, res, next) => this.guard.authenticate(req, res, next), this.getById);
    this.router.get(`/${this.path}`, (req, res, next) => this.guard.authenticate(req, res, next), this.getAll);
    this.router.patch(`/${this.path}/:id`, (req, res, next) => this.guard.authenticate(req, res, next), this.update);
    this.router.delete(`/${this.path}/:id`, (req, res, next) => this.guard.authenticate(req, res, next), this.deleteOne);
  }

  public initBindings(): void {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.update = this.update.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }
}
