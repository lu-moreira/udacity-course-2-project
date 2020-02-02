import express from 'express';
import bodyParser from 'body-parser';
import { IndexRouter } from './controllers/index.router';

(async () => {
  const app = express();
  const port = process.env.PORT || 8080; // default port to listen
  
  app.use(bodyParser.json());

  app.use('/', IndexRouter)

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
