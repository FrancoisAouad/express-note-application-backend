/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import mongoose from 'mongoose';
import { Logger } from '../../global/logger';
import config from '../../configs/config';

export class MongoService {
  public logger: Logger;
  public constructor() {
    this.logger = Logger.getLogger();
  }

  static connectToTheDatabase() {
    try {
      const database = MongoService.dataConnection(
        config().mongo.user,
        config().mongo.password,
        config().mongo.host,
        Number(config().mongo.port),
        config().mongo.database,
      );
      mongoose.connect(database);
      const { connection } = mongoose;
      // connection.on('connected', () => this.logger.info('Database Connection was Successful'));
      connection.on('error', (err) => {
        // logger.error(`MongoDB Connection Failed on Port: ${config().mongo.port}, IP: ${config().mongo.host}`, { err: err });
        throw new Error(err);
      });
      // connection.on('disconnected', () => this.logger.info('Database Connection Disconnected'));
      return connection;
    } catch (error: any) {
      // this.logger.error(`Error caught in MongoDB connect to DB`, { err: error });
      throw error;
    }
  }

  static dataConnection(user?: string, pass?: string, host?: string, port?: number, name?: string) {
    if (user && pass) {
      return `mongodb://${`${user}:${pass}@`}${host}:${port}/${name}?authSource=admin`;
    }
    return `mongodb://${host}:${port}/${name}`;
  }

  static async closeConnection() {
    if (mongoose.connection) {
      await mongoose.disconnect();
    }
  }
}
