import express from 'express';
// import { verifyAccessToken } from '../lib/jwt/jwtVerify.js';
import { CategoryService } from './category.service';
// import { isEmailVerified } from '../middleware/isUserVerified.js';
// import { isCategoryPermitted } from '../middleware/isPermitted.js';
import { RootQuerySelector } from 'mongoose';
import { Controller } from '../global/global.types';

// const CategoryService = new categoryService();

export class CategoryController extends Controller {
  private categoryService: CategoryService;
  public path: string;
  public router: any;

  public constructor() {
    super();
    this.path = '/category';
    this.categoryService = new CategoryService();
    this.router = express.Router();
    this.initRoutes();
  }

  async deleteCategory(req, res, next) {
    try {
      await this.categoryService.deleteCategory(req.params, req.headers.authorization);
      res.status(200).json({
        success: true,
      });
    } catch (e) {
      next(e);
    }
  }
  async addCategory(req, res, next) {
    try {
      const result = await this.categoryService.addCategory(req.headers.authorization, req.body);
      res.status(201).json({
        success: true,
        messsage: 'Added Category!',
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
  async getCategories(req, res, next) {
    try {
      const result = await this.categoryService.getCategories(req.headers.authorization);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
  async editCategory(req, res, next) {
    try {
      await this.categoryService.editCategory(req.params, req.body);
      res.status(200).json({
        success: true,
        messsage: 'Edited Category!',
      });
    } catch (e) {
      next(e);
    }
  }

  initRoutes() {
    // this.router.post(`${this.path}`, verifyAccessToken, isEmailVerified, this.addCategory);
    // this.router.get(`${this.path}`, verifyAccessToken, isEmailVerified, this.getCategories);
    // this.router.put(`${this.path}/:categoryId`, verifyAccessToken, isEmailVerified, isCategoryPermitted, this.editCategory);
    // this.router.delete(`${this.path}/:categoryId`, verifyAccessToken, isEmailVerified, isCategoryPermitted, this.deleteCategory);
  }
}
