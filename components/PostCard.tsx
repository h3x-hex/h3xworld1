import { CommentType, PostType } from "types/types"
import { useEffect, useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import { useRouter } from "node_modules/next/navigation";
import { firestore, storage } from "config/firebase.config";
import { setDoc, doc, getDoc, updateDoc, collection, query, where, getDocs, deleteDoc} from "firebase/firestore";
import Comments from "./Comments";
import { StringSupportOption } from "prettier";


interface IProps{
  post: PostType;
  fullPost?: boolean;
  username?: string;
}

export default function PostCard ({post, fullPost, username}: IProps) {

    console.log(post.postId);

    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter();

    
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likesCount, setLikesCount] = useState<number>(post.likesCount);
    const [commentsCount, setCommentCount] = useState<number>(post.commentsCount);
    const [isComments , setIsComments] = useState<boolean>(false);
    const [updateComments, setUpdateComments] = useState<boolean>(false);
    const [comments, setComments] = useState<CommentType[]>([]);
    var commentsArr: CommentType[] = [];

    console.log(post);

    
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
        const q = query(commentsRef, where("postId", "==", post.postId));
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

        const postRef = doc(firestore, `Posts/${post.postId}`);
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
        fullPost ?

        <div className="container flex flex-col pt-6 px-8 items-start justify-start pb-3">
          <div className="card w-full h-auto bg-zinc-900 shadow-xl px-6">
            <div className="card-body w-full h-auto flex-col">
              <div className="flex flex-row gap-6 bg-zinc-900 border-1">
                <div className="w-7/12 items-start justify-start">
                  <img className="" src={post.previewPhotoURL} width="auto" height="auto"/>
                </div>
              <div className="w-5/12 items-end justify-end pt-1">
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
                <div className="divider divider-warning w-full"></div>
                  <div>
                    <div className="flex flex-col py-1 items-start justify-start ">
                      <div className="flex flex-col w-12/12">
                        <h1 className="text-xl">{post.postTitle}</h1>
                        <h3 className="text-l text-wrap break-words pt-3">{post.postPreview}</h3>
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
                      {
                        user ?

                        <Comments comments={comments} post={post} userFullname={post.fullName} updateComments={updateComments} setUpdateComments={setUpdateComments}/>
                        :
                        <Comments comments={comments} post={post}  updateComments={updateComments} setUpdateComments={setUpdateComments}/>

                      }
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
              <div className="flex flex-row items-start justify-start gap-6 bg-zinc-900 border-1" onClick={() => router.push(`/profile/${post.username}`)}>
                <div className="avatar flex flex-row">
                  <div className="flex flex-row w-24 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                    <img src={post.userPhotoURL} width={96} height={96}/>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="mt-6 text-xl">{post.fullName}</h1>
                  <h1 className="text-l">@{post.username}</h1>
                </div>
              </div>
              <div className="flex flex-col pt-3">
                <div className="flex flex-col w-12/12" onClick={() => router.push(`/posts/${post.postId}`)}>
                  <h1 className="text-xl">{post.postTitle}</h1>
                  <h3 className="text-l text-wrap break-words pt-3">{post.postPreview}</h3>
                  <img className="pt-3" src={post.previewPhotoURL} width="auto" height="auto"/>   
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
                <button className="btn btn-ghost btn-circle btn-warning" onClick={() => router.push(`/posts/${post.postId}`)}><span className="material-symbols-outlined">comment</span></button><p className="pl-3 pt-3">{post.commentsCount}</p>
                </div>
              </div>
            </div>
          </div>       
        </div>
      }
    </>
    )
}