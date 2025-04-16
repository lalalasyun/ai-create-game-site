import { getDb } from '../index';

// 全てのゲーム情報を取得する関数
export async function getAllGames() {
  try {
    const db = getDb();
    const games = await db
      .selectFrom('games')
      .selectAll()
      .orderBy('title', 'asc')
      .execute();
    
    return games;
  } catch (error) {
    console.error('ゲーム情報の取得に失敗しました:', error);
    return [];
  }
}

// 特定のスラッグに一致するゲーム情報を取得する関数
export async function getGameBySlug(slug: string) {
  try {
    const db = getDb();
    const game = await db
      .selectFrom('games')
      .selectAll()
      .where('slug', '=', slug)
      .executeTakeFirst();
    
    return game;
  } catch (error) {
    console.error(`スラッグ "${slug}" のゲーム取得に失敗しました:`, error);
    return null;
  }
}

// 最近リリースされたゲーム情報を取得する関数
export async function getRecentGames(limit: number = 5) {
  try {
    const db = getDb();
    const games = await db
      .selectFrom('games')
      .selectAll()
      .orderBy('releaseDate', 'desc')
      .limit(limit)
      .execute();
    
    return games;
  } catch (error) {
    console.error('最近のゲーム情報の取得に失敗しました:', error);
    return [];
  }
}

// 特定のジャンルに属するゲーム情報を取得する関数
export async function getGamesByGenre(genre: string, limit: number = 10) {
  try {
    const db = getDb();
    const games = await db
      .selectFrom('games')
      .selectAll()
      .where('genre', '=', genre)
      .orderBy('releaseDate', 'desc')
      .limit(limit)
      .execute();
    
    return games;
  } catch (error) {
    console.error(`ジャンル "${genre}" のゲーム取得に失敗しました:`, error);
    return [];
  }
}