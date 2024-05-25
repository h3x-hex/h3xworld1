"use client";

import Image from "next/image";
import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "config/firebase.config";
import { Navbar } from "components/Navbar";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import Editor from "components/Editor1";
import LexicalEditorWrapper from "components/LexicalEditorWrapper/index";
import { $getRoot, $getSelection } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { MuiContentEditable, placeHolderSx } from "./styles";
import { Box, Divider } from "@mui/material";
import { lexicalEditorConfig } from "../../../config/lexicalEditorConfig";
import LexicalEditorTopBar from "../../components/LexicalEditorTopBar";
import TreeViewPlugin from "../../components/CustomPlugins/TreeViewPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ImagesPlugin from "../../components/CustomPlugins/ImagePlugin";
import FloatingTextFormatToolbarPlugin from "../../components/CustomPlugins/FloatingTextFormatPlugin";
import {$generateHtmlFromNodes} from '@lexical/html';
import lexicalEditorTheme from "../../theme/lexicalEditorTheme";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { ListNode, ListItemNode } from "@lexical/list";
import { ImageNode } from "../../components/CustomNodes/ImageNode";
import { PostType, PostPreview, PostBody, UserProfileType, PostUser } from "types/types";
import { use } from "chai";


//import ExampleTheme from '/ExampleTheme';
//import ToolbarPlugin from '@lexical/react/ToolbarPlugin';
//import TreeViewPlugin from '@lexical/react/TreeViewPlugin';

