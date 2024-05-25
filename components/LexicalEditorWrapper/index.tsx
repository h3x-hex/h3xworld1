import { $getRoot, $getSelection } from "lexical";
import { useEffect, useRef } from "react";
import {$generateHtmlFromNodes} from '@lexical/html';
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { MuiContentEditable, placeHolderSx } from "./styles";
import { Box, Divider } from "@mui/material";
import { lexicalEditorConfig } from "../../config/lexicalEditorConfig";
import LexicalEditorTopBar from "../LexicalEditorTopBar";
import TreeViewPlugin from "../CustomPlugins/TreeViewPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ImagesPlugin from "../CustomPlugins/ImagePlugin";
import FloatingTextFormatToolbarPlugin from "../CustomPlugins/FloatingTextFormatPlugin";


async function LexicalEditorWrapper(props) {

  const loadContent = async () => {
    // 'empty' editor
    const value = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
  
    return value;
  }

  const initialEditorState = await loadContent();
  const editorStateRef = useRef();
  var postJSON = '';
  
  return (
    <>
      <LexicalComposer initialConfig={{
        editorState: initialEditorState,
        lexicalEditorConfig
      }}>
        <LexicalEditorTopBar />
        <Divider />
        <Box className="bg-zinc-950" sx={{ position: "relative"}}>
          <RichTextPlugin // #312D4B
            contentEditable={<MuiContentEditable className="h-auto"/>}
            placeholder={<Box className="absolute top-0" sx={placeHolderSx}>Enter some text...</Box>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={editorState => editorStateRef.current = editorState} />
          
          <ListPlugin />
          <LinkPlugin />
          <ImagesPlugin captionsEnabled={false} />
          <FloatingTextFormatToolbarPlugin />
        </Box>
      </LexicalComposer>

      <div className="pb-8">
        <button className="btn btn-circle btn-outline btn-warning w-36" onClick={() => {
          if (editorStateRef.current) 
          {
            postJSON = (JSON.stringify(editorStateRef.current))
          }}}
        >Publish</button>
      </div>
      <div className="container h-24"> </div>
    </>
  );
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.

export default LexicalEditorWrapper;
