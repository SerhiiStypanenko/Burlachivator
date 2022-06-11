"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const app_service_1 = require("./app.service");
const multer_1 = require("multer");
const appHelper_1 = require("./shared/appHelper");
const fs_1 = __importStar(require("fs"));
const decompress_1 = __importDefault(require("decompress"));
const path_1 = require("path");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    root(res) {
        return res.render('../public/index.hbs');
    }
    getArray(res) {
        let contentArray = [];
        let contentArrayName = [];
        this.appService.readFiles('./unzipped/', contentArray, contentArrayName);
        contentArray.reverse();
        return res.render('list', { data: contentArray });
    }
    getFile(name, req, res) {
        let contentArray = [];
        let contentArrayName = [];
        this.appService.readFiles('./unzipped/', contentArray, contentArrayName);
        const indexOfName = contentArrayName.indexOf(name);
        let pathToFile = contentArray[indexOfName].message;
        if (pathToFile.split('.')[1] != null) {
            const file = fs_1.createReadStream(path_1.join(process.cwd(), pathToFile));
            file.pipe(res);
        }
        else {
            console.log("It's a folder");
            res.render("list");
        }
    }
    uploadfile(file1) {
        fs_1.default.readdir("./uploads/", (err, files) => {
            files.forEach(file => {
                if (file.split('.')[1] == "zip") {
                    try {
                        let path = './unzipped/' + file.split('.')[0];
                        if (!fs_1.default.existsSync(path)) {
                            fs_1.default.mkdirSync(path, { recursive: true });
                        }
                        const files = decompress_1.default("./uploads/" + file, path);
                        console.log('extraction completed');
                    }
                    catch (error) {
                        console.log(error);
                    }
                    ;
                }
                else {
                    console.log("Not an archive");
                }
            });
        });
    }
};
__decorate([
    common_1.Get('/'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "root", null);
__decorate([
    common_1.Get('list'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getArray", null);
__decorate([
    common_1.Get('display/:name'),
    __param(0, common_1.Param('name')), __param(1, common_1.Req()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getFile", null);
__decorate([
    common_1.Post('uploadFile'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file1', {
        storage: multer_1.diskStorage({
            destination: appHelper_1.Helper.filePath,
            filename: appHelper_1.Helper.customFileName
        })
    })),
    __param(0, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadfile", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map