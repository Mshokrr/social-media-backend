import fs from 'fs';
import uuid from 'uuid';
import mime from 'mime';

/**
 * Media Helpers Module
 * @module MediaHelper
 */

/**
 * Generates a new name for the image using uuidv4
 * @returns {String} buffer
 * @author @Radi @Shokr
 */
const generateFileId = mimetype => `${uuid.v4()}.${mime.getExtension(mimetype)}`;

/**
 * Looks up a file in the disk using file system
 * @param {String} path
 * @returns {Boolean}
 */
const accessFile = async path => {
  if (fs.existsSync(path)) {
    return true;
  }
  return false;
};

export default {
  generateFileId,
  accessFile,
};
