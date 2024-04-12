import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  @InjectRepository(Article)
  private articleRepository: Repository<Article>;

  async getArticleById(id: number) {
    return await this.articleRepository.findOne({
      where: { id },
    });
  }

  async viewArticle(id: number) {
    const article = await this.getArticleById(id);
    article.viewCount++;
    await this.articleRepository.save(article);
    return article;
  }
}
