/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Request, Response, NextFunction } from 'express';
/* Schema */
import { UserModel } from '../users/users.schema';
import { CategoryModel } from '../categories/categories.schema';
/* Service */
import { GlobalService } from './global.service';
import { JwtService } from '../lib/jwt/jwt.service';
import { UserService } from '../users/users.service';
/* Utility */
import { Logger } from './logger';
import { HttpException } from './global.exception';

export class Guard {
  private readonly globalService: GlobalService;
  private readonly userService: UserService;
  private readonly jwtService: JwtService;
  private readonly logger: Logger;

  public constructor() {
    this.globalService = new GlobalService();
    this.userService = new UserService();
    this.jwtService = new JwtService();
    this.logger = Logger.getLogger();
  }
  public authenticate = async (req: Request | any, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    const id = await this.jwtService.decodeToken(token);
    const user = await this.userService.getUser(id);
    if (!user) {
      const err = new HttpException({ status: 401, errorCode: 'UNAUTHORIZED', errorMessage: { en: '', ar: '', fr: '' } });
      this.logger.error(`Failed to find user with Id: ${id}`, {}, { err });
      throw err;
    }
    req.user = user;
    next();
    // check if user is logged auth, then add details to req
    // then check if user is verified
    // then check if user has correct permission and role
  };

  // method that check user role
  private roleGuard = async (req: any, res: any, next: any) => {
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

  // method that check if user is auth and is verified
  private authGuard = async (req: any, res: any, next: any) => {
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

  private permissionGuard = async (req: any, res: any, next: any) => {
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
      if (category.createdBy != id) {
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
}
