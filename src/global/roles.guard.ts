/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { UserModel } from '../users/users.schema';
import { GlobalService } from '../global/global.service';
import { CategoryModel } from '../categories/categories.schema';
import { NoteModel } from '../notes/notes.schema';

export class RoleGuard {
  private globalService: GlobalService;
  public constructor() {
    this.globalService = new GlobalService();
  }
  isAdmin = async (req, res, next) => {
    try {
      //get access token from headers
      const authHeader = req.headers['authorization'];
      const id = this.globalService.getUser(authHeader);
      const user = await UserModel.findOne({ _id: id });
      //send error if user not found
      if (!user) {
        return res.status(400).json({
          error: 'Unauthorized',
          message: 'Invalid Email/Password',
        });
      } else {
        //if user found but is not and admin then deny acccess
        if (user.isAdmin === false) {
          return res.status(401).json({
            error: 'Unauthorized',
            message: 'Access Not Allowed.',
          });
        } else if (user.isAdmin === true) {
          //if user found and is an admin then give access to the next middleware
          next();
        }
      }
    } catch (err) {
      next(err);
    }
  };
  isCategoryPermitted = async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      const id = this.globalService.getUser(authHeader);
      //check if user exists
      const user = await UserModel.findOne({ _id: id });
      if (!user) return res.status(404);
      const catID = req.params.categoryId;

      // categories that have the sam
      const category = await CategoryModel.findOne({
        creatorID: id,
        _id: catID,
      });
      //send error when category return null
      if (!category)
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'No such category found..',
        });

      //param id diff than the category id
      if (category._id != catID) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'No',
        });
      }
      //loggedin user id diff than the one of the creator
      if (category.creatorID != id) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'No',
        });
      }
      next();
    } catch (e) {
      next(e);
    }
  };
  isNotePermitted = async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      const id = this.globalService.getUser(authHeader);
      //check if user exists
      const user = await UserModel.findOne({ _id: id });
      if (!user) return res.status(405).json({ success: false, message: 'yo' });
      const noteID = req.params.noteId;

      // categories that have the sam
      const note = await NoteModel.findOne({
        creatorID: id,
        _id: noteID,
      });
      //send error when note return null
      if (!note)
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'No such Note exists..',
        });

      //param id diff than the note id
      if (note._id != noteID) {
        return res.status(403).json({
          success: false,
          error: 'Forbbiden',
          message: 'Unauthorized Access.',
        });
      }
      //loggedin user id diff than the one of the creator
      if (note.creatorID != id) {
        return res.status(403).json({
          success: false,
          error: 'Forbbiden',
          message: 'Unauthorized Access.',
        });
      }
      next();
    } catch (e) {
      next(e);
    }
  };
  isEmailVerified = async (req, res, next) => {
    try {
      //get access token from headers
      const authHeader = req.headers['authorization'];
      const id = this.globalService.getUser(authHeader);

      const user = await UserModel.findOne({ _id: id });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Invalid Email o Password.',
        });
        //give access if token is valid
      } else {
        if (user.isVerified === false) {
          return res.status(401).json({
            success: false,
            error: 'Unauthorized',
            message: 'Please verify your email.',
          });
        } else if (user.isVerified === true) {
          next();
        }
      }
    } catch (e) {
      next(e);
    }
  };
}
