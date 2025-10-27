'use client';

import {
  EditorContent,
  useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { api } from '@/convex/_generated/api';
import { useTiptapSync } from '@convex-dev/prosemirror-sync/tiptap';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ToolBar } from './toolbar';

export default function ArticleEditor({ docId }: { docId: string }) {
  const sync = useTiptapSync(api.articles, docId);

  const editor = useEditor({
    extensions: [StarterKit, ...(sync.extension ? [sync.extension] : [])],
    content: sync.initialContent ?? undefined,
    autofocus: true,
    immediatelyRender: false,
  }, [sync.extension, sync.initialContent]);

  return sync.isLoading ? (
    <div className="w-full flex items-center justify-center gap-4">
      <Spinner />
      <p>Loading ...</p>
    </div>
  ) : sync.initialContent !== null ? (
    <>
      <div className="w-full h-fit flex flex-col gap-6 relative">
        {editor && (
          <>
            <ToolBar editor={editor} className="sticky top-2 z-20" />
            <EditorContent
              editor={editor}
              className={cn(
                'editor-container',
                'h-fit',
                '[&>.tiptap]:h-fit [&>.tiptap]:pb-32 [&>.tiptap]:border-none [&>.tiptap]:outline-none'
              )}
            />
          </>
        )}
      </div>
    </>
  ) : (
    <>
      <Button onClick={() => sync.create({ type: 'doc' })}></Button>
    </>
  );
}
