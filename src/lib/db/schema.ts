// SQLiteデータベースのスキーマ定義
import { Generated, ColumnType } from 'kysely';

// ゲーム情報テーブルの型定義
export interface GamesTable {
  id: Generated<number>;
  slug: string;
  title: string;
  description: string;
  releaseDate: string;
  publisher: string;
  developer: string;
  genre: string; 
  platform: string;
  imageUrl: string | null;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, never>;
}

// 記事テーブルの型定義
export interface ArticlesTable {
  id: Generated<number>;
  title: string;
  slug: string;
  content: string;
  gameSlug: string | null;
  authorId: number;
  isPublished: boolean;
  viewCount: number;
  publishedAt: ColumnType<Date, string | undefined, never> | null;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, never>;
}

// タグテーブルの型定義
export interface TagsTable {
  id: Generated<number>;
  name: string;
  slug: string;
}

// 記事とタグの中間テーブル
export interface ArticleTagsTable {
  articleId: number;
  tagId: number;
}

// データベース全体の型定義
export interface Database {
  games: GamesTable;
  articles: ArticlesTable;
  tags: TagsTable;
  article_tags: ArticleTagsTable;
}