"use client"

import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { BlogPostType, PostType, UserProfileType } from "types/types";
import { useEffect, useRef, useState } from "react";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "config/firebase.config";
import { Navbar } from "components/Navbar";
import PostCard from "components/PostCard";
import BlogPostCard from "components/BlogPostCard";

const Page = ({ params }: { params: { postId: string } }) => {

    const user = auth.currentUser;
    const postId = params.postId;

    var isLoggedIn = false;

    const [isData, setIsData] = useState<boolean>(false);

    const [post, setPost] = useState<BlogPostType>({
      postId: "",
      userId: "",
      username: "",
      fullName: "",
      userPhotoURL: "",
      postTitle: "",
      postPreview: "",
      previewPhotoURL: "",
      value: "",
      commentsCount: 0,
      likesCount: 0,
      timestamp: 0,
    });

    var profile : UserProfileType = {
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
        blogPostCount: 0,
        h3XclusivePostCount: 0,
        friendsCount: 0,
        followersCount: 0,
        followingCount: 0,
      };
    
      if(user){
        isLoggedIn = true;
      }
      

    useEffect(() => {
      async function getData(postId: string) {
        
        const postRef = doc(firestore, `BlogPosts/${postId}`);
        const postDoc = await getDoc(postRef);
        if (postDoc.exists()) 
        { 
          console.log(postDoc.data());
          setPost(postDoc.data() as BlogPostType);
          //console.log(postBody);
          console.log(post)
          setIsData(true);
        } else 
        {
          console.log(params.postId);
          console.log("Blog Post Not Found");
        }
      }
        getData(postId);
    }, []);

    const returnPost = () => {

      
    }


    return (

      <>
      {
        isData ?

        <> 
          <div className="bg-zinc-950 h-full w-full">
            <Navbar />
              <div className="h-full w-full items-center justify-center">
                <BlogPostCard post={post} fullPost={true}/>     
              </div>
          </div>
        </>
        :
        <></>
      }
      </>
    )
}

export default Page;