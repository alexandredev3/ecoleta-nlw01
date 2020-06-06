import express from 'express';
import path from 'path';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from './routes';

class App {
  server = express();

  constructor() {
    this.server = express();

    this.serverConfig();
    this.routes();
  }

  serverConfig() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
  }
  
  routes() {
    this.server.use(routes);
    this.server.use(errors());
  }
}

export default new App().server;