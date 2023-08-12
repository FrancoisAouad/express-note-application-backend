/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Request, Response, NextFunction, Router } from 'express';
import { validate } from 'express-validation';
import { UserService } from './users.service';
import { Controller } from '../global/global.types';
import { Guard } from '../global/global.guard';

/**
 * UserController handles user-related API endpoints and their logic.
 * @class UserController
 * @extends Controller
 */
export class UserController extends Controller {
  public readonly path: string;
  public readonly router: Router;
  private readonly guard: Guard;
  private readonly userService: UserService;

  /**
   * Creates an instance of UserController.
   * @constructor
   */
  public constructor() {
    super();
    this.path = '/auth';
    this.userService = new UserService();
    this.guard = new Guard();
    this.initBindings();
    this.router = Router();
    this.initRoutes();
  }

  /**
   * Handles user login API endpoint.
   * @async
   * @function login
   * @param {Request | any} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  private async login(req: Request | any, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.userService.login(req.body);
      res.status(200).json({ success: true, data: result });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Handles user registration API endpoint.
   * @async
   * @function register
   * @param {Request | any} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  private async register(req: Request | any, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.userService.register(req.params, req.headers.authorization);
      res.status(200).json({ success: true, data: result });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Handles refresh token API endpoint.
   * @async
   * @function refreshToken
   * @param {Request | any} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  private async refreshToken(req: Request | any, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.userService.refreshToken(req.headers.authorization);
      res.status(200).json({ success: true, data: result });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Handles forgot password API endpoint.
   * @async
   * @function forgotPassword
   * @param {Request | any} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  private async forgotPassword(req: Request | any, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.userService.forgotPassword(req.params);
      res.status(200).json({ success: true, data: result });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Handles user logout API endpoint.
   * @async
   * @function logout
   * @param {Request | any} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  private async logout(req: Request | any, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.userService.logout(req.headers.authorization);
      res.status(200).json({ success: true, data: result });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Handles email verification API endpoint.
   * @async
   * @function verifyEmail
   * @param {Request | any} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  private async verifyEmail(req: Request | any, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.userService.verifyEmail(req.headers.authorization);
      res.status(200).json({ success: true, data: result });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Handles password reset API endpoint.
   * @async
   * @function resetPassword
   * @param {Request | any} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  private async resetPassword(req: Request | any, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.userService.resetPassword(req.headers.authorization, req.body, req.query);
      res.status(200).json({ success: true, data: result });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Initializes the Express routes for user-related endpoints.
   * @function initRoutes
   */
  public initRoutes(): void {
    this.router.post(`${this.path}/login`, (req, res, next) => this.guard.authenticate(req, res, next), this.login);
    this.router.post(`${this.path}/register`, (req, res, next) => this.guard.authenticate(req, res, next), this.register);
    this.router.post(`${this.path}/refresh-token`, (req, res, next) => this.guard.authenticate(req, res, next), this.refreshToken);
    this.router.post(`${this.path}/forgot-password`, (req, res, next) => this.guard.authenticate(req, res, next), this.forgotPassword);
    this.router.delete(`${this.path}/logout`, (req, res, next) => this.guard.authenticate(req, res, next), this.logout);
    this.router.get(`${this.path}/verify`, (req, res, next) => this.guard.authenticate(req, res, next), this.verifyEmail);
    this.router.patch(`${this.path}/reset-password/:token`, (req, res, next) => this.guard.authenticate(req, res, next), this.resetPassword);
  }

  /**
   * Initializes the method bindings to ensure the correct context.
   * @function initBindings
   */
  public initBindings(): void {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.logout = this.logout.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }
}
