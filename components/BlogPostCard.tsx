"use client"

import { BlogPostType, CommentType, PostType } from "types/types"
import { useEffect, useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import { useRouter } from "node_modules/next/navigation";
import { firestore, storage } from "config/firebase.config";
import { setDoc, doc, getDoc, updateDoc, collection, query, where, getDocs, deleteDoc, orderBy} from "firebase/firestore";
import Comments from "./Comments";
import { StringSupportOption } from "prettier";
import { useMediaQuery } from 'react-responsive';
import { Markup } from 'interweave';


interface IProps{
  post: BlogPostType;
  fullPost?: boolean;
}

export default function BlogPostCard ({post, fullPost}: IProps) {

    console.log(post.postId);

    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter();

    
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [commentBody, setCommentBody] = useState<string>("");
    const [likesCount, setLikesCount] = useState<number>(post.likesCount);
    const [commentsCount, setCommentCount] = useState<number>(post.commentsCount);
    const [isComments , setIsComments] = useState<boolean>(false);
    const [comments, setComments] = useState<CommentType[]>([]);
    var commentsArr: CommentType[] = [];

    const isMobile = useMediaQuery({ maxWidth: 1224 });

    console.log(isMobile);

    
    const updateComments = ( newComments: CommentType[], updatedPost: BlogPostType) => {

      setComments(newComments);
      post = updatedPost;
      console.log(comments);
      console.log(post);
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
          const newComment: CommentType = {
              postId: post.postId, 
              username: user!.displayName!, 
              userId: user.uid, 
              userPhotoURL: user!.photoURL!,
              body: commentBody,
              timestamp: timestamp,
              likesCount: 0,
              commentId: commentId,
              replies: 0,
          }
          setDoc(commentRef, newComment);
          setCommentBody("");

          const postRef = doc(firestore, 'BlogPosts', `${post.postId}`);
          post.commentsCount += 1;
          setDoc(postRef, {commentsCount: post.commentsCount}, { merge: true })
          comments.unshift(newComment)
          //if (document && user) {(document.getElementById('comment_modal') as HTMLFormElement).close()}
          updateComments(comments, post);
      }

  }

    useEffect(() => {
      async function getData() {
        
        if (user)
        {
          const userProfileRef = doc(firestore, `Users/${user.displayName}`);
          //const postRef = doc(firestore, `Users/${username}/Posts`);
          const userProfileDoc = await getDoc(userProfileRef);
          //const postsDoc = await getDoc(postRef);
          if (userProfileDoc.exists()) 
          {
            const profileObj = { ...userProfileDoc.data() };
            if(user)
            {
              //setIsLiked((post.postBody.likes.includes(user.uid)));
              //console.log(isLiked, user.uid, post.postBody.likes);
              const likesDoc = await getDoc(doc(firestore, 'Likes', `${user.displayName}${post.postId}`));
              if(likesDoc.exists())
              {
                setIsLiked(true);
              }
            }
          } 
          else 
          {
            console.log("User Not Found");
          }
        }
        console.log(post.postId);
  
        const commentsRef = collection(firestore, 'Comments');
        const q = query(commentsRef, where("postId", "==", post.postId), orderBy("timestamp", 'desc'));
        console.log(post.postId);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          //const comm = doc.data() as CommentType;
          console.log(post.commentsCount);
          if (commentsArr.length < post.commentsCount) 
          {
            commentsArr.push(doc.data() as CommentType);
          }
          })
          setComments(commentsArr);
          if(commentsArr.length > 0)
          {
            setIsComments(true);
          }
        }

    getData();
      //getComments(post.postId);
    }, []);

    

    const updateLike = async () => {

        if(!user)
        {
          alert("Must Login first...");
          return(
            <></>
          )
        }

        const postRef = doc(firestore, `BlogPosts/${post.postId}`);
        const likeId = user.displayName + post.postId
        const likesRef = doc(firestore, "Likes", `${likeId}`);

        if(isLiked && user)
        {
          setIsLiked(false);
          setLikesCount(likesCount - 1);
          post.likesCount = likesCount - 1;
          //post.likes.splice(post.likes.indexOf(user.uid), 1);
          deleteDoc(likesRef)
          console.log(post);
          setDoc(postRef, { ...post }, {merge: true});
        }
        if(!isLiked && user) {
  
          setIsLiked(true);
          setLikesCount(likesCount + 1);
          post.likesCount = likesCount + 1;
          //(post.likes).push(user.uid);
          setDoc(likesRef, {likeId: likeId, username: user.displayName, timestamp: new Date().getTime(), userPhotoURL: user.photoURL, postId: post.postId})
          console.log(post);
          setDoc(postRef, { ...post }, {merge: true});

        }
    }


    return (
    <>
    {
      isMobile ?

      fullPost? 

      <>
        <div>
          <img className="cursor-pointer" src={post.previewPhotoURL} width="480" height="480" onClick={() => router.push(`/blog/${post.postId}`)}/>
        </div>
        <div className="w-full items-end justify-end pt-3">
          <div className="flex flex-row cursor-pointer pl-6" onClick={() => router.push(`/profile/${post.username}`)}>
            <div className="avatar">
              <div className="flex flex-row w-20 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                <img src={post.userPhotoURL} width={64} height={64}/>
              </div>
            </div> 
            <div className="flex flex-col pl-3 text-gray-300">
              <h1 className="mt-3 text-xl">{post.fullName}</h1>
              <h1 className="text-l">@{post.username}</h1>
            </div>
          </div>
          <div className="divider divider-warning w-full"></div>
            <div>
              <div className="flex flex-col py-1 px-6 text-gray-300">
                <div className="flex flex-col w-full">
                  <h1 className="text-xl">{post.postTitle}</h1>
                  <h3 className="text-l text-wrap break-words pt-3">{post.postPreview}</h3>
                </div>
                                  
                <div className="flex flex-row pt-8 ">
                {
                  isLiked ?
                              
                  <>
                    <button className="btn btn-circle btn-warning" onClick={updateLike}><span className="material-symbols-outlined">favorite</span></button><p className="pl-3 pt-3">{post.likesCount}</p>
                  </>
                                
                  :

                  <>
                    <button className="btn btn-outline btn-circle btn-warning" onClick={updateLike}><span className="material-symbols-outlined">favorite</span></button><p className="pl-3 pt-3">{post.likesCount}</p>
                  </>   

                }

                <div className="pl-24"></div>
                  <button className="btn btn-ghost btn-circle btn-warning" onClick={addComment}><span className="material-symbols-outlined">comment</span></button><p className="pl-3 pt-3">{post.commentsCount}</p>
                </div>
                <div className="container pt-8 w-full">
                  <div className="flex flex-row gap-24">
                      <p className="text-xl pt-3">Comments</p>
                      <button className="btn btn-circle btn-warning btn-outline w-36 " onClick={addComment}>Add Comment</button>
                  </div>
                  <div className="divider w-full"></div>
                </div>
                {
                  user ?

                  <Comments comments={comments} post={post} updateComments={updateComments}/>
                  :
                  <Comments comments={comments} post={post}  updateComments={updateComments}/>

                }
              </div>
            </div>
        </div>
      </>

      :

      <>
        <div className="flex flex-col cursor-pointer w-screen items-center justify-center" onClick={() => router.push(`/blog/${post.postId}`)}>
          <div className="flex flex-col text-gray-300 pl-16">
            <img className="cursor-pointer" src={post.previewPhotoURL} width="256" height="256" />
              <div className="flex flex-row">
                <div className="avatar pt-6">
                  <div className="flex flex-row w-16 h-16 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                    <img src={post.userPhotoURL} width={32} height={32}/>
                  </div>
                  <div className="flex flex-col pl-3 pb-8 text-gray-300">
                    <h1 className="mt-3 text-xl font-bold">{post.fullName}</h1>
                    <h1 className="text-md">@{post.username}</h1>
                  </div>
                </div> 
              </div>
              <div className="pr-3">
                <p className="text-3xl font-bold">{post.postTitle}</p>
                <p className="text-l">{post.postPreview}</p>
              </div>
          </div>
          
        </div>
      </>
      

      :

      
        fullPost ?
        
        <div className="container flex flex-col pt-6 px-8 items-center justify-center pb-3 text-gray-300 min-w-full">
          <div className="card w-full  bg-zinc-900 shadow-xl px-6">
            <div className="card-body w-full  flex-col">
              <div className="flex flex-col gap-6 bg-zinc-900 border-1">
                
              <div className="w-full items-end justify-end pt-1 pb-3">
                <div className="flex flex-row cursor-pointer" onClick={() => router.push(`/profile/${post.username}`)}>
                  <div className="avatar">
                    <div className="flex flex-row w-20 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                      <img src={post.userPhotoURL} width={64} height={64}/>
                    </div>
                  </div> 
                  <div className="flex flex-col px-6">
                    <h1 className="mt-3 text-xl">{post.fullName}</h1>
                    <h1 className="text-l">@{post.username}</h1>
                  </div>
                  
                </div>
                <div className="w-full items-start justify-start pt-8">
                  <img className="" src={post.previewPhotoURL} width="auto" height="auto"/>
                </div>
                <div className="divider divider-warning w-full"></div>
                  <div>
                    <div className="flex flex-col py-1  ">
                      <div className="flex flex-col w-12/12 items-center justify-center">
                        <h1 className="text-3xl">{post.postTitle}</h1>
                        <h3 className="text-2xl text-wrap break-words pt-3">{post.postPreview}</h3>
                      </div>
                      <div className="divider divider-warning w-full"></div>
                      <div className="">
                        <Markup content={post.value}/>
                      </div>
                                        
                      <div className="flex flex-row pt-8">
                      {
                        isLiked ?
                                    
                        <>
                          <button className="btn btn-circle btn-warning" onClick={updateLike}><span className="material-symbols-outlined">favorite</span></button><p className="pl-3 pt-3">{post.likesCount}</p>
                        </>
                                      
                        :

                        <>
                          <button className="btn btn-outline btn-circle btn-warning" onClick={updateLike}><span className="material-symbols-outlined">favorite</span></button><p className="pl-3 pt-3">{post.likesCount}</p>
                        </>   

                      }

                      <div className="pl-24"></div>
                        <button className="btn btn-ghost btn-circle btn-warning" onClick={addComment}><span className="material-symbols-outlined">comment</span></button><p className="pl-3 pt-3">{post.commentsCount}</p>
                      </div>
                      <div className="container pt-8 w-full">
                        <div className="flex flex-row">
                            <p className="text-xl pt-3">Comments</p>
                            <button className="btn btn-circle btn-warning btn-outline w-36" onClick={addComment}>Add Comment</button>
                        </div>
                        <div className="divider w-full"></div>
                      </div>
                      {
                        user ?

                        <Comments comments={comments} post={post} updateComments={updateComments}/>
                        :
                        <Comments comments={comments} post={post}  updateComments={updateComments}/>

                      }
                    </div>
                  </div>
                </div>
              </div>  
            </div>
          </div>       
        </div>
        
         
        :

        <div className="flex flex-row cursor-pointer w-screen pl-24" onClick={() => router.push(`/blog/${post.postId}`)}>
          <div className="flex flex-col text-gray-300 pl-3 w-9/12">
              <div className="flex flex-row">
                <div className="avatar pt-3">
                  <div className="flex flex-row w-24 h-24 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                    <img src={post.userPhotoURL} width={64} height={64}/>
                  </div>
                  <div className="flex flex-col pl-3 pt-2 pb-3 text-gray-300">
                    <h1 className="mt-3 text-xl font-bold">{post.fullName}</h1>
                    <h1 className="text-md">@{post.username}</h1>
                  </div>
                </div> 
              </div>
              <div className="pr-3">
                <p className="text-3xl font-bold">{post.postTitle}</p>
                <p className="text-l">{post.postPreview}</p>
              </div>
          </div>
          <div className="">
            <img className="cursor-pointer" src={post.previewPhotoURL} width="256" height="256" />
          </div>
        </div>
      
      }
      <dialog id="comment_modal" className="modal">
            <div className="modal-box h-auto bg-zinc-900">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <button className="btn btn-circle btn-warning btn-outline w-36 absolute bottom-3 right-3" onClick={uploadComment}>Post Comment</button>
                </form>
                <h3 className="font-bold text-lg text-gray-300">Add Comment</h3>
                <div className="flex flex-row pt-3 pb-12">
                    <div className="avatar flex flex-row items-start justify-start w-2/12 pr-4">
                        <div className="flex flex-row w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                            <img src={user!.photoURL!} width={24} height={24}/>
                        </div>
                    </div>
                    <textarea className="textarea textarea-bordered w-full resize-none h-64 pb-16 bg-zinc-800 text-gray-300" placeholder="Write your comment..." value={commentBody} onChange={(e: any) => {setCommentBody(e.target.value)}}></textarea>
                </div>
            </div>
        </dialog>
       
    </>
  )
}