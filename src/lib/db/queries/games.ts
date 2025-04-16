import { db } from '../index';

// 全てのゲーム情報を取得する関数
export async function getAllGames() {
  const games = await db
    .selectFrom('games')
    .selectAll()
    .orderBy('title', 'asc')
    .execute();
  
  return games;
}

// 特定のスラッグに一致するゲーム情報を取得する関数
export async function getGameBySlug(slug: string) {
  const game = await db
    .selectFrom('games')
    .selectAll()
    .where('slug', '=', slug)
    .executeTakeFirst();
  
  return game;
}

// 最近リリースされたゲーム情報を取得する関数
export async function getRecentGames(limit: number = 5) {
  const games = await db
    .selectFrom('games')
    .selectAll()
    .orderBy('releaseDate', 'desc')
    .limit(limit)
    .execute();
  
  return games;
}

// 特定のジャンルに属するゲーム情報を取得する関数
export async function getGamesByGenre(genre: string, limit: number = 10) {
  const games = await db
    .selectFrom('games')
    .selectAll()
    .where('genre', '=', genre)
    .orderBy('releaseDate', 'desc')
    .limit(limit)
    .execute();
  
  return games;
}