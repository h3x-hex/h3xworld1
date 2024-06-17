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
    const [isHome, setIsHome] = useState<boolean>(true);
    const [isPortfolio, setIsPortfolio] = useState<boolean>(false);
    const [isBlog, setIsBlog] = useState<boolean>(false);
    const [isStore, setIsStore] = useState<boolean>(false);

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

    const manageHomeStates = (state: string) => {
        
        if(state === "home")
        {
            setIsHome(true);
            setIsPortfolio(false);
            setIsBlog(false);
            setIsStore(false);
        }

        if(state === "portfolio")
        {
            setIsHome(false);
            setIsPortfolio(true);
            setIsBlog(false);
            setIsStore(false);
        }

        if(state === "blog")
        {
            setIsHome(false);
            setIsPortfolio(false);
            setIsBlog(true);
            setIsStore(false);
        }

        if(state === "store")
        {
            setIsHome(false);
            setIsPortfolio(false);
            setIsBlog(false);
            setIsStore(true);
        }
    }
    

    return (

        <div className=" bg-zinc-950">
            <Navbar isLoggedIn={isLoggedIn}/>
            
            <div className="flex flex-row">

            <div className="pt-3">
                <ul className="menu bg-base-200 rounded-box sticky top-3">
                    <li>
                        <a className="tooltip tooltip-right" data-tip="Home" onClick={() => manageHomeStates("home")}>
                            <span className="material-symbols-outlined">home</span>                        
                        </a>
                    </li>
                    <li>
                        <a className="tooltip tooltip-right" data-tip="Portfolio Posts" onClick={() => manageHomeStates("portfolio")}>
                            <span className="material-symbols-outlined">photo_library</span>                        
                        </a>
                    </li>
                    <li>
                        <a className="tooltip tooltip-right" data-tip="Blog Posts" onClick={() => manageHomeStates("blog")}>
                            <span className="material-symbols-outlined">contextual_token</span>
                        </a>
                    </li>
                    <li>
                        <a className="tooltip tooltip-right" data-tip="Marketplace" onClick={() => manageHomeStates("store")}>
                            <span className="material-symbols-outlined">storefront</span>
                        </a>
                    </li>
                </ul>
            </div>
                
            { 
                isHome ?
                
                    posts ?

                    <HomePosts posts={ posts }/>

                    :

                    <div className="container pl-32 h-96 bg-zinc-950">
                        <div className="pb-32">
                            <p className="pl-32">No Posts yet...</p>
                        </div>
                    </div>

                :

                isPortfolio ?

                    posts ?

                    <HomePosts posts={ posts }/>

                    :

                    <div className="container pl-32 h-96 bg-zinc-950">
                        <div className="pb-32">
                            <p className="pl-32">No Posts yet...</p>
                        </div>
                    </div>

                :

                isBlog ?

                <></>

                :

                isStore ?

                <></>

                :

                <></>
            }
            </div>
        </div>
    )


}