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
import { Guard } from '../global/global.guard';

/**
 * CategoryController handles category-related API endpoints and their logic.
 * @class CategoryController
 * @extends Controller
 */
export class CategoryController extends Controller {
  public path: string;
  public router: Router;
  private categoryService: CategoryService;
  private readonly guard: Guard;

  /**
   * Creates an instance of CategoryController.
   * @constructor
   */
  public constructor() {
    super();
    this.path = '/categories';
    this.categoryService = new CategoryService();
    this.guard = new Guard();
    this.initBindings();
    this.router = Router();
    this.initRoutes();
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
  private async deleteOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.categoryService.deleteOne(req.params, req.headers.authorization);
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
  private async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.categoryService.create(req.headers.authorization, req.body);
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
  private async getAll(req: Request | any, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.categoryService.getAll(req.user);
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
  private async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.categoryService.update(req.params, req.body);
      res.status(200).json({ success: true });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Initializes the Express routes for category-related endpoints.
   * @function initRoutes
   */
  public initRoutes(): void {
    this.router.post(`${this.path}`, (req, res, next) => this.guard.authenticate(req, res, next), this.create);
    this.router.get(`${this.path}`, (req, res, next) => this.guard.authenticate(req, res, next), this.getAll);
    this.router.put(`${this.path}/:id`, (req, res, next) => this.guard.authenticate(req, res, next), this.update);
    this.router.delete(`${this.path}/:id`, (req, res, next) => this.guard.authenticate(req, res, next), this.deleteOne);
  }

  /**
   * Initializes the method bindings to ensure the correct context.
   * @function initBindings
   */
  public initBindings(): void {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.update = this.update.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }
}
