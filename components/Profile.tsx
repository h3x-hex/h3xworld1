"use client";

import { useEffect, useState } from "react";
import { BlogPostType, H3XclusivePostType, PostType, StoreContentType, UserProfileType, WalletType } from "types/types";
import BioCard from "./BioCard";
import LinkCard from "./LinkCard";
import LinkCardList from "./LinkCardList";
import { Navbar } from "./Navbar";
import Posts from "./Posts";
import ProfileCard from "./ProfileCard";
import { useRouter } from "next/navigation";
import { doc, getDoc, onSnapshot, query, collection, getDocs, documentId, where, FieldPath, setDoc } from "firebase/firestore";
import { firestore } from "config/firebase.config";
import { getAuth } from "firebase/auth";
import { ethers } from "ethers";
import * as bip39 from "bip39";
import { useMediaQuery } from "react-responsive";

interface IProps {
  username: string;
}

export default function Profile({ username }: IProps) {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();
  var isLoggedIn = false;

  console.log(username);

  if(user)
  {
    isLoggedIn = true;
    
  }

  const [profile, setProfile] = useState<UserProfileType>();
  const [isLoading, setIsLoading] = useState(false);

  const [posts, setPosts] = useState<PostType[]>([]);
  const [blogPosts, setBlogPosts] = useState<PostType[]>([]);
  const [storeContent, setStoreContent] = useState<StoreContentType[]>([]);
  const [h3XclusivePosts, setH3XclusivePosts] = useState<H3XclusivePostType[]>([]);
  const [wallet, setWallet] = useState<WalletType>();

  var postsSs : PostType[] = []
  var blogPostsSs : BlogPostType[] = []
  var storeContentSs : StoreContentType[] = []
  var h3XclusivePostsSs : H3XclusivePostType[] = []

  const [tab, setTab] = useState<"portfolio" | "blog" | "store" | "h3Xclusive">("portfolio");

  const isMobile = useMediaQuery({ maxWidth: 1224 });

  const switchTab = (tab: string) => {

    console.log(tab);
    

    if(tab === "1"){
        if (document) {

            (document.getElementById('tab1') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
            (document.getElementById('tab2') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            (document.getElementById('tab3') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            (document.getElementById('tab4') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            setTab("portfolio");
        }
    }
    if(tab === "2"){
        if (document) {

            (document.getElementById('tab2') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
            (document.getElementById('tab1') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            (document.getElementById('tab3') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            (document.getElementById('tab4') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            setTab("blog");
        }
    }
    if(tab === "3"){
        if (document) {

            (document.getElementById('tab3') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
            (document.getElementById('tab2') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            (document.getElementById('tab1') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            (document.getElementById('tab4') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            setTab("store");
        }
    }
    if(tab === "4"){
      if (document) {

          (document.getElementById('tab4') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
          (document.getElementById('tab2') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
          (document.getElementById('tab1') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
          (document.getElementById('tab3') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
          setTab("h3Xclusive");
      }
  }

}


  useEffect(() => {
    async function getData(username: string) {
      
      const userProfileRef = doc(firestore, `Users/${username}`);
      const walletRef = doc(firestore, `Wallets/${username}`);
      //const postRef = doc(firestore, `Users/${username}/Posts`);
      console.log(username);
      const userProfileDoc = await getDoc(userProfileRef);
      const walletDoc = await getDoc(walletRef);
      //const postsDoc = await getDoc(postRef);
      if (userProfileDoc.exists() ) 
      {
        if(walletDoc.exists())
        {
          const profileObj = { ...userProfileDoc.data() };
          setProfile(profileObj as UserProfileType);
          console.log(profileObj);
          const postRef = collection(firestore, 'Posts');
          const q = query(postRef, where('username', '==', username));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log(doc.data());
            if(postsSs.length < profileObj.postCount)
            {
              postsSs.push(doc.data() as PostType);
            }
          });
          console.log(postsSs);
          setPosts(postsSs);
          setWallet(walletDoc.data() as WalletType);
          return profile;
        }
        else{
          console.log("Wallet not found");
        }
      } 
      else 
      {
        console.log("User Not Found");
      }

    }

    async function getBlogData(username: string) {
      
        const blogPostRef = collection(firestore, 'BlogPosts');
        const q = query(blogPostRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          console.log(doc.data());
          if(blogPostsSs.length < profile!.blogPostCount)
          {
            blogPostsSs.push(doc.data() as BlogPostType);
          }
        });
        console.log(blogPostsSs);
        setBlogPosts(blogPostsSs);

    }

    async function getStoreData(username: string) {
      
      const postRef = collection(firestore, 'StoreContent');
      const q = query(postRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        console.log(doc.data());
        storeContentSs.push(doc.data() as StoreContentType);

      });
      console.log(storeContentSs);
      setStoreContent(storeContentSs);

    }
    async function getH3XclusiveData(username: string) {
      
      const postRef = collection(firestore, 'H3XclusivePosts');
      const q = query(postRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        console.log(doc.data());
        if(h3XclusivePostsSs.length < profile!.h3XclusivePostCount)
        {
          h3XclusivePostsSs.push(doc.data() as H3XclusivePostType);
        }
      });
      console.log(h3XclusivePostsSs);
      setPosts(h3XclusivePostsSs);

    }

    if(tab === "portfolio")getData(username);
    if(tab === "blog") getBlogData(username);
    if(tab === "store") getStoreData(username);
    if(tab === "h3Xclusive") getH3XclusiveData(username);
  }, []);

  console.log(posts);
  return (
    <>
    <Navbar/>
      <div className="bg-zinc-950 flex flex-col items-center justify-center min-h-screen">
        
        { profile && wallet ? 
          <ProfileCard profile={ profile } wallet={wallet}/>
          :
         <></>
        }
        {
          isMobile ?

          <div role="tablist" className="tabs tabs-bordered tabs-lg pb-6 text-gray-300 gap-8">
            <a id="tab1" role="tab" className="tab tab-active text-gray-300" onClick={() => switchTab("1")}>Portfolio</a>
            <a id="tab2" role="tab" className="tab text-gray-300" onClick={() => switchTab("2")}>Blog</a>
            <a id="tab3" role="tab" className="tab text-gray-300" onClick={() => switchTab("3")}>Store</a>
            <a id="tab4" role="tab" className="tab text-gray-300" onClick={() => switchTab("4")}>h3Xclusive</a>
          </div>

          :

          <div role="tablist" className="tabs tabs-bordered tabs-lg pb-6 text-gray-300 gap-24">
            <a id="tab1" role="tab" className="tab tab-active text-gray-300" onClick={() => switchTab("1")}>Portfolio</a>
            <a id="tab2" role="tab" className="tab text-gray-300" onClick={() => switchTab("2")}>Blog</a>
            <a id="tab3" role="tab" className="tab text-gray-300" onClick={() => switchTab("3")}>Store</a>
            <a id="tab4" role="tab" className="tab text-gray-300" onClick={() => switchTab("4")}>h3Xclusive</a>
          </div>
        }
        
        {
          tab === "portfolio" ?

            posts ?
  
            <Posts posts={ posts }/>
  
            :
  
            <div className="container pl-32 min-h-full bg-zinc-950">
                <div className="pb-32">
                  <p className="pl-32">No Posts yet...</p>
                  <button className="btn btn-warning" onClick={() => router.push(`/write/portfolio`)}>Create Post</button>
                </div>
            </div>
          

          :

          tab === "blog" ?

          <>Blog</>

          :

          tab === "store" ?

          <>
            <button className="btn btn-warning pt-32">Create new store</button>
          </>

          : 

          tab === "h3Xclusive" ?

          <>
            <h1 className="text-xl text-gray-300 pb-8 pt-32">x3nDant3's Realm</h1>
            <button className="btn btn-warning">Enter the realm for $6.9/month</button>
            <div className="pb-96"></div>
          </>

          :

          <></>
        }
        
      </div>
    </>
  );
}
