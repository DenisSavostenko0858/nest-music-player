import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as path from "node:path";
import * as fs from "fs";
import * as uuid from "uuid"

export enum FileType {
    AUDIO = 'audio',
    IMAGE = 'image',
}

@Injectable()
export class FileService {
    createFile(type: FileType, file): string{
        try {
            const fileExtension = file.originalname.split(".").pop();
            const fileName = uuid.v4() + '.' + fileExtension
            const filePath = path.resolve(__dirname, '../..', 'static', type)

            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, { recursive: true });
            }

            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)

            return type + '/' + fileName;
        } catch (e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteFile(fileName: string){
        // try {
        //     const filePath = path.resolve(__dirname, '..', 'static', fileName);
        //     fs.unlink(filePath);
        // } catch (e) {
        //     throw new HttpException(`Failed to delete file: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        // }
    }
}