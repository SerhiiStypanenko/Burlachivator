/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AppController = void 0;
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var multer_1 = require("multer");
var appHelper_1 = require("./shared/appHelper");
var fs_1 = require("fs");
var decompress_1 = require("decompress");
var path_1 = require("path");
function crawl(dir, contentArray) {
    console.log('[+]', dir);
    var files = fs_1["default"].readdirSync(dir);
    for (var x in files) {
        var next = path_1["default"].join(dir, files[x]);
        //console.log(next);
        if (fs_1["default"].lstatSync(next).isDirectory() == true) {
            crawl(next, contentArray);
            contentArray.push({ message: next });
        }
        else {
            //console.log('\t',next);
            contentArray.push({ message: next });
        }
    }
}
var AppController = /** @class */ (function () {
    function AppController(appService) {
        this.appService = appService;
    }
    AppController.prototype.root = function (res) {
        return res.render('../public/index.hbs', { message: 'Hello world!!' });
    };
    AppController.prototype.printName = function (res) {
        return res.render('print', { message: 'Hello world!!' });
    };
    AppController.prototype.anotherLayout = function (res) {
        return res.render('print', {
            layout: 'layout_other',
            message: 'Hello world!!'
        });
    };
    AppController.prototype.getArray = function (res) {
        var contentArray = [];
        crawl('./public/zips/', contentArray);
        contentArray.reverse();
        contentArray.forEach(function (element) {
            console.log(element);
        });
        //res.send(contentArray[2]);
        return res.render('array', { data: contentArray, pathM: path_1["default"] });
    };
    AppController.prototype.getFile = function (filename, req, res) {
        console.log(req.url);
        var file = fs_1.createReadStream(path_1.join(process.cwd(), '/public/zips/newArchive/newText.txt'));
        console.log(filename);
        file.pipe(res);
    };
    AppController.prototype.uploadfile = function (file1) {
        fs_1["default"].readdir("./uploads/", function (err, files) {
            files.forEach(function (file) {
                try {
                    // eslint-disable-next-line prefer-const
                    var path_2 = './public/zips/' + file.split('.')[0];
                    if (!fs_1["default"].existsSync(path_2)) {
                        fs_1["default"].mkdirSync(path_2, { recursive: true });
                    }
                    var files_1 = decompress_1["default"]("./uploads/" + file, path_2);
                    console.log('done');
                }
                catch (error) {
                    console.log(error);
                }
                ;
            });
        });
    };
    __decorate([
        common_1.Get(),
        __param(0, common_1.Res())
    ], AppController.prototype, "root");
    __decorate([
        common_1.Get('name'),
        __param(0, common_1.Res())
    ], AppController.prototype, "printName");
    __decorate([
        common_1.Get('layout'),
        __param(0, common_1.Res())
    ], AppController.prototype, "anotherLayout");
    __decorate([
        common_1.Get('array'),
        __param(0, common_1.Res())
    ], AppController.prototype, "getArray");
    __decorate([
        common_1.Get('display/:filename'),
        __param(0, common_1.Param('filename')), __param(1, common_1.Req()), __param(2, common_1.Res())
    ], AppController.prototype, "getFile");
    __decorate([
        common_1.Post('uploadFile'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file1', {
            storage: multer_1.diskStorage({
                destination: appHelper_1.Helper.filePath,
                filename: appHelper_1.Helper.customFileName
            })
        })),
        __param(0, common_1.UploadedFiles())
    ], AppController.prototype, "uploadfile");
    AppController = __decorate([
        common_1.Controller()
    ], AppController);
    return AppController;
}());
exports.AppController = AppController;
