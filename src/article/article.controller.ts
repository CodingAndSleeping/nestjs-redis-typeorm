import { Controller, Get, Param, Req, Session } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get(':id')
  async getArticleById(@Param('id') id: number) {
    return await this.articleService.getArticleById(id);
  }

  @Get('view/:id')
  async viewArticle(@Param('id') id: number, @Session() session, @Req() req) {
    console.log(session);
    return await this.articleService.viewArticle(
      id,
      session?.user?.id || req.ip,
    );
  }
}
