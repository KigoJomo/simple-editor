"use client";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Pilcrow,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Braces,
  MessageSquareQuote,
  Undo,
  Redo,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  EditorContent,
  useEditor,
  useEditorState,
  type Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";

function Actions({ editor }: { editor: Editor }) {
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
    <ToggleGroup
      type="multiple"
      variant="default"
      spacing={2}
      className="border p-0.5"
    >
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

function MediaTools({ editor }: { editor: Editor }) {
  return (
    <>
      <ToggleGroup
        type="multiple"
        variant="default"
        spacing={2}
        className="flex-1 border p-0.5"
      ></ToggleGroup>
    </>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
      };
    },
  });

  return (
    <>
      <ToggleGroup
        type="multiple"
        variant={"default"}
        spacing={2}
        orientation="vertical"
        aria-orientation="vertical"
        className="flex-col border p-1"
      >
        <ToggleGroupItem
          value="bold"
          aria-label="Toggle Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          aria-pressed={editorState.isBold}
          data-state={editorState.isBold ? "on" : "off"}
        >
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="underline"
          aria-label="Toggle Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editorState.canUnderline}
          aria-pressed={editorState.isUnderline}
          data-state={editorState.isUnderline ? "on" : "off"}
        >
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="italic"
          aria-label="Toggle Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          aria-pressed={editorState.isItalic}
          data-state={editorState.isItalic ? "on" : "off"}
        >
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="strike"
          aria-label="Toggle Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          aria-pressed={editorState.isStrike}
          data-state={editorState.isStrike ? "on" : "off"}
        >
          <Strikethrough className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="code"
          aria-label="Toggle Code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          aria-pressed={editorState.isCode}
          data-state={editorState.isCode ? "on" : "off"}
        >
          <Code className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="paragraph"
          aria-label="Toggle Paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
          aria-pressed={editorState.isParagraph}
          data-state={editorState.isParagraph ? "on" : "off"}
        >
          <Pilcrow className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="heading-1"
          aria-label="Toggle Heading One"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          aria-pressed={editorState.isHeading1}
          data-state={editorState.isHeading1 ? "on" : "off"}
        >
          <Heading1 className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="heading-2"
          aria-label="Toggle Heading Two"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          aria-pressed={editorState.isHeading2}
          data-state={editorState.isHeading2 ? "on" : "off"}
        >
          <Heading2 className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="heading-3"
          aria-label="Toggle Heading Three"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          aria-pressed={editorState.isHeading3}
          data-state={editorState.isHeading3 ? "on" : "off"}
        >
          <Heading3 className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="heading-4"
          aria-label="Toggle Heading Four"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          aria-pressed={editorState.isHeading4}
          data-state={editorState.isHeading4 ? "on" : "off"}
        >
          <Heading4 className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="heading-5"
          aria-label="Toggle Heading Five"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          aria-pressed={editorState.isHeading5}
          data-state={editorState.isHeading5 ? "on" : "off"}
        >
          <Heading5 className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="heading-6"
          aria-label="Toggle Heading Six"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          aria-pressed={editorState.isHeading6}
          data-state={editorState.isHeading6 ? "on" : "off"}
        >
          <Heading6 className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="bulletList"
          aria-label="Toggle Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-pressed={editorState.isBulletList}
          data-state={editorState.isBulletList ? "on" : "off"}
        >
          <List className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="orderedList"
          aria-label="Toggle Ordered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-pressed={editorState.isOrderedList}
          data-state={editorState.isOrderedList ? "on" : "off"}
        >
          <ListOrdered className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="codeBlock"
          aria-label="Toggle Code Block"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          aria-pressed={editorState.isCodeBlock}
          data-state={editorState.isCodeBlock ? "on" : "off"}
        >
          <Braces className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="blockquote"
          aria-label="Toggle Blockqoute"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          aria-pressed={editorState.isBlockquote}
          data-state={editorState.isBlockquote ? "on" : "off"}
        >
          <MessageSquareQuote className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}

export default function TipTap() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <h1>Heading 1 - Main Title</h1>
      <h2>Heading 2 - Section Title</h2>
      <h3>Heading 3 - Subsection</h3>
      <h4>Heading 4 - Minor Heading</h4>
      <h5>Heading 5 - Small Heading</h5>
      <h6>Heading 6 - Smallest Heading</h6>
      
      <p>This is a paragraph with <strong>bold text</strong>, <em>italic text</em>, <u>underlined text</u>, <s>strikethrough text</s>, and <code>inline code</code>.</p>
      
      <p>You can also combine styles: <strong><em>bold and italic</em></strong>, <strong><u>bold and underlined</u></strong>, <em><s>italic and strikethrough</s></em>.</p>
      
      <blockquote>
        <p>This is a blockquote. Use it for important quotes or callouts.</p>
      </blockquote>

      <hr />
      
      <p>Bullet list example:</p>
      <ul>
        <li>First item</li>
        <li>Second item with <strong>bold</strong></li>
        <li>Third item with <em>italic</em></li>
      </ul>
      
      <p>Ordered list example:</p>
      <ol>
        <li>First step</li>
        <li>Second step with <code>code</code></li>
        <li>Third step</li>
      </ol>
      
      <p>Code block example:</p>
      <pre><code>function hello() {
  console.log("Hello, world!");
  return true;
}</code></pre>
      
      <p>Mix and match all styles to create rich, formatted content!</p>
    `,
    autofocus: true,
    immediatelyRender: false,
  });

  return (
    <div className="w-full flex gap-2 h-full">
      {editor && <Toolbar editor={editor} />}
      <div className="w-full flex flex-col gap-2">
        {editor && (
          <div className="w-full flex gap-2">
            <Actions editor={editor} />
            <MediaTools editor={editor} />
          </div>
        )}
        <EditorContent
          editor={editor}
          className={cn(
            "w-full min-h-48 flex-1 border ring-3 ring-transparent rounded-xl overflow-y-scroll",
            "focus-within:ring-ring transition-all",
            "[&>.tiptap]:min-h-48 [&>.tiptap]:rounded-xl [&>.tiptap]:p-4 [&>.tiptap]:!border-none [&>.tiptap]:!outline-none",
          )}
        />
      </div>
    </div>
  );
}
