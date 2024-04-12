import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Article } from './article/entities/article.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @InjectEntityManager()
  private entityManager: EntityManager;

  @Get('init-data')
  async initData() {
    await this.entityManager.save(User, {
      username: 'lzt',
      password: '123456',
    });

    await this.entityManager.save(User, {
      username: 'lzt1',
      password: '123456',
    });

    await this.entityManager.save(Article, {
      title: 'article1',
      content: 'content1',
    });

    await this.entityManager.save(Article, {
      title: 'article2',
      content: 'content2',
    });

    return 'done';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
