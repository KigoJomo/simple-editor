"use client";

import { Undo, Redo } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEditorState, type Editor } from "@tiptap/react";

export function Actions({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  return (
    <ToggleGroup type="multiple" variant="outline" spacing={0}>
      <ToggleGroupItem
        value="undo"
        aria-label="Undo"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
      >
        <Undo className="h-4 w-4" />
      </ToggleGroupItem>

      <ToggleGroupItem
        value="redo"
        aria-label="Redo"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
      >
        <Redo className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
