import { IsDate, IsString } from 'class-validator';

export class ArticleDto {
  id: number;
  @IsString()
  articleData: string;
  @IsString()
  tags: string;
  @IsString()
  header: string;
  @IsDate()
  createdAt: Date;
}
