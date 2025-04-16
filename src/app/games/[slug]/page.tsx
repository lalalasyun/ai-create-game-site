import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { getGameBySlug } from '@/lib/db/queries/games';
import { getArticlesByGameSlug } from '@/lib/db/queries/articles';

export default async function GamePage({ params }: { params: { slug: string } }) {
  // SQLiteからゲーム情報を取得
  const game = await getGameBySlug(params.slug);
  
  // ゲームが存在しない場合は404ページを表示
  if (!game) {
    notFound();
  }
  
  // このゲームに関連する記事を取得
  const articles = await getArticlesByGameSlug(params.slug);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="relative aspect-[3/4] w-full">
                {game.imageUrl ? (
                  <Image
                    src={game.imageUrl}
                    alt={game.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                    <span className="text-gray-400">画像なし</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
              
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                  {game.genre}
                </span>
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {game.platform}
                </span>
              </div>
              
              <div className="text-sm text-gray-500 mb-4">
                <p>発売日: {new Date(game.releaseDate).toLocaleDateString('ja-JP')}</p>
                <p>開発元: {game.developer}</p>
                <p>発売元: {game.publisher}</p>
              </div>
              
              <div className="mb-4">
                <h2 className="font-bold text-lg mb-2">ゲーム概要</h2>
                <p className="text-gray-700">{game.description}</p>
              </div>
              
              <div className="flex space-x-4">
                <Link
                  href={`/games/${game.slug}/guide`}
                  className="inline-block py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  攻略ガイド
                </Link>
              </div>
            </div>
          </div>
        </div>

        {articles.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">関連攻略記事</h2>
            <ul className="divide-y">
              {articles.map((article) => (
                <li key={article.id} className="py-4 first:pt-0 last:pb-0">
                  <Link
                    href={`/games/${game.slug}/guide/${article.slug}`}
                    className="block hover:bg-gray-50 p-2 -mx-2 rounded transition-colors"
                  >
                    <h3 className="font-bold text-lg mb-1 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {article.publishedAt && new Date(article.publishedAt).toLocaleDateString('ja-JP')}
                    </p>
                    <p className="text-gray-700">
                      {article.content.substring(0, 120)}...
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-500">このゲームに関連する攻略記事はまだありません。</p>
          </div>
        )}
      </div>

      <Sidebar />
    </div>
  );
}