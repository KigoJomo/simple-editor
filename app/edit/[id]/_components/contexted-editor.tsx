'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { api } from '@/convex/_generated/api';
import { cn } from '@/lib/utils';
import { useTiptapSync } from '@convex-dev/prosemirror-sync/tiptap';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ToolBar } from './toolbar';

export default function ArticleEditor({ docId }: { docId: string }) {
  const sync = useTiptapSync(api.articles, docId);

  return sync.isLoading ? (
    <>
      <div className="w-full flex items-center justify-center gap-4">
        <Spinner />
        <p>Loading ...</p>
      </div>
    </>
  ) : sync.initialContent !== null ? (
    <div className="w-full h-fit flex flex-col gap-6 relative">
      <EditorProvider
        content={sync.initialContent}
        extensions={[StarterKit, sync.extension]}
        autofocus={true}
        immediatelyRender={false}
        editorContainerProps={{
          className: cn(
            // 'editor-container h-full overflow-y-auto hide-scrollbar',
            // 'rounded-xl border outline-4 outline-transparent outline-offset-1',
            // 'focus-within:outline-ring/50 transition-all',
            // alterntaive styles
            'editor-container h-fit'
          ),
        }}
        editorProps={{
          attributes: {
            class: cn(
              // 'editor min-h-full p-4',
              // 'border-none outline-none',
              // alterntaive styles
              'editor h-fit p-0 pb-32 border-none outline-none'
            ),
          },
        }}
        slotBefore={<EditorToolbar className="sticky top-2 z-20" />}
      />
    </div>
  ) : (
    <>
      <Button onClick={() => sync.create({ type: 'doc' })}>
        Create Document
      </Button>
    </>
  );
}

function EditorToolbar({ className = '' }: { className?: string }) {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return <ToolBar editor={editor} className={className} />;
}
