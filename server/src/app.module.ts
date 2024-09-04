import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { CommentModule } from './comment/comment.module';
import {FileModule} from "./file/file.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "node:path";

@Module({
  imports: [
      ServeStaticModule.forRoot({
        rootPath: path.resolve(__dirname, '../static')
      }),
      UserModule, TrackModule, CommentModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
