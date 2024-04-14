import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { User } from './user/entities/user.entity';
import { Article } from './article/entities/article.entity';
import { RedisModule } from './redis/redis.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // connect to mysql database
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'article_views',
      synchronize: true,
      logging: true,
      entities: [User, Article],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    RedisModule, // connect to redis database
    ScheduleModule.forRoot(), // schedule tasks
    UserModule, // register user module
    ArticleModule, // register article module
    TaskModule, // register task module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
