import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';

const gamesList = [
  {
    title: 'ゼルダの伝説 ティアーズ オブ ザ キングダム',
    excerpt: 'オープンワールドで広大なハイラルを冒険しよう。空島から地下まで、全エリアの攻略情報を掲載！',
    date: '2024.03.21',
    link: '/games/zelda/guide',
    thumbnail: 'https://placehold.co/600x400',
  },
  {
    title: 'FF7 リバース',
    excerpt: 'ミッドガルを舞台に展開される壮大な物語。戦闘システムからマテリア相性まで徹底解説。',
    date: '2024.03.20',
    link: '/games/ff7/guide',
    thumbnail: 'https://placehold.co/600x400',
  },
  {
    title: 'ドラゴンクエストモンスターズ 3',
    excerpt: '全モンスターの配合ルートと育成方法を紹介。最強パーティの作り方も解説！',
    date: '2024.03.19',
    link: '/games/dragon-quest/guide',
    thumbnail: 'https://placehold.co/600x400',
  },
  {
    title: 'ペルソナ6',
    excerpt: 'コープ攻略からペルソナ合体まで、フルボリュームの攻略情報をお届け。',
    date: '2024.03.18',
    link: '/games/persona6/guide',
    thumbnail: 'https://placehold.co/600x400',
  },
  {
    title: 'ポケットモンスター スカーレット・バイオレット',
    excerpt: '最新DLCの攻略情報も随時更新中！新ポケモンの出現場所や特性も詳しく解説。',
    date: '2024.03.17',
    link: '/games/pokemon/guide',
    thumbnail: 'https://placehold.co/600x400',
  },
];

export default function GamesPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8">
      <main>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">ゲーム一覧</h1>
        <div className="grid gap-6 sm:grid-cols-2">
          {gamesList.map((game) => (
            <ArticleCard
              key={game.link}
              title={game.title}
              excerpt={game.excerpt}
              date={game.date}
              link={game.link}
              thumbnail={game.thumbnail}
            />
          ))}
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
