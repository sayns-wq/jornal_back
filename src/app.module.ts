import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from './db/typeorm.module';
import { ArticleModule } from './entities/article/article.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ArticleModule,
    TypeOrmModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
