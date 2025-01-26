import Sidebar from '@/components/Sidebar';

interface GameGuideProps {
  params: { slug: string };
}

const guides = {
  zelda: {
    title: 'ゼルダの伝説 ティアーズ オブ ザ キングダム 攻略',
    updateDate: '2024.03.21',
    content: `
      # ゼルダの伝説 ティアーズ オブ ザ キングダム 攻略

      ## 基本情報
      - 発売日: 2023年5月12日
      - ジャンル: アクションアドベンチャー
      - 対応機種: Nintendo Switch

      ## 目次
      1. ストーリー攻略
      2. サイドクエスト
      3. 収集要素
      4. 武器・装備
      5. 攻略のコツ

      ## 最新アップデート情報
      - DLC第2弾の新コンテンツ追加
      - 新たなダンジョンと装備の実装
      - バグ修正と調整
    `,
  },
  ff7: {
    title: 'FF7 リバース 攻略',
    updateDate: '2024.03.20',
    content: `
      # FF7 リバース 攻略ガイド

      ## 基本情報
      - 発売日: 2024年2月29日
      - ジャンル: アクションRPG
      - 対応機種: PS5

      ## 目次
      1. ストーリー攻略チャート
      2. ボス攻略
      3. マテリアガイド
      4. サイドクエスト
      5. 最強装備入手方法

      ## アップデート情報
      - Ver.1.1.0での追加要素
      - 新規ミニゲーム実装
      - バランス調整
    `,
  },
  'dragon-quest': {
    title: 'ドラゴンクエストモンスターズ 3 攻略',
    updateDate: '2024.03.19',
    content: `
      # ドラゴンクエストモンスターズ 3 攻略

      ## 基本情報
      - 発売日: 2023年12月1日
      - ジャンル: モンスター育成RPG
      - 対応機種: Nintendo Switch

      ## 目次
      1. ストーリー攻略
      2. モンスター図鑑
      3. 配合ガイド
      4. 育成のコツ
      5. 最強パーティ解説

      ## アップデート情報
      - 新イベントモンスター追加
      - 期間限定特別配合
      - システム改善
    `,
  },
} as const;

export default function GameGuidePage({ params }: GameGuideProps) {
  const guide = guides[params.slug as keyof typeof guides];

  if (!guide) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          ページが見つかりません
        </h1>
        <p className="text-gray-600">
          お探しのゲームガイドは存在しないか、移動された可能性があります。
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8">
      <article className="bg-white rounded-lg shadow-sm p-6">
        <header className="mb-8 pb-4 border-b">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{guide.title}</h1>
          <p className="text-sm text-gray-500">最終更新: {guide.updateDate}</p>
        </header>
        <div className="prose max-w-none">
          {guide.content.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
              return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.slice(2)}</h1>;
            }
            if (line.startsWith('## ')) {
              return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.slice(3)}</h2>;
            }
            if (line.startsWith('- ')) {
              return <li key={index} className="ml-4">{line.slice(2)}</li>;
            }
            if (line.trim()) {
              return <p key={index} className="my-2">{line}</p>;
            }
            return null;
          })}
        </div>
      </article>
      <Sidebar />
    </div>
  );
}
