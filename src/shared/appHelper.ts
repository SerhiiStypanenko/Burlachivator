/* eslint-disable prettier/prettier */
export class Helper {

  static customFileName(req, file, cb) {
    let customFile = file.originalname.split(".")[0];
    const fileExtenstion = '.' + file.originalname.split(".")[1];

    customFile = customFile + fileExtenstion;
    
    cb(null, customFile);
  }

  static async filePath(req, file, cb){
    cb(null, './uploads/');
    
  }

}

