"use client"

import { getAuth } from "firebase/auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { setDoc, doc, getDoc, query, where, getDocs, collection } from "firebase/firestore";
import { firestore, storage } from "config/firebase.config";
import { time } from "console";
import { CommentType, PostType } from "types/types";
import { useRouter } from "node_modules/next/navigation";
import CommentCard from "./CommentCard";

interface IProps{
    comments: CommentType[]
    post: PostType
    userFullname?: string
    updateComments: boolean
    setUpdateComments: Dispatch<SetStateAction<boolean>>
}

export default function Comments ({ comments, post, userFullname, updateComments, setUpdateComments }: IProps) {

    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter();

    const [commentBody, setCommentBody] = useState<string>("");

    console.log(comments);

    const postComment = () => {



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
            setDoc(commentRef, {
                postId: post.postId, 
                username: user.displayName, 
                userId: user.uid, 
                userPhotoURL: user.photoURL,
                body: commentBody,
                timestamp: timestamp,
                likesCount: 0,
                commentId: commentId,
                replies: 0,
            });
            setCommentBody("");

            const postRef = doc(firestore, 'Posts', `${post.postId}`);
            setDoc(postRef, {commentsCount: post.commentsCount + 1}, { merge: true })
            //if (document && user) {(document.getElementById('comment_modal') as HTMLFormElement).close()}

        }
        setUpdateComments(!updateComments);

    }


    return (

        <>
        <div className="container pt-8 w-full overflow-y-scroll">
            <div className="flex flex-row">
                <p className="text-xl pt-3">Comments</p>
                <button className="btn btn-circle btn-warning btn-outline w-36" onClick={addComment}>Add Comment</button>
            </div>
            <div className="divider w-full"></div>
        </div>
        {
            comments.length > 0 ? 

            comments.map((comment) => (
                <CommentCard comment={comment} post={post} updateComments={updateComments} setUpdateComments={setUpdateComments}/>
            ))

            :

            <>
            </>
        }
        <dialog id="comment_modal" className="modal">
            <div className="modal-box h-auto">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <button className="btn btn-circle btn-warning btn-outline w-36 absolute bottom-3 right-3" onClick={uploadComment}>Post Comment</button>
                </form>
                <h3 className="font-bold text-lg">Add Comment</h3>
                <div className="flex flex-row pt-3 pb-12">
                    <div className="avatar flex flex-row items-start justify-start w-2/12">
                        <div className="flex flex-row w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                            <img src={user!.photoURL!} width={24} height={24}/>
                        </div>
                    </div>
                    <textarea className="textarea textarea-bordered w-full resize-none h-64 pb-16" placeholder="Write your comment..." value={commentBody} onChange={(e: any) => {setCommentBody(e.target.value)}}></textarea>
                </div>
            </div>
        </dialog>
        
        </>
    )
}