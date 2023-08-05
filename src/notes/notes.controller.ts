/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Router } from 'express';
// import { isNotePermitted } from '../middleware/isPermitted.js';
// import { verifyAccessToken } from '../lib/jwt/jwtVerify.js';
// import { isEmailVerified } from '../middleware/isUserVerified.js';
import { NoteService } from './notes.service';
import { Controller } from '../global/global.types';
// const NotesServices = new noteServices();

export class NoteController extends Controller {
  public path: string;
  public router: any;
  private noteService: NoteService;

  public constructor() {
    super();
    this.path = '/notes';
    this.noteService = new NoteService();
    this.router = Router();
    this.initRoutes();
  }

  async createNote(req, res, next) {
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
  async getNoteById(req, res, next) {
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
  async editNote(req, res, next) {
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
  async deleteNote(req, res, next) {
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
  async getNotes(req, res, next) {
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

  initRoutes(): void {
    // this.router.post(`/${this.path}`, verifyAccessToken, isEmailVerified, this.createNote);
    // this.router.get(`/${this.path}/:noteId`, verifyAccessToken, isEmailVerified, this.getNoteById);
    // this.router.get(`/${this.path}`, verifyAccessToken, isEmailVerified, this.getNotes);
    // this.router.patch(`/${this.path}/:noteId`, verifyAccessToken, isEmailVerified, isNotePermitted, this.editNote);
    // this.router.delete(`/${this.path}/:noteId`, verifyAccessToken, isEmailVerified, isNotePermitted, this.deleteNote);
  }

  initBindings(): void {
    return;
  }
}
