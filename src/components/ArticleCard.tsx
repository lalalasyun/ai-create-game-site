import Link from 'next/link';
import Image from 'next/image';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  link: string;
  thumbnail: string;
}

export default function ArticleCard({ title, excerpt, date, link, thumbnail }: ArticleCardProps) {
  return (
    <article className="article-card">
      <Link href={link} className="block">
        <div className="relative w-full h-48">
          <Image
            src={thumbnail}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{date} 更新</p>
          <p className="text-gray-600 line-clamp-2">{excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
