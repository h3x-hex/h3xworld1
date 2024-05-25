import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className='flex container border-x-zinc-50 border-solid items-center justify-center'>
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-row'>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                !editor.can()
                    .chain()
                    .focus()
                    .toggleBold()
                    .run()
                }
                className={editor.isActive('bold') ? 'is-active btn' : 'btn'}
            >
                <span className="material-symbols-outlined">format_bold</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                !editor.can()
                    .chain()
                    .focus()
                    .toggleItalic()
                    .run()
                }
                className={editor.isActive('italic') ? 'is-active btn' : 'btn'}
            >
                <span className="material-symbols-outlined">format_italic</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                !editor.can()
                    .chain()
                    .focus()
                    .toggleStrike()
                    .run()
                }
                className={editor.isActive('strike') ? 'is-active btn' : 'btn'}
            >
                <span className="material-symbols-outlined">format_strikethrough</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={
                !editor.can()
                    .chain()
                    .focus()
                    .toggleCode()
                    .run()
                }
                className={editor.isActive('code') ? 'is-active btn' : 'btn'}
            >
                <span className="material-symbols-outlined">code</span>
            </button>
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active btn' : 'btn'}
            >
                <span className="material-symbols-outlined">format_paragraph</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active btn' : 'btn'}
            >
                <span className="material-symbols-outlined">format_h1</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active btn' : 'btn'}
            >
                <span className="material-symbols-outlined">format_h2</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'is-active btn' : 'btn'}
            >
                <span className="material-symbols-outlined">format_h3</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={editor.isActive('heading', { level: 4 }) ? 'is-active btn' : 'btn'}
            >
                <span className="material-symbols-outlined">format_h4</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={editor.isActive('heading', { level: 5 }) ? 'is-active btn' : 'btn'}
            >
                <span className="material-symbols-outlined">format_h5</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className={editor.isActive('heading', { level: 6 }) ? 'is-active btn' : 'btn'}
            >
                <span className="material-symbols-outlined">format_h6</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active btn' : 'btn'}
            >
                <span className="material-symbols-outlined">format_list_bulleted</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active btn' : 'btn'}
            >
                <span className="material-symbols-outlined">format_list_numbered</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? 'is-active btn' : 'btn'}
            >
                <span className="material-symbols-outlined">code_blocks</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active btn' : 'btn'}
            >
                <span className="material-symbols-outlined">format_quote</span>
            </button>
            <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="btn">
            <span className="material-symbols-outlined">horizontal_rule</span>
            </button>
            <button onClick={() => editor.chain().focus().setHardBreak().run()} className="btn">
                <span className="material-symbols-outlined">insert_page_break</span>
            </button>
            </div>
            <div className='flex flex-row'>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                className="btn"
                disabled={
                !editor.can()
                    .chain()
                    .focus()
                    .undo()
                    .run()
                }
            >
                <span className="material-symbols-outlined">undo</span>
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                className="btn"
                disabled={
                !editor.can()
                    .chain()
                    .focus()
                    .redo()
                    .run()
                }
            >
                <span className="material-symbols-outlined">redo</span>
            </button>
            <button
                onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active btn' : 'btn'}
            >
                <span className="material-symbols-outlined">format_color_text</span>
            </button>
            <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className="btn">
                <span className="material-symbols-outlined">format_clear</span>
            </button>
            </div>
        </div>
    </div>
  )
}

const editorProps = {attributes: {class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none border-solid border-white'}}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  
]

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

export default function TipTap () {
  return (
    <EditorProvider 
        className="w-full h-10/12" 
        slotBefore={<MenuBar />} 
        extensions={extensions} 
        content={content}
        editorProps={editorProps}>
    </EditorProvider>
  )
}