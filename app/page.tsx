"use client"

import LoginUser from "components/LoginUser";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { auth, firestore } from "config/firebase.config";
import { Navbar } from "components/Navbar";
import { useEffect, useState } from "react";
import { PostType } from "types/types";
import { collection, getDocs, query } from "firebase/firestore";
import HomePosts from "components/HomePosts";

export default function HomePage() {

  const user = auth.currentUser
  const router = useRouter();

  if(user) router.push(`/home`);

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

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#101010] to-[#1d1d1d] text-white">
        {
          user ?

          <div className=" bg-zinc-950">
            <Navbar/>
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

          :
        
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Welcome to <span className="text-[hsl(0,0%,100%)]">h</span><span className="text-[#fdb702]">3</span>x<span className="text-[hsl(0,0%,38%)]">|</span>World
            </h1>
            <p className="text-l">Web3 XR Minimalistic Social Media for truly connecting people. Get your link up and Link up!</p>
            <LoginUser/>
          </div>
      }
    </main>
  );

}
