import { Router, Request, Response } from "express";
import * as multer from "multer";
import { Calibre } from "node-calibre";
import * as path from "path";
import * as fs from "fs";
import * as mime from "node-mime";

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + ".epub");
  }
});

let upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    if (path.extname(file.originalname) !== ".epub") {
      return cb(null, false);
    }

    cb(null, true);
  }
});

const router: Router = Router();

router.post("/files", upload.any(), async function(req, res, next) {
  console.log(req.files);
  const calibre = new Calibre();
  let result: string;

  let file = req.files[0] as Express.Multer.File;
  result = await calibre.run(
    "/Applications/calibre.app/Contents/console.app/Contents/MacOS/ebook-convert",
    [
        file.path, 
        `uploads/${path.parse(file.originalname).name}.mobi`
    ]
  );

  console.log(result);

  res.download(`uploads/${path.parse(file.originalname).name}.mobi`);
});

export const UploadController: Router = router;
