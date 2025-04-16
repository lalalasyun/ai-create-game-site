import { initializeDatabase, seedDatabase } from './index';

// 環境変数に基づいてデータベースの初期化を行う
// 開発環境の場合はシードデータも投入する
export async function setupDatabase() {
  console.log('データベースセットアップを開始します...');
  try {
    // データベース初期化
    const initialized = await initializeDatabase();
    if (!initialized) {
      console.error('データベース初期化に失敗しました');
      return { success: false, error: 'Database initialization failed' };
    }
    
    console.log('データベース初期化が完了しました。シードデータを投入します...');
    
    // シードデータを投入
    const seeded = await seedDatabase();
    if (!seeded) {
      console.error('シードデータの投入に失敗しました');
      return { success: false, error: 'Database seeding failed' };
    }
    
    console.log('データベースセットアップが完了しました');
    return { success: true };
  } catch (error) {
    console.error('データベースセットアップに失敗しました:', error);
    return { success: false, error };
  }
}

// サーバー起動時にデータベースのセットアップを実行する関数
export async function ensureDatabaseSetup() {
  try {
    console.log('データベース接続を確認中...');
    const result = await setupDatabase();
    if (!result.success) {
      console.error('データベースセットアップに失敗しました。アプリケーションが正常に動作しない可能性があります。');
    } else {
      console.log('データベースのセットアップが完了しました。アプリケーションは正常に動作します。');
    }
    return result;
  } catch (error) {
    console.error('データベースセットアップ中に予期しないエラーが発生しました:', error);
    return { success: false, error };
  }
}