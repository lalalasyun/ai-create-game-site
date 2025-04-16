import Link from 'next/link';
import Image from 'next/image';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  publishDate?: string;
  date?: string;  // 以前のバージョンと互換性を保つため
  link?: string;  // 明示的なリンクがある場合用
  thumbnail?: string;
  slug?: string;   // 記事のスラッグ
  gameSlug?: string; // ゲームのスラッグ
}

export default function ArticleCard({ 
  title, 
  excerpt, 
  publishDate, 
  date, 
  link, 
  thumbnail, 
  slug,
  gameSlug 
}: ArticleCardProps) {
  // リンクの構築: 明示的なlinkがあればそれを使い、なければslugとgameSlugから構築
  const articleLink = link || (gameSlug 
    ? `/games/${gameSlug}/guide/${slug}` 
    : slug 
      ? `/news/${slug}` 
      : '#');

  // 日付の表示用
  const displayDate = publishDate || date || '';

  return (
    <article className="article-card">
      <Link href={articleLink} className="block">
        <div className="relative w-full h-48">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">画像なし</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {title}
          </h3>
          {displayDate && <p className="text-sm text-gray-500 mb-2">{displayDate} 更新</p>}
          <p className="text-gray-600 line-clamp-2">{excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
