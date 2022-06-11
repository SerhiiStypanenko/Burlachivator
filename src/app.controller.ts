/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AppService } from './app.service';
import {diskStorage} from 'multer';
import { Helper } from './shared/appHelper';
import fs, { createReadStream } from 'fs';
import decompress from 'decompress';
import { join } from 'path';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/')
  root(@Res() res: Response) {
    return res.render('../public/index.hbs');
  }

  @Get('list')
  getArray(@Res() res: Response) {
    let contentArray = [];
    let contentArrayName = [];
    this.appService.readFiles('./unzipped/', contentArray,contentArrayName);
    contentArray.reverse();

    return res.render('list', {data: contentArray});
  }

  @Get('display/:name')
  getFile(@Param('name') name ,@Req() req: Request,@Res() res: Response) {
    let contentArray = [];
    let contentArrayName = [];
    this.appService.readFiles('./unzipped/', contentArray,contentArrayName);
    const indexOfName = contentArrayName.indexOf(name);

    let pathToFile = contentArray[indexOfName].message;
    
    //console.log(`pathToFile:${pathToFile}`);
    //console.log(req.url);
    if(pathToFile.split('.')[1] != null){
      const file = createReadStream(join(process.cwd(), pathToFile));
      file.pipe(res);
    }else{
      console.log("It's a folder");
      res.render("list");
    }
    
  }

  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file1', {
     storage: diskStorage({
        destination:Helper.filePath,
        filename:Helper.customFileName
     })
        
    }))

  uploadfile(@UploadedFiles() file1):void {
    fs.readdir("./uploads/", (err, files) => {
      files.forEach(file => {
        if(file.split('.')[1] == "zip"){
          try{
            // eslint-disable-next-line prefer-const
            let path = './unzipped/'+file.split('.')[0];
            
            if(!fs.existsSync(path)) {
              fs.mkdirSync(path,{ recursive: true });
            }
            const files = decompress("./uploads/"+file, path,);
            console.log('extraction completed');
          }catch(error){
            console.log(error);
          };
        }else{
          console.log("Not an archive");
        }
        
      });
    });
  }


}
