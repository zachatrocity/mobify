import { Router, Request, Response } from 'express';
import * as multer from 'multer';
let upload = multer({ dest: 'uploads/' })

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

router.post('/files', upload.any(), function (req, res, next) {
    console.log('POST /upload/files')
    // req.files is array of `photos` files
    console.log(req.files);
    // req.body will contain the text fields, if there were any
  })

export const UploadController: Router = router;