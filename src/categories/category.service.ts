import { Types } from 'mongoose';
import { CategoryModel } from './category.schema';
import { categorySchema } from './category.validation';
import { UserModel } from '../users/user.schema';
import { NoteModel } from '../notes/notes.schema';
import { GlobalService } from '../global/global.service';

export class CategoryService {
  private globalService: GlobalService;
  constructor() {
    this.globalService = new GlobalService();
  }

  async deleteCategory(params: any, header: any) {
    //get logged in user
    const id = this.globalService.getUser(header);
    //check if category exists
    const category = await CategoryModel.find({
      creatorID: id,
      _id: params.categoryId,
    });
    //return message if it doesnt
    if (!category) throw new Error('notfound..');
    //find all notes that have used the category that is about to be deleted
    const notes = await NoteModel.find({
      creatorID: id,
      category: params.categoryId,
    });
    //if the user has used this category at least once
    if (notes.length > 0) {
      //delete all notes that have used it
      await NoteModel.deleteMany({
        creatorID: id,
        category: params.categoryId,
      });
      //then delete the category
      return await CategoryModel.deleteOne({
        creatorID: id,
        _id: params.categoryId,
      });
    } else {
      //if the category was never used, delete category directly
      return await CategoryModel.deleteOne({
        creatorID: id,
        _id: params.categoryId,
      });
    }
  }
  async addCategory(header, body) {
    const id = this.globalService.getUser(header);
    //validate input
    const { categoryName } = await categorySchema.validateAsync(body);
    const category = await CategoryModel.findOne({
      categoryName: categoryName,
    });
    //category already exists in db
    if (category) throw new Error('confict');
    // const UserInfo = await UserModel.findOne({ _id: id });
    //create new category document
    const categ = new CategoryModel({
      categoryName: categoryName,
      creatorID: id,
      creatorName: 'UserInfo.name',
      creatorEmail: 'UserInfo.email',
    });
    //save in collection
    return await categ.save();
  }
  async getCategories(header) {
    const id = this.globalService.getUser(header);
    return await CategoryModel.find({ creatorID: id }).sort({
      updatedDate: -1,
    });
  }

  async editCategory(params: any, body: any) {
    //validate updated user input
    const newCategory = await categorySchema.validateAsync(body);
    return await CategoryModel.updateOne({ _id: new Types.ObjectId(params.categoryId) }, { categoryName: body.categoryName });
  }
}