const Page = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter();

    console.log(user);
    if(!user)
    {
      router.push("/");
    }
    var isLoggedIn = false;

    if(user) isLoggedIn = true;

    
    const [value, setValue] = useState<string>("");
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
    const [title, setTitle] = useState<string>("");
    const [username, setUsername] = useState<string>(user.displayName);
    const [preview, setPreview] = useState<PostPreview>({
      postTitle: "",
      postPreview: "",
      previewPhotoURL: "",
      postId: "",
    });
    var previewV : PostPreview = {
      postTitle: "",
      postPreview: "",
      previewPhotoURL: "",
      postId: "",
    };
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<File>();
    const [imagePicked, setImagePicked] = useState<boolean>(false);
    const [canSubmit, setCanSubmit] = useState<boolean>(false);
    const [profile, setProfile] = useState<UserProfileType>({
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
    });

    var profileV : UserProfileType = {
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
    const fileUploadRef = useRef(null);
    
    useEffect(() => {
      async function getData(username: string) {
        const userProfileRef = doc(firestore, `Users/${username}`);
        console.log(username);
        const userProfileDoc = await getDoc(userProfileRef);
        if (userProfileDoc.exists()) 
        {
          const profileObj = { ...userProfileDoc.data() };
          profileV = profileObj as UserProfileType;
          setProfile(profileObj);
          username = (profileObj.username);
          console.log(profile);
          console.log(profileObj.posts);
        } else 
        {
          console.log("User Not Found");
        }
      }
      getData(username);
    }, []);

    const handleFileChange = (eImage: React.ChangeEvent<HTMLInputElement>) => {
      if (eImage.target.files) {
          eImage.preventDefault();
        //setImage(eImage.target.files[0]);
          fileUploadRef.current.click();
      }
    };
  
    const handleUpload = async () => {
      // We will fill this out later
      handleFileChange;
      const uploadedFile = fileUploadRef.current.files[0];
      const cachedURL = URL.createObjectURL(uploadedFile);
      setImage(cachedURL);
    };

    const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
      let file = event.target.files?.[0];
      if(file !== undefined)
      { 
        setPreviewImage(file);
        setImagePicked(true);
        handleUpload();
        console.log(image);
        console.log(profile);
      }
      else{
        alert("Choose a preview image")
      }
    };

    const uploadPost = async (body: string) => {

      const time = new Date().getTime();
      const uName = user.displayName;
      const postCount = profile.postCount + 1;
      const postID =  uName + time + postCount;
      
      postBody = {
        body: body,
        comments: [],
        commentsCount: 0,
        likes: [],
        likesCount: 0,
        timestamp: time,
        postId: postID,
      };

      postUser = {
        userId: user.uid,
        username: uName,
        fullName: profile.fullName,
        userPhotoURL: user.photoURL,
        location: profile.location,
        occupation: profile.occupation,
      };

      setPreview({...preview, postId: postID});

      console.log(profile);

      if (previewImage)
        { 
          const storageRef = ref(storage, `Posts/${preview.postId}`);
          const uploadTask = uploadBytesResumable(storageRef, previewImage);
          uploadTask.on(
            "state_changed",
            (snapshot: { bytesTransferred: number; totalBytes: number; }) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
            },
            (error: any) => {
              alert(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
                console.log(downloadURL);
                setPreview({...preview, previewPhotoURL: downloadURL})

                //const userRef = doc(firestore, `Users/${username}`);

                const userRef = doc(firestore, `Users/${uName}`);
                const postRef = doc(firestore, `Posts/${postID}`);

                setDoc(userRef, { postCount: postCount}, { merge: true });
                setDoc(postRef, { postId: postID, username: username,  preview:{...preview, postId: postID, previewPhotoURL: downloadURL}, postBody, postUser }, { merge: true });
                
                console.log(preview);
                console.log(body);

                console.log(uName);
                console.log({ [ postID ]: { preview, postBody, postUser } });
                router.push(`/profile/${uName}`);
              });
            }
          );    
          
        }
        else {
          alert("Choose a preview photo, nude previews are not preferred.");
        }
    }

    const loadContent = () => 
    {
      // 'empty' editor
      const value = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
      return value;
    }
  
    const initialEditorState = loadContent();
    const editorStateRef = useRef();
    var postJSON = '';
    
    return (
        <>
          <Navbar isLoggedIn={isLoggedIn} write={true}/>
              <div className="flex flex-col container items-center justify-center w-full bg-zinc-950">
                <div className="container flex flex-col w-full py-12 pl-20 items-start justify-start bg-zinc-950">
                  <div className="flex flex-row w-full h-96 px-48">
                    <div className="flex flex-col">     
                      <button className="btn btn-square">
                        <div className="avatar placeholder h-60">
                          <div className="bg-neutral text-neutral-content w-64 rounded">
                            {imagePicked ? <img src={image}/> : <span className="text-3xl px-3">Post Preview Image</span>}
                          </div>
                        </div> 
                        <input type={"file"} accept="image/*" className="pr-24" onChange={uploadFile} ref={fileUploadRef}/>
                      </button>
                    </div>
                    <div className="flex flex-col pl-28 w-full pt-8 gap-3">
                      <input type="text" onChange={(e: any) => {setPreview({...preview, postTitle: e.target.value})}} placeholder="Post Title" className="input input-bordered w-full text-3xl bg-zinc-950 py-3"/>
                      <textarea placeholder="Post Preview" onChange={(e: any) => {setPreview({...preview, postPreview: e.target.value})}} className="textarea textarea-bordered w-full h-36 text-xl bg-zinc-950 resize-none"/>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <LexicalComposer initialConfig={{
                    editorState: initialEditorState,
                    namespace: "MyEditor",
                    theme: lexicalEditorTheme,
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
                  }}>
                    <LexicalEditorTopBar/>
                    <Divider />
                    <Box className="bg-zinc-950" sx={{position: "relative"}}>
                      <RichTextPlugin //#312D4B
                        contentEditable={<MuiContentEditable className="h-auto"/>}
                        placeholder={<Box className="absolute top-0" sx={placeHolderSx}>Write your story...</Box>}
                        ErrorBoundary={LexicalErrorBoundary}
                      />
                      <OnChangePlugin onChange={editorState => editorStateRef.current = editorState} />
                      <ListPlugin />
                      <LinkPlugin />
                      <ImagesPlugin captionsEnabled={false} />
                      <FloatingTextFormatToolbarPlugin />
                    </Box>
                  </LexicalComposer>
                </div>

                <div className="py-8">
                  <button className="btn btn-circle btn-outline btn-warning w-36 " onClick={() => uploadPost(JSON.stringify(editorStateRef.current))}>Publish</button>
                </div>
                <div className="container h-24"></div>
                </div>
              </>
    );
};

export default Page;