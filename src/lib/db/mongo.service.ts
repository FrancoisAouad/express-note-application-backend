import mongoose from 'mongoose';
import { Logger } from '../../global/logger';
import config from '../../configs/config';

interface ConnectionResult {
  event: string;
  status: string;
  connection?: mongoose.Connection;
  error?: any;
}

export class MongoService {
  private logger: Logger;

  constructor() {
    this.logger = Logger.getLogger();
  }

  private static dataConnection(user?: string, pass?: string, host?: string, port?: number, name?: string) {
    if (user && pass) {
      return `mongodb://${user}:${pass}@${host}:${port}/${name}?authSource=admin`;
    }
    return `mongodb://${host}:${port}/${name}`;
  }

  private static establishConnection(): mongoose.Connection {
    try {
      const database = this.dataConnection(
        config().mongo.user,
        config().mongo.password,
        config().mongo.host,
        Number(config().mongo.port),
        config().mongo.database,
      );

      mongoose.connect(database);
      const connection = mongoose.connection;

      connection.on('error', (err) => {
        throw {
          event: 'error',
          status: 'MongoDB Connection Error',
          error: err,
        };
      });

      return connection;
    } catch (error: any) {
      throw {
        event: 'error',
        status: 'MongoDB Connection Error',
        error: error,
      };
    }
  }

  public static async connectToTheDatabase(): Promise<ConnectionResult> {
    try {
      const connection = this.establishConnection();
      return {
        event: 'connected',
        status: 'Database Connection was Successful',
        connection: connection,
      };
    } catch (error: any) {
      return {
        event: 'error',
        status: 'MongoDB Connection Failed',
        error: error,
      };
    }
  }

  public static async closeConnection(): Promise<void> {
    if (mongoose.connection) {
      await mongoose.disconnect();
    }
  }
}
