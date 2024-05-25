import React from 'react'

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EditorState } from 'lexical';
import { HeadingNode } from '@lexical/rich-text';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListNode, ListItemNode } from '@lexical/list';
import { ToolbarPlugin } from './Toolbar';
import { BannerPlugin, BannerNode } from './BannerPlugin';



interface Props {}

const theme = {
    heading: {
      h1: 'glyf-editor-h1',
      h2: 'glyf-editor-h2',
      h3: 'glyf-editor-h3'
    },
    text: {
      bold: 'glyf-editor-bold',
      italic: 'glyf-editor-italic',
      underline: 'glyf-editor-underline',
      strikethrough: 'glyf-editor-strikethrough',
      underlineStrikethrough: 'glyf-editor-underlineStrikethrough'
    },
    banner: 'glyf-editor-banner'
  };

function onError(error: Error): void {
    console.error(error);
}

function MyOnChangePlugin(props: {onChange: (editorState: EditorState) => void}) : null
{   
    const [ editor ] = useLexicalComposerContext()
    const { onChange } = props;
    React.useEffect(() => {
        return editor.registerUpdateListener(({editorState}) => {
            onChange(editorState);
        });
    }, [onChange, editor]);
    return null;
}

const Editor = ({}: Props) => {

    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        nodes: [HeadingNode, ListNode, ListItemNode, BannerNode]
      };

  return (
    <>
    <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <BannerPlugin />
        <ListPlugin />
        <PlainTextPlugin
            contentEditable={<ContentEditable className="h-[500px] w-[800px] py-3 px-3"/>}
            placeholder={<div className='absolute top-[60px] left-3 text-left'>Write your story...</div>}
            ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin/>
        <MyOnChangePlugin onChange={(editorState) => { console.log(editorState) }}/>
    </LexicalComposer>
    <ul tabIndex={0} className="flex flex-row px-3 items-center display-none">
    <li><a href="/home" className=" px-3">Homepage</a></li>
    <li><button className="px-3" onClick={goProfile}>Profile</button></li>
    <li><a className="px-3" href="/Explore">Explore</a></li>
    <label className="input input-bordered flex items-center gap-1 rounded-full h-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        <input type="text" className="grow" placeholder="Search Profiles" />
    </label>
</ul>
    </>
  )
}

export default Editor