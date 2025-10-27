'use client';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';
import { MoveLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';

const ArticleEditor = dynamic(() => import('./_components/contexted-editor'), {
  ssr: false,
});

export default function Page() {
  const params = useParams();
  const id = params.id as Id<'articles'>;

  const article = useQuery(api.articles.getArticleById, { id });

  return article === undefined ? (
    <>
      <section className="h-screen flex flex-col items-center justify-center gap-6">
        <Spinner />
        <span>Getting article</span>
      </section>
    </>
  ) : article === null ? (
    <>
      <section className="h-screen flex flex-col items-center justify-center gap-6">
        <h4>Article not found!</h4>
        <Link href="/">
          <Button variant={'link'}>Go back</Button>
        </Link>
      </section>
    </>
  ) : (
    <>
      <section className="h-screen flex flex-col gap-6">
        <Link href="/">
          <Button variant={'secondary'}>
            <MoveLeft />
            Back to Articles
          </Button>
        </Link>
        <div className="flex flex-col gap-4 p-6 rounded-xl bg-secondary">
          <h2>{article.title}</h2>
          <span className="max-w-4xl whitespace-pre-wrap">
            {article.overview}
          </span>
        </div>

        <Separator />

        <ArticleEditor docId={article.docId} />
      </section>
    </>
  );
}
