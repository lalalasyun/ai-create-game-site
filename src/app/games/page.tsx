import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { getAllGames } from '@/lib/db/queries/games';

export default async function GamesPage() {
  // SQLiteから全てのゲーム情報を取得
  const games = await getAllGames();
  
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-8">ゲーム一覧</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Link 
                href={`/games/${game.slug}`} 
                key={game.id}
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
                <p className="text-sm text-gray-500">発売日: {new Date(game.releaseDate).toLocaleDateString('ja-JP')}</p>
              </Link>
            ))}
          </div>
          
          {games.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">ゲーム情報がまだ登録されていません</p>
            </div>
          )}
        </div>
      </div>
      
      <Sidebar />
    </div>
  );
}
