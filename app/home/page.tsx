"use client"
import { useEffect, useState } from "react";
import { PostType, UserProfileType } from "types/types";
import { doc, getDoc, onSnapshot, query, collection, getDocs, documentId, where, FieldPath } from "firebase/firestore";
import { firestore } from "config/firebase.config";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import PostCard from "components/PostCard";
import { Navbar } from "components/Navbar";
import HomePosts from "components/HomePosts";
import HomePostCard from "components/HomePostCard";

export default function Page () {

    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter();
    var isLoggedIn = false;

    console.log();

    if(user) isLoggedIn = true;
    

    const [profile, setProfile] = useState<UserProfileType>();
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState<PostType[]>([]);
    var postsSs : PostType[] = []

    useEffect(() => {
        async function getData() {
        
        const postRef = collection(firestore, 'Posts');
        const q = query(postRef);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log(doc.data());
            if(doc.data()) postsSs.push(doc.data() as PostType);
        });
        console.log(postsSs);
        setPosts(postsSs);
 
        }
        getData();
    }, []);
    

    return (

        <div className=" bg-zinc-950">
            <Navbar isLoggedIn={isLoggedIn}/>
            <div className="">
                
            { 
                posts ?

                <HomePosts posts={ posts }/>

                :

                <div className="container pl-32 h-96 bg-zinc-950">
                    <div className="pb-32">
                        <p className="pl-32">No Posts yet...</p>
                    </div>
                </div>
                }
            </div>
        </div>
    )


}