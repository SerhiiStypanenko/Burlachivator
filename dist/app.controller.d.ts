import { Response } from 'express';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    root(res: Response): void;
    getArray(res: Response): void;
    getFile(name: any, req: Request, res: Response): void;
    uploadfile(file1: any): void;
}
