/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Types } from 'mongoose';
import { CategoryModel } from './categories.schema';
import { categorySchema } from './categories.validation';
import { UserModel } from '../users/users.schema';
import { NoteModel } from '../notes/notes.schema';
import { GlobalService } from '../global/global.service';
import { CategoryDto } from './categories.dto';

export class CategoryService {
  private globalService: GlobalService;
  constructor() {
    this.globalService = new GlobalService();
  }

  public async deleteOne(params: any, header: any) {
    //get logged in user
    // const id = this.globalService.getUser(header);
    //check if category exists
    const category = await CategoryModel.find({
      creatorID: 'id',
      _id: params.categoryId,
    });
    //return message if it doesnt
    if (!category) throw new Error('notfound..');
    //find all notes that have used the category that is about to be deleted
    const notes = await NoteModel.find({
      creatorID: 'id',
      category: params.categoryId,
    });
    //if the user has used this category at least once
    if (notes.length > 0) {
      //delete all notes that have used it
      await NoteModel.deleteMany({
        creatorID: 'id',
        category: params.categoryId,
      });
      //then delete the category
      return await CategoryModel.deleteOne({
        creatorID: 'id',
        _id: params.categoryId,
      });
    } else {
      //if the category was never used, delete category directly
      return await CategoryModel.deleteOne({
        creatorID: 'id',
        _id: params.categoryId,
      });
    }
  }

  public async create(_id: any, body: CategoryDto) {
    //validate input
    const { name } = await categorySchema.validateAsync(body);
    const category = await CategoryModel.findOne({ name });
    //category already exists in db
    if (category) throw new Error('confict');
    //create new category document
    const doc = new CategoryModel({ name, createdBy: _id });
    //save in collection
    return await doc.save();
  }

  public async getAll(_id: Types.ObjectId) {
    return await CategoryModel.findOne({ createdBy: _id });
  }

  public async getById(_id: Types.ObjectId) {
    return await CategoryModel.findOne({ createdBy: _id });
  }

  public async update(params: any, body: any) {
    //validate updated user input
    const newCategory = await categorySchema.validateAsync(body);
    return await CategoryModel.updateOne({ _id: new Types.ObjectId(params.categoryId) }, { categoryName: body.categoryName });
  }
}
