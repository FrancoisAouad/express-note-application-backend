import * as dotenv from 'dotenv';
dotenv.config();
import { CategoryController } from './categories/category.controller';
import { NoteController } from './notes/notes.controller';
import { UserController } from './users/user.controller';
import { ApplicationModule } from './app.module';

const bootstrap = () => {
  const app = new ApplicationModule([new CategoryController(), new NoteController(), new UserController()]);
  app.listen();
  app.initSwaggerDocs();
  app.initPrometheus();
};

bootstrap();
