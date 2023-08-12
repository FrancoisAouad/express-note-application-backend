import { connect, disconnect, connection, Connection } from 'mongoose';
import { Logger } from '../../global/logger';
import config from '../../configs/config';

interface ConnectionResult {
  event: string;
  status: string;
  connection?: Connection;
  error?: any;
}

export class MongoService {
  private readonly logger: Logger;

  public constructor() {
    this.logger = Logger.getLogger();
  }

  private static dataConnection(user?: string, pass?: string, host?: string, port?: number, name?: string) {
    if (user && pass) {
      return `mongodb://${user}:${pass}@${host}:${port}/${name}?authSource=admin`;
    }
    return `mongodb://${host}:${port}/${name}`;
  }

  private static establishConnection() {
    try {
      const database = this.dataConnection(
        config().mongo.user,
        config().mongo.password,
        config().mongo.host,
        Number(config().mongo.port),
        config().mongo.database,
      );

      connect(database);

      connection.on('connected', () => {
        console.log('Database Connection was Successful');
      });

      connection.on('error', (err) => {
        throw {
          event: 'error',
          status: 'MongoDB Connection Error',
          error: err,
        };
      });

      return connection;
    } catch (error: any) {
      throw error;
    }
  }

  public static connectToTheDatabase() {
    try {
      this.establishConnection();
    } catch (error: any) {
      return {
        event: 'error',
        status: 'MongoDB Connection Failed',
        error: error,
      };
    }
  }

  public static async closeConnection(): Promise<void> {
    if (connection) {
      await disconnect();
    }
  }
}
