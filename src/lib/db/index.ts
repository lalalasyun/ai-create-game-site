import { Database as SqliteDatabase } from 'better-sqlite3';
import Database from 'better-sqlite3';
import { Kysely, SqliteDialect, sql } from 'kysely';
import { join } from 'path';
import * as schema from './schema';

// SQLite データベースファイルのパスを指定
const DATABASE_PATH = process.env.DATABASE_PATH || join(process.cwd(), 'data/game-site.db');

// データベース接続の遅延初期化のためのファクトリ関数
let dbInstance: Kysely<schema.Database> | null = null;

export function getDb(): Kysely<schema.Database> {
  if (!dbInstance) {
    try {
      // データベースディレクトリの作成を試みる
      const fs = require('fs');
      const path = require('path');
      const dir = path.dirname(DATABASE_PATH);
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Kysely インスタンスを作成
      dbInstance = new Kysely<schema.Database>({
        dialect: new SqliteDialect({
          database: new Database(DATABASE_PATH, { verbose: console.log })
        }),
      });
    } catch (error) {
      console.error('データベース接続エラー:', error);
      throw error;
    }
  }
  return dbInstance;
}

// 既存のコードとの互換性のため、dbエクスポートを維持
export const db = getDb();

// データベース初期化関数
export async function initializeDatabase() {
  try {
    // データベースインスタンスを取得
    const dbInstance = getDb();
    
    // テーブルの作成
    await createTables(dbInstance);
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('データベース初期化エラー:', error);
    return false;
  }
}

// テーブル作成関数
async function createTables(db: Kysely<schema.Database>) {
  // games テーブル
  await db.schema
    .createTable('games')
    .ifNotExists()
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('slug', 'text', col => col.notNull().unique())
    .addColumn('title', 'text', col => col.notNull())
    .addColumn('description', 'text', col => col.notNull())
    .addColumn('releaseDate', 'text', col => col.notNull())
    .addColumn('publisher', 'text', col => col.notNull())
    .addColumn('developer', 'text', col => col.notNull())
    .addColumn('genre', 'text', col => col.notNull())
    .addColumn('platform', 'text', col => col.notNull())
    .addColumn('imageUrl', 'text')
    .addColumn('createdAt', 'text', col => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updatedAt', 'text', col => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

  // articles テーブル
  await db.schema
    .createTable('articles')
    .ifNotExists()
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('title', 'text', col => col.notNull())
    .addColumn('slug', 'text', col => col.notNull().unique())
    .addColumn('content', 'text', col => col.notNull())
    .addColumn('gameSlug', 'text')
    .addColumn('authorId', 'integer', col => col.notNull())
    .addColumn('isPublished', 'boolean', col => col.notNull().defaultTo(false))
    .addColumn('viewCount', 'integer', col => col.notNull().defaultTo(0))
    .addColumn('publishedAt', 'text')
    .addColumn('createdAt', 'text', col => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updatedAt', 'text', col => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

  // tags テーブル
  await db.schema
    .createTable('tags')
    .ifNotExists()
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('name', 'text', col => col.notNull())
    .addColumn('slug', 'text', col => col.notNull().unique())
    .execute();

  // article_tags 中間テーブル
  await db.schema
    .createTable('article_tags')
    .ifNotExists()
    .addColumn('articleId', 'integer', col => col.notNull().references('articles.id').onDelete('cascade'))
    .addColumn('tagId', 'integer', col => col.notNull().references('tags.id').onDelete('cascade'))
    .addPrimaryKeyConstraint('article_tags_primary_key', ['articleId', 'tagId'])
    .execute();
}

// データベースの初期化と簡易的なシード処理
export async function seedDatabase() {
  try {
    const db = getDb();
    
    // タグの追加
    const tags = [
      { name: 'RPG', slug: 'rpg' },
      { name: 'アクション', slug: 'action' },
      { name: 'オープンワールド', slug: 'open-world' },
      { name: 'シミュレーション', slug: 'simulation' },
      { name: 'Switch', slug: 'switch' },
      { name: 'PS5', slug: 'ps5' },
      { name: '攻略', slug: 'guide' },
      { name: '初心者向け', slug: 'beginner' },
    ];

    for (const tag of tags) {
      const existingTag = await db
        .selectFrom('tags')
        .where('slug', '=', tag.slug)
        .selectAll()
        .executeTakeFirst();
      
      if (!existingTag) {
        await db
          .insertInto('tags')
          .values(tag)
          .execute();
      }
    }

    // ゲーム情報の追加
    const games = [
      {
        slug: 'ff7',
        title: 'ファイナルファンタジーVII リバース',
        description: 'クラウドと仲間たちの冒険を描いた名作RPGのリメイク',
        releaseDate: '2023-04-01',
        publisher: 'スクウェア・エニックス',
        developer: 'スクウェア・エニックス',
        genre: 'RPG',
        platform: 'PS5',
        imageUrl: '/images/games/ff7.jpg',
      },
      {
        slug: 'zelda',
        title: 'ゼルダの伝説 ティアーズ オブ ザ キングダム',
        description: 'ハイラルの広大な世界を冒険するアクションアドベンチャー',
        releaseDate: '2023-05-12',
        publisher: '任天堂',
        developer: '任天堂',
        genre: 'アクションアドベンチャー',
        platform: 'Nintendo Switch',
        imageUrl: '/images/games/zelda.jpg',
      },
      {
        slug: 'dragon-quest',
        title: 'ドラゴンクエストモンスターズ3 魔族の王子とエルフの旅',
        description: '人気モンスター育成RPGシリーズの最新作',
        releaseDate: '2023-12-01',
        publisher: 'スクウェア・エニックス',
        developer: 'スクウェア・エニックス',
        genre: 'RPG',
        platform: 'Nintendo Switch',
        imageUrl: '/images/games/dqm3.jpg',
      },
    ];

    for (const game of games) {
      const existingGame = await db
        .selectFrom('games')
        .where('slug', '=', game.slug)
        .selectAll()
        .executeTakeFirst();
      
      if (!existingGame) {
        await db
          .insertInto('games')
          .values({
            ...game,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
          .execute();
      }
    }

    console.log('Database seeded successfully');
    return true;
  } catch (error) {
    console.error('データベースシードエラー:', error);
    return false;
  }
}