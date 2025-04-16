import { initializeDatabase, seedDatabase } from './index';

// 環境変数に基づいてデータベースの初期化を行う
// 開発環境の場合はシードデータも投入する
export async function setupDatabase() {
  try {
    await initializeDatabase();
    
    // 開発環境のみシードデータを投入
    if (process.env.NODE_ENV === 'development') {
      await seedDatabase();
    }
    
    return { success: true };
  } catch (error) {
    console.error('Database setup failed:', error);
    return { success: false, error };
  }
}

// サーバー起動時にデータベースのセットアップを実行する関数
export async function ensureDatabaseSetup() {
  const result = await setupDatabase();
  if (!result.success) {
    console.error('Failed to setup database. Application may not work correctly.');
  }
  return result;
}