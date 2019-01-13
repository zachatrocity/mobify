import * as express from 'express';

import { UploadController } from './controllers';

const app: express.Application = express();
const port: any = process.env.PORT || 4300;

app.use('/upload', UploadController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});