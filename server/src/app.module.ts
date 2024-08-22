import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UserModule, TrackModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
