import { PostBody, PostPreview, PostType } from "types/types"
import { useEffect, useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import { useRouter } from "node_modules/next/navigation";
import { firestore, storage } from "config/firebase.config";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

import Comments from "./Comments";


interface IProps{
  post: PostType;
  fullPost?: boolean;
}

export default function PostCard ({post, fullPost}: IProps) {

    console.log(post.preview.postId);

    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter();

    
    const [isLiked, setIsLiked] = useState<boolean>(user ? (post.postBody.likes.includes(user.uid)) : false);
    const [likesCount, setLikesCount] = useState<number>(post.postBody.likesCount);
    const [commentsCount, setCommentCount] = useState<number>(post.postBody.commentsCount);

    console.log(post.postBody.likes);

    
    const openPost = () => {

        //router.push(`/posts/${post.preview.postId}`);

    }

    const addComment = () => {
        if(!user)
        {
          alert("Must Login first.....")
          return(<></>)
        }
    }

    useEffect(() => {
      async function getData(username: string) {
        
        const userProfileRef = doc(firestore, `Users/${username}`);
        //const postRef = doc(firestore, `Users/${username}/Posts`);
        const userProfileDoc = await getDoc(userProfileRef);
        //const postsDoc = await getDoc(postRef);
        if (userProfileDoc.exists()) 
        {
          const profileObj = { ...userProfileDoc.data() };
          if(user)
          {
            setIsLiked((post.postBody.likes.includes(user.uid)));
            console.log(isLiked, user.uid, post.postBody.likes);
          }
        } 
        else 
        {
          console.log("User Not Found");
        }
  
      }
      if(user) getData(user.displayName as string);
    }, []);

    

    const updateLike = async () => {

        const postRef = doc(firestore, `Posts/${post.postBody.postId}`);

        if(!user)
        {
          alert("Must Login first...");
          return(
            <></>
          )
        }

        if(isLiked && user)
        {
          setIsLiked(false);
          setLikesCount(likesCount - 1);
          post.postBody.likesCount = likesCount - 1;
          post.postBody.likes.splice(post.postBody.likes.indexOf(user.uid), 1);
          console.log(post.postBody);
          await setDoc(postRef, { postBody: post.postBody }, {merge: true});
        }
        if(!isLiked && user) {
  
          setIsLiked(true);
          setLikesCount(likesCount+1);
          post.postBody.likesCount = likesCount + 1;
          (post.postBody.likes).push(user.uid);
          console.log(post.postBody);
          await setDoc(postRef, { postBody: post.postBody }, {merge: true});

        }
    }


    return (
    <>
    {
        fullPost ?

        <div className="container flex flex-col pt-6 px-8 items-start justify-start pb-3">
                  <div className="card w-full h-auto bg-zinc-900 shadow-xl px-6">
                      <div className="card-body w-full h-auto flex-col">
                          <div className="flex flex-row gap-6 bg-zinc-900 border-1">
                            <div className="w-7/12 items-start justify-start">
                              <img className="" src={post.preview.previewPhotoURL} width="auto" height="auto"/>
                            </div>
                            <div className="w-5/12 items-end justify-end pt-1">
                              <div className="flex flex-row cursor-pointer" onClick={() => router.push(`/profile/${post.postUser.username}`)}>
                                <div className="avatar">
                                    <div className="flex flex-row w-20 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                      <img src={post.postUser.userPhotoURL} width={64} height={64}/>
                                    </div>
                                </div> 
                                <div className="flex flex-col px-6">
                                      <h1 className="mt-6 text-xl">{post.postUser.fullName}</h1>
                                      <h1 className="text-l">@{post.postUser.username}</h1>
                                </div>
                              </div>
                              <div className="divider divider-warning w-full"></div>
                              <div>
                                <div className="flex flex-col py-1 items-start justify-start ">
                                  <div className="flex flex-col w-12/12">
                                    <h1 className="text-xl">{post.preview.postTitle}</h1>
                                    <h3 className="text-l text-wrap break-words pt-3">{post.preview.postPreview}</h3>
                                  </div>
                                        
                                  <div className="flex flex-row pt-8">
                                    {
                                      isLiked ?
                                    
                                        <>
                                        <button className="btn btn-circle btn-warning" onClick={updateLike}><span className="material-symbols-outlined">favorite</span></button><p className="pl-3 pt-3">{post.postBody.likesCount}</p>
                                        </>
                                      
                                      :

                                        <>
                                        <button className="btn btn-outline btn-circle btn-warning" onClick={updateLike}><span className="material-symbols-outlined">favorite</span></button><p className="pl-3 pt-3">{post.postBody.likesCount}</p>
                                        </>   

                                    }
                                    <div className="pl-24"></div>
                                    <button className="btn btn-ghost btn-circle btn-warning" onClick={addComment}><span className="material-symbols-outlined">comment</span></button><p className="pl-3 pt-3">{post.postBody.commentsCount}</p>
                                  </div>
                                  <Comments />
                                </div>
                              </div>
                            </div>
                          </div>  
                    </div>
            </div>       
        </div>
         
        :

        <div className="container flex flex-col pt-6 px-8 items-center justify-center pb-3">
            <div className="card w-7/12 h-auto bg-zinc-900 shadow-xl px-6 cursor-pointer">
                <div className="card-body w-full h-auto flex-col">
                    <div className="flex flex-row items-start justify-start gap-6 bg-zinc-900 border-1" onClick={() => router.push(`/profile/${post.postUser.username}`)}>
                        <div className="avatar flex flex-row">
                            <div className="flex flex-row w-24 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                <img src={post.postUser.userPhotoURL} width={96} height={96}/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                                <h1 className="mt-6 text-xl">{post.postUser.fullName}</h1>
                                <h1 className="text-l">@{post.postUser.username}</h1>
                        </div>
                    </div>
                    <div className="flex flex-col pt-3">
                        <div className="flex flex-col w-12/12" onClick={() => router.push(`/posts/${post.preview.postId}`)}>
                            <h1 className="text-xl">{post.preview.postTitle}</h1>
                            <h3 className="text-l text-wrap break-words pt-3">{post.preview.postPreview}</h3>
                            <img className="pt-3" src={post.preview.previewPhotoURL} width="auto" height="auto"/>   
                        </div>
                        <div className="flex flex-row pt-8">
                            {
                                isLiked ?
                                    
                                <>
                                    <button className="btn btn-circle btn-warning" onClick={updateLike}><span className="material-symbols-outlined">favorite</span></button><p className="pl-3 pt-3">{post.postBody.likesCount}</p>
                                </>

                                :

                                <>
                                    <button className="btn btn-outline btn-circle btn-warning" onClick={updateLike}><span className="material-symbols-outlined">favorite</span></button><p className="pl-3 pt-3">{post.postBody.likesCount}</p>
                                </>                                    
                            } 

                            <button className="btn btn-ghost btn-circle btn-warning" onClick={() => router.push(`/posts/${post.preview.postId}`)}><span className="material-symbols-outlined">comment</span></button><p className="pl-3 pt-3">{commentsCount}</p>
                        </div>
                    </div>
                </div>
            </div>       
        </div>
    }
    </>
    )
}