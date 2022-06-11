"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let AppService = class AppService {
    readFiles(dir, contentArray, contentArrayName) {
        let files = fs_1.default.readdirSync(dir);
        for (let x in files) {
            let next = path_1.default.join(dir, files[x]);
            if (fs_1.default.lstatSync(next).isDirectory() == true) {
                this.readFiles(next, contentArray, contentArrayName);
                contentArray.push({ message: next, name: files[x] });
                contentArrayName.push(files[x]);
            }
            else {
                contentArray.push({ message: next, name: files[x] });
                contentArrayName.push(files[x]);
            }
        }
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map