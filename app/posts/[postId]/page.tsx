"use client"

import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { PostBody, PostPreview, PostType, PostUser, UserProfileType } from "types/types";
import { useEffect, useRef, useState } from "react";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "config/firebase.config";
import { Navbar } from "components/Navbar";
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
import LexicalEditorTopBar from "../../../components/LexicalEditorTopBar";
import TreeViewPlugin from "../../components/CustomPlugins/TreeViewPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ImagesPlugin from "components/CustomPlugins/ImagePlugin";
import FloatingTextFormatToolbarPlugin from "components/CustomPlugins/FloatingTextFormatPlugin";
import {$generateHtmlFromNodes} from '@lexical/html';
import lexicalEditorTheme from "../../theme/lexicalEditorTheme";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { ListNode, ListItemNode } from "@lexical/list";
import { ImageNode } from "components/CustomNodes/ImageNode";
import FullPost from "components/FullPost";
import PostCard from "components/PostCard";
import Comments from "components/Comments";
import LinkedList from "node_modules/parchment/dist/src/collection/linked-list";

const Page = ({ params }: { params: { postId: string } }) => {

    const user = auth.currentUser;
    const postId = params.postId;

    var isLoggedIn = false;

    if(user) isLoggedIn = true;

    var postUser: PostUser = {
        userId: "",
        username: "",
        fullName: "",
        userPhotoURL: "",
        location: "",
        occupation: "",
      };

    var postBody : PostBody = {
        body: "",
        comments: [],
        commentsCount: 0,
        likes: [],
        likesCount: 0,
        timestamp: 0,
        postId: "",
      };

    var preview : PostPreview = {
        postTitle: "",
        postPreview: "",
        previewPhotoURL: "",
        postId: "",
      };

    var profile : UserProfileType = {
        id: "",
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        fullName: "",
        occupation: "",
        location: "",
        links: [],
        bio: "",
        profilePhotoURL: "",
        postCount: 0,
        friends: [],
      };

    const [post, setPost] = useState<PostType>({preview, postBody, postUser});
    

    useEffect(() => {
      async function getData(postId: string) {
        
        const postRef = doc(firestore, `Posts/${postId}`);
        const postDoc = await getDoc(postRef);
        if (postDoc.exists()) 
        { 
          console.log(postDoc.data());
          preview = postDoc.data().preview;
          postBody = postDoc.data().postBody;
          postUser = postDoc.data().postUser;
          setPost({ preview: preview, postBody: postBody, postUser: postUser })
          console.log(postBody);
        } else 
        {
          console.log("User Not Found");
        }
      }
        getData(postId);
    }, []);

      


      return (
      <> 
        <div className="bg-zinc-950">
          <Navbar isLoggedIn={isLoggedIn}/>
          <PostCard post={post} fullPost={true}/>      
        </div>
      </>
    )
}

export default Page;