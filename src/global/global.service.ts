/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { NoteModel } from '../notes/notes.schema';
import path from 'path';
import createError from 'http-errors';
import { TagModel } from '../tags/tags.schema';

export class GlobalService {
  async addTags(tags, newNote, UserInfo) {
    if (!tags) return; //return if no tags added
    //get length of array of tags
    const tagsLength = parseInt(tags.length);
    //loop all the array elements
    for (let i = 0; i < tagsLength; i++) {
      //assign tag string body to name variable
      const name = tags[i];
      //check if tag exists
      const exists = await TagModel.findOne({ tagName: name });

      if (exists) {
        //push tagID to the notes tag array if it already exists
        await NoteModel.updateOne(
          {
            creatorID: UserInfo._id,
            _id: newNote._id,
          },
          { $push: { tags: exists._id } },
        );
        //push userID to creatorsID field inside tag
        await TagModel.updateOne({ _id: exists._id }, { $addToSet: { creatorsID: UserInfo._id } });
      } else if (!exists) {
        //create new tag for the tag
        const newTags = new TagModel({
          tagName: name,
        });
        //save tag
        const savedtag = await newTags.save();
        //push the newly created tagID to the note tags field
        await NoteModel.updateOne(
          {
            creatorID: UserInfo._id,
            _id: newNote._id,
          },
          { $push: { tags: savedtag._id } },
        );
        //add the userid to the names of the users that used this tag
        await TagModel.updateOne({ _id: savedtag._id }, { $addToSet: { creatorsID: UserInfo._id } });
      }
    }
  }

  async uploadImage(image, __dirname, newNote) {
    // checkImage(image);
    const imageExtension = path.extname(image.name);
    const allowedExtensionImage = ['.png', '.jpg', '.jpeg'];
    //throw error if image is not of the following type
    if (!allowedExtensionImage.includes(imageExtension)) {
      throw createError.UnprocessableEntity('Invalid Image');
    }
    const imageName = new Date().getTime().toString() + path.extname(image.name);
    //set image location
    const imagelocation = path.join(__dirname, 'uploads', 'img', 'notes', imageName).toString();
    //initialize the location where the files and will be saved
    // const imagelocation = getImageLocation(image, __dirname);
    //add image to note model
    newNote.imageLocation.push(imagelocation);
    await newNote.save();
    //save innside uploads folder
    await image.mv(imagelocation);
  }
  async uploadFile(file, __dirname, newNote) {
    //allowed file types
    const fileExtension = path.extname(file.name);
    const allowedExtensionFile = ['.pdf', '.txt', '.docx'];
    //throw error if file is not of the following type
    if (!allowedExtensionFile.includes(fileExtension)) {
      throw createError.UnprocessableEntity('Invalid File');
    }
    //set file location in server
    const fileName = new Date().getTime().toString() + path.extname(file.name);
    //set file location in server
    const filelocation = path.join(__dirname, 'uploads', 'files', 'notes', fileName).toString();
    //find this specific note and update this field
    newNote.attachementLocation.push(filelocation);
    await newNote.save();
    //move file to location
    await file.mv(filelocation);
  }
}
