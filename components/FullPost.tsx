import { getAuth } from "firebase/auth";
import LexicalEditorWrapper from "components/LexicalEditorWrapper/index";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { MuiContentEditable, placeHolderSx } from "./styles";
import { Box, Divider } from "@mui/material";
import { lexicalEditorConfig } from "../../../config/lexicalEditorConfig";
import LexicalEditorTopBar from "../components/LexicalEditorTopBar";
import TreeViewPlugin from "../components/CustomPlugins/TreeViewPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ImagesPlugin from "../components/CustomPlugins/ImagePlugin";
import FloatingTextFormatToolbarPlugin from "../components/CustomPlugins/FloatingTextFormatPlugin";
import {$generateHtmlFromNodes, $generateNodesFromDOM} from '@lexical/html';
import { $insertNodes } from 'lexical';
import lexicalEditorTheme from "../../theme/lexicalEditorTheme";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { ListNode, ListItemNode } from "@lexical/list";
import { ImageNode } from "../components/CustomNodes/ImageNode";
import { PostBody, PostPreview, PostType, PostUser, UserProfileType } from "types/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { firestore } from "config/firebase.config";

interface IProps {
    post: PostType
}

export default function FullPost ({post}: IProps) {

    const editorStateRef = useRef();
    const initialConfig = {
        editable: false,
        onError(error: Error) {
            throw error;
          },
        editorState: (editor) => {
          editor.update(() => {
            const editorState = editor.parseEditorState(postBody.body);
            editor.setEditorState(editorState);
            const htmlString = $generateHtmlFromNodes(editor, null);
            const parser = new DOMParser();
            const dom = parser.parseFromString(htmlString, 'text/html');
            const nodes = $generateNodesFromDOM(editor, dom);
            $insertNodes(nodes);
          })
        },
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            TableNode,
            TableCellNode,
            TableRowNode,
            AutoLinkNode,
            LinkNode,
            ImageNode,
          ],
      }


    return (
        <>
            
        </>
    )

}