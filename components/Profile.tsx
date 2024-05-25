"use client";

import { embeddedWallet, ThirdwebProvider, useAddress } from "app/thirdweb";
import { useEffect, useState } from "react";
import { PostType, UserProfileType } from "types/types";
import BioCard from "./BioCard";
import LinkCard from "./LinkCard";
import LinkCardList from "./LinkCardList";
import { Navbar } from "./Navbar";
import Posts from "./Posts";
import ProfileCard from "./ProfileCard";
import { useRouter } from "next/navigation";
import { doc, getDoc, onSnapshot, query, collection, getDocs, documentId, where, FieldPath } from "firebase/firestore";
import { firestore } from "config/firebase.config";
import { getAuth } from "firebase/auth";

interface IProps {
  username: string;
}

export default function Profile({ username }: IProps) {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();
  var isLoggedIn = false;

  console.log(username);

  if(user) isLoggedIn = true;

  const [profile, setProfile] = useState<UserProfileType>();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  var postsSs : PostType[] = []

  useEffect(() => {
    async function getData(username: string) {
      
      const userProfileRef = doc(firestore, `Users/${username}`);
      //const postRef = doc(firestore, `Users/${username}/Posts`);
      console.log(username);
      const userProfileDoc = await getDoc(userProfileRef);
      //const postsDoc = await getDoc(postRef);
      if (userProfileDoc.exists()) 
      {
        const profileObj = { ...userProfileDoc.data() };
        setProfile(profileObj);
        console.log(profileObj);
        const postRef = collection(firestore, 'Posts');
        const q = query(postRef, where('username', '==', username));
        //const q = query(collection(firestore, `Posts/`).where(firestore.FieldPath.documentId(), '==', username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          console.log(doc.data());
          if(postsSs.length < profileObj.postCount)
          {
            postsSs.push(doc.data());
          }
        });
        console.log(postsSs);
        setPosts(postsSs);
        return profile;
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
      <div className="bg-zinc-950">
      <ThirdwebProvider
        clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
        activeChain={"mumbai"}
        supportedWallets={[
          embeddedWallet({
            auth: {
              options: ["email"],
            },
          }),
        ]}
      >
        <Navbar isLoggedIn={ isLoggedIn }/>
        { profile ? 
          <ProfileCard profile={ profile }/>
          :
         <></>
        }
        {console.log(posts)}
        { posts ?

          <Posts posts={ posts }/>

          :

          <div className="container h-32 bg-zinc-950">
              <div className="pb-8"></div>
          </div>

        }
        
      </ThirdwebProvider>
    </div>
    </>
  );
}
