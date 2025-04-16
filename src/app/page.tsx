import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import ArticleCard from '@/components/ArticleCard';
import { getRecentGames } from '@/lib/db/queries/games';
import { getPublishedArticles } from '@/lib/db/queries/articles';
import { GamesTable, ArticlesTable } from '@/lib/db/schema';

export default async function Home() {
  // SQLiteからデータを取得
  const recentGames = await getRecentGames(3);
  const latestArticles = await getPublishedArticles(6);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">最新ゲーム</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recentGames.map((game) => (
              <Link 
                href={`/games/${game.slug}`} 
                key={typeof game.id === 'object' ? String(game.id) : game.id}
                className="group block"
              >
                <div className="relative h-48 overflow-hidden rounded-lg mb-2">
                  {game.imageUrl ? (
                    <Image 
                      src={game.imageUrl} 
                      alt={game.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">画像なし</span>
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">
                  {game.title}
                </h3>
                <p className="text-sm text-gray-500">{game.publisher} | {game.platform}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/games" 
              className="inline-block py-2 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              全てのゲームを見る
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">最新攻略記事</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {latestArticles.map((article) => {
              // 日付の処理を関数内で行う
              const formattedDate = (() => {
                if (!article.publishedAt) return '';
                try {
                  // publishedAtが文字列の場合
                  if (typeof article.publishedAt === 'string') {
                    return new Date(article.publishedAt).toLocaleDateString('ja-JP');
                  }
                  // その他の場合（ColumnTypeオブジェクトなど）
                  return new Date(String(article.publishedAt)).toLocaleDateString('ja-JP');
                } catch (e) {
                  console.error('日付の変換に失敗:', e);
                  return '';
                }
              })();
              
              return (
                <ArticleCard 
                  key={typeof article.id === 'object' ? String(article.id) : article.id}
                  title={article.title}
                  excerpt={article.content.substring(0, 120) + '...'}
                  slug={article.slug}
                  gameSlug={article.gameSlug || ''}
                  publishDate={formattedDate}
                />
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/news" 
              className="inline-block py-2 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              全ての記事を見る
            </Link>
          </div>
        </section>
      </div>

      <Sidebar />
    </div>
  );
}
