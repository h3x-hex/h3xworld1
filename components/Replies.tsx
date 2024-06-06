"use client"

import { getAuth } from "firebase/auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { setDoc, doc, getDoc, query, where, getDocs, collection } from "firebase/firestore";
import { firestore, storage } from "config/firebase.config";
import { time } from "console";
import { CommentType, PostType, ReplyType } from "types/types";
import { useRouter } from "node_modules/next/navigation";
import CommentCard from "./CommentCard";
import { getDatabase } from "firebase/database";
import ReplyCard from "./ReplyCard";

interface IProps{
    replies: ReplyType[]
    comment: CommentType
}

export default function Replies ({replies, comment}: IProps) {

    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter();


    return (

        <>

        {
            replies.length > 0 ? 

            <div className="">
                {replies.map((reply) => (
                <ReplyCard reply={reply} comment={comment}/>
                ))}
            </div>

            :

            <>

            </>
        }
        
        </>
    )
}