"use client"

import { getAuth } from "firebase/auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { setDoc, doc, getDoc, query, where, getDocs, collection } from "firebase/firestore";
import { firestore, storage } from "config/firebase.config";
import { time } from "console";
import { CommentType, PostType } from "types/types";
import { useRouter } from "node_modules/next/navigation";
import CommentCard from "./CommentCard";
import { getDatabase } from "firebase/database";
import { useMediaQuery } from 'react-responsive';


interface IProps{
    comments: CommentType[]
    post: PostType
    updateComments: any
}

export default function Comments ({ comments, post, updateComments}: IProps) {

    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter();

    
    const [commentBody, setCommentBody] = useState<string>("");
    const isMobile = useMediaQuery({ maxWidth: 1224 });


    console.log(comments);

    const updateReplies = () => {



    }

    const addComment = () => {
        if(!user) 
        {
            alert("Must Login first...")
            return (<></>);
        }
        if (document && user) {(document.getElementById('comment_modal') as HTMLFormElement).showModal();}
    }

    const uploadComment = async () => {

        if(commentBody === "") alert("Comment is empty...")

        if(user) 
        {   
            console.log(commentBody);
            const timestamp = new Date().getTime();
            const commentId = user!.displayName! + timestamp
            const commentRef = doc(firestore, 'Comments', `${commentId}`);
            const newComment: CommentType = {
                postId: post.postId, 
                username: user!.displayName!, 
                userId: user.uid, 
                userPhotoURL: user!.photoURL!,
                body: commentBody,
                timestamp: timestamp,
                likesCount: 0,
                commentId: commentId,
                replies: 0,
            }
            setDoc(commentRef, newComment);
            setCommentBody("");

            const postRef = doc(firestore, 'Posts', `${post.postId}`);
            post.commentsCount += 1;
            setDoc(postRef, {commentsCount: post.commentsCount}, { merge: true })
            comments.unshift(newComment)
            //if (document && user) {(document.getElementById('comment_modal') as HTMLFormElement).close()}
            updateComments(comments, post);
        }

    }


    return (

        <>
        <div className="w-full">
        {
            comments.length > 0 ? 

            comments.map((comment) => (
                <CommentCard comment={comment} comments={comments} post={post} updateComments={updateComments}/>
            ))

            :

            <>
            </>
        }
        </div>
        
        
        </>
    )
}