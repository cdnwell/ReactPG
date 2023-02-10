// our-domain.com/news
// 파일 기반 라우팅 (특수한 폴더인 pages 안의 js파일들)
import Link from 'next/link';

function NewsPage() {
  return (
    <>
      <h1>The News Page</h1>
      <ul>
        <li>
          <Link href="/news/nextjs-is-a-great-framework">
            NextJS Is A Great Framework
          </Link>
        </li>
        <li>Something Else</li>
      </ul>
    </>
  );
}

export default NewsPage;
