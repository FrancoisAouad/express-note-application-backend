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
import path from 'path';
import { NoteModel } from './notes.schema';
import { UserModel } from '../users/users.schema';
import { CategoryModel } from '../categories/categories.schema';
import { TagModel } from '../tags/tags.schema.js';
import { noteSchema } from './notes.validation';
import { GlobalService } from '../global/global.service';

export class NoteService {
  private globalService: GlobalService;
  public constructor() {
    this.globalService = new GlobalService();
  }

  createNote = async (body: any, files: any, header: any) => {
    // const authHeader = req.headers['authorization'];
    // const id = this.globalService.getUser(header);
    //check is note exists with creator id and noteid
    const UserInfo = await UserModel.findOne({ _id: 'id' });
    const __dirname = path.resolve();
    //validate input
    const { title, content, tags, category } = await noteSchema.validateAsync(body);
    const cat = await CategoryModel.findOne({
      categoryName: category,
      creatorID: 'id',
    });
    if (!cat) throw new Error('notfound..');
    const newNote = await NoteModel.create({
      creatorID: 'id',
      title: title,
      content: content,
      categoryID: cat._id,
      creatorEmail: 'UserInfo.email',
      creatorName: 'UserInfo.name',
    });

    //call helper function to add tags and create documents
    await this.globalService.addTags(tags, newNote, UserInfo);
    //initialize image and file chaining operators

    if (files?.image) {
      const image = files?.image;
      await this.globalService.uploadImage(image, __dirname, newNote);
      return newNote;
    }
    if (files?.file) {
      const file = files?.image;
      await this.globalService.uploadFile(file, __dirname, newNote);
      return newNote;
    }
    return newNote;
  };

  getNoteById = async (params: any, header: any) => {
    // const id = this.globalService.getUser(header);
    const note = await NoteModel.find({
      creatorID: 'id',
      _id: params.noteId,
    });
    if (!note) throw new Error('notfound');
    return note;
  };

  deleteNote = async (params: any) => {
    const note = await NoteModel.deleteOne(params.noteId);
    if (!note) throw new Error('notfound...');
    return note;
  };

  getNotes = async (header: any, body: any, query: any) => {
    // const authHeader = req.headers['authorization'];
    // const id = this.globalService.getUser(header);
    // let sort = query.Sort;
    //get objectId of UserModel
    // const loguser = await UserModel.findOne({ _id: id });
    let sortOrder = -1;
    if (query.Sort == 'ASC') {
      sortOrder = 1;
    }
    //pagination config
    const limit = query.limit || 10;
    const page = query.page || 1;
    //defaulr param object if no filtering and searching input sent
    const params = [{ $match: { creatorID: new Types.ObjectId('id') } }];
    //general aggregation stages for all cases
    const skipObj = {
      $skip: (page - 1) * limit,
    };
    const limitObj = {
      $limit: limit,
    };
    const sortObj = {
      $sort: { updatedDate: -1 },
    };
    //UserModel inputs tags
    if (body.tags) {
      //save body inside tags array
      const tags = body.tags;
      //set empty tags array that will store tags objectID
      const tagsArray = [];
      for (let i = 0; i < tags.length; i++) {
        const name = tags[i];
        const tagexists = await TagModel.findOne({
          tagName: name,
          creatorsID: { $in: 'id' },
        });

        if (tagexists) {
          //push id if tags exist
          // tagsArray.push('tagexists._id');
        } else if (!tagexists) {
          //   return res.json({
          //     message: `${name} doesnt exist on any note..`,
          //   });
        }
      }
      //stage that matches all UserModel notes with these categories
      const tagsObjMatch = {
        $match: { tags: { $in: tagsArray } },
      };
      //stage that will join tags collection to notes
      const tagsObjLookup = {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags',
        },
      };
      //final stage that will project info needed for client side
      const tagsProjectObj = {
        $project: {
          _id: 0,
          noteID: '$_id',
          title: 1,
          content: 1,
          tags: '$tags.tagName',
          image: '$imageLocation',
          attachement: '$attachementLocation',
          created: '$createdDate',
          updated: '$updatedDate',
        },
      };
      //push all object into the params array as aggregation stages
      //   params.push(tagsObjMatch, tagsObjLookup, skipObj, limitObj, sortObj, tagsProjectObj);
    }
    //UserModel inputs category
    if (query?.category) {
      //save category id inside variable for query
      // const category = query.category;
      //find this specific document
      const categ = await CategoryModel.findOne({
        creatorID: 'id',
        _id: query.category,
      });

      if (!categ) throw new Error('notfound');
      //stage that checks all documents with this categoryid
      const ObjCategory = { $match: { categoryID: categ._id } };
      //joins tags to notes
      const categoryObjLookupTags = {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags',
        },
      };
      //joins category to notes
      const categoryLookup = {
        $lookup: {
          from: 'categories',
          localField: 'categoryID',
          foreignField: '_id',
          as: 'categoryID',
        },
      };
      //project needed info to frontend
      const projectCategories = {
        $project: {
          _id: 0,
          noteID: '$_id',
          title: 1,
          content: 1,
          category: { $arrayElemAt: ['$categoryID.categoryName', 0] },
          tags: '$tags.tagName',
          images: '$imageLocation',
          attachement: '$attachementLocation',
          created: '$createdDate',
          updated: '$updatedDate',
        },
      };
      //push aggregation stages to params
      //   params.push(ObjCategory, categoryObjLookupTags, categoryLookup, skipObj, limitObj, sortObj, projectCategories);
    }
    //get total number of notes
    const totalNotes = await NoteModel.find({ creatorID: 'id' }).count();
    //aggregation
    const notes = await NoteModel.aggregate(params);
    //data response
    const Total = totalNotes / page;
    return {
      success: true,
      TotalRecords: totalNotes,
      Limit: limit,
      TotalPages: Total,
      Note: notes,
      Page: page,
    };
  };

  editNote = async (header: any, body: any, params: any) => {
    // const authHeader = req.headers['authorization'];
    // const id = this.globalService.getUser(header);
    // const noteId = req.params.noteId;
    //check is note exists with creator id and noteid
    const exists = await NoteModel.find({
      creatorID: 'id',
      _id: params.noteId,
    });
    if (!exists) throw new Error('notfound');

    //validate UserModel input
    const { title, content, tags, category } = await noteSchema.validateAsync(body);
    //update note with new input
    return await NoteModel.updateOne(
      {
        _id: params.noteId,
      },
      {
        $set: {
          title: title,
          content: content,
          tags: tags,
          category: category,
          updatedDate: Date.now(),
        },
      },
    );
  };
}
