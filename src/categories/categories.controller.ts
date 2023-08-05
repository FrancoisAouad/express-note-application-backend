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

/**
 * CategoryController handles category-related API endpoints and their logic.
 * @class CategoryController
 * @extends Controller
 */
export class CategoryController extends Controller {
  private categoryService: CategoryService;
  public path: string;
  public router: Router;

  /**
   * Creates an instance of CategoryController.
   * @constructor
   */
  public constructor() {
    super();
    this.path = '/category';
    this.categoryService = new CategoryService();
    this.router = Router();
    this.initRoutes();
    this.initBindings();
  }

  /**
   * Handles category deletion API endpoint.
   * @async
   * @function deleteOne
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  async deleteOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.categoryService.deleteCategory(req.params, req.headers.authorization);
      res.status(200).json({ success: true });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Handles category creation API endpoint.
   * @async
   * @function create
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.categoryService.addCategory(req.headers.authorization, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Handles fetching all categories API endpoint.
   * @async
   * @function getAll
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.categoryService.getCategories(req.headers.authorization);
      res.status(200).json({ success: true, data: result });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Handles category update API endpoint.
   * @async
   * @function update
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.categoryService.editCategory(req.params, req.body);
      res.status(200).json({ success: true });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Initializes the Express routes for category-related endpoints.
   * @function initRoutes
   */
  initRoutes() {
    this.router.post(`${this.path}`, this.create);
    this.router.get(`${this.path}`, this.getAll);
    this.router.put(`${this.path}/:id`, this.update);
    this.router.delete(`${this.path}/:id`, this.deleteOne);
  }

  /**
   * Initializes the method bindings to ensure the correct context.
   * @function initBindings
   */
  initBindings(): void {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.update = this.update.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }
}
