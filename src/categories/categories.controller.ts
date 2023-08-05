/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Router, Request, Response, NextFunction } from 'express';
import { CategoryService } from './categories.service';
import { Controller } from '../global/global.types';

export class CategoryController extends Controller {
  private categoryService: CategoryService;
  public path: string;
  public router: any;

  public constructor() {
    super();
    this.path = '/category';
    this.categoryService = new CategoryService();
    this.router = Router();
    this.initRoutes();
  }

  deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.categoryService.deleteCategory(req.params, req.headers.authorization);
      res.status(200).json({
        success: true,
      });
    } catch (e) {
      next(e);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.categoryService.addCategory(req.headers.authorization, req.body);
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (e) {
      next(e);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.categoryService.getCategories(req.headers.authorization);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (e) {
      next(e);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.categoryService.editCategory(req.params, req.body);
      res.status(200).json({
        success: true,
      });
    } catch (e) {
      next(e);
    }
  };

  initRoutes() {
    // this.router.post(`${this.path}`, verifyAccessToken, isEmailVerified, this.addCategory);
    // this.router.get(`${this.path}`, verifyAccessToken, isEmailVerified, this.getCategories);
    // this.router.put(`${this.path}/:categoryId`, verifyAccessToken, isEmailVerified, isCategoryPermitted, this.editCategory);
    // this.router.delete(`${this.path}/:categoryId`, verifyAccessToken, isEmailVerified, isCategoryPermitted, this.deleteCategory);
  }
}
