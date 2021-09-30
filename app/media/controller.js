import multer from 'multer';

import config from '@config';
// import { validate, httpError } from '@util';
// import validation from './validation';

// import model from './model';
import helper from './helper';

/**
 * Media Controller
 * @module MediaController
 */

/**
 * Upload function
 */
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, config.media.hostPortalDirectory),
    filename: (req, file, cb) => cb(null, helper.generateFileId(file.mimetype)),
  }),
});

/**
 * Get a file from the file system
 * @param {Request} req
 * @param {Response} res
 */
const getFile = async (req, res) => {
  const filePath = `${config.media.hostPortalDirectory}/${req.params.id}`;
  const fileExists = await helper.accessFile(filePath);
  if (!fileExists) {
    return res.status(404).json({
      message: 'File not found',
      error: 'File not found',
      data: null,
    });
  }
  return res.sendFile(filePath);
};

/**
 * After uploading a file returns it in the response
 * @param {Request} req
 * @param {Response} res
 */
const handleUploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: 'Bad Request!',
      error: 'Bad request',
      data: null,
    });
  }
  return res.status(201).json({
    message: 'Uploaded successfully',
    url: `${config.host}:${config.port}/file/${req.file.filename}`,
    fileName: req.file.filename,
  });
};

export default {
  getFile,
  uploadFile: [upload.single('file'), handleUploadFile],
};
