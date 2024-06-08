"use client";

import { useEffect, useState } from "react";
import { PostType, UserProfileType, WalletType } from "types/types";
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
  const [wallet, setWallet] = useState<WalletType>();
  var postsSs : PostType[] = []

  


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
    getData(username);
  }, []);

  console.log(posts);
  return (
    <>
    <Navbar isLoggedIn={ isLoggedIn }/>
      <div className="bg-zinc-950 flex flex-col items-center justify-center min-h-full">
        
        { profile && wallet ? 
          <ProfileCard profile={ profile } wallet={wallet}/>
          :
         <></>
        }
        { 
          posts ?

          <Posts posts={ posts }/>

          :

          <div className="container pl-32 min-h-full bg-zinc-950">
              <div className="pb-32">
                <p className="pl-32">No Posts yet...</p>
              </div>
          </div>
        }
      </div>
    </>
  );
}
