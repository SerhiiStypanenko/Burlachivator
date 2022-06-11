/* eslint-disable prefer-const */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import fs from 'fs';
import path from 'path';

@Injectable()
export class AppService {
  readFiles(dir, contentArray, contentArrayName) {
    //console.log('-', dir);
    let files = fs.readdirSync(dir);
    for (let x in files) {
      let next = path.join(dir, files[x]);

      if (fs.lstatSync(next).isDirectory() == true) {
        this.readFiles(next, contentArray, contentArrayName);
        contentArray.push({ message: next, name: files[x] });
        contentArrayName.push(files[x]);
      } else {
        contentArray.push({ message: next, name: files[x] });
        contentArrayName.push(files[x]);
      }
    }
  }
}
