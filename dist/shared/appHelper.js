"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
class Helper {
    static customFileName(req, file, cb) {
        let customFile = file.originalname.split(".")[0];
        const fileExtenstion = '.' + file.originalname.split(".")[1];
        customFile = customFile + fileExtenstion;
        cb(null, customFile);
    }
    static async filePath(req, file, cb) {
        cb(null, './uploads/');
    }
}
exports.Helper = Helper;
//# sourceMappingURL=appHelper.js.map