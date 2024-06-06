import { auth } from "config/firebase.config";
import { useRouter } from "node_modules/next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CommentType, PostType, ReplyType } from "types/types"
import { setDoc, doc, getDoc, query, where, getDocs, collection, deleteDoc} from "firebase/firestore";
import { firestore, storage } from "config/firebase.config";
import Replies from "./Replies";
import { useMediaQuery } from 'react-responsive';




interface IProps {
    comment: CommentType
    comments: CommentType[]
    post: PostType
    updateComments: any
}

export default function CommentCard ({comment, comments, post, updateComments}: IProps) {

    const user = auth.currentUser;
    const router = useRouter();

    const [viewReplies, setViewReplies] = useState<boolean>(false);
    const [replyBody, setReplyBody] = useState<string>("");
    const [commentBody, setCommentBody] = useState<string>(comment.body);
    const [isReplies , setIsReplies] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likesCount, setLikesCount] = useState<number>(comment.likesCount);
    const [replies, setReplies] = useState<ReplyType[]>([]);
    var repliesArr: ReplyType[] = [];

    const isMobile = useMediaQuery({ maxWidth: 1224 });

    
    if(user)
    {
        setIsLiked
    }

    const updateReplies = (newReply: ReplyType, updatedComment: CommentType) => {

        setReplies([...replies, newReply]);
        comment = updatedComment;
      }

    const loadReplies = () => {

        setViewReplies(!viewReplies);

    }

    const addReply = () => {
        if(!user) 
        {
            alert("Must Login first...")
            return (<></>);
        }
        if (document && user) {(document.getElementById('reply_modal') as HTMLFormElement).showModal();}
    }


    const deleteComment = () => {

        const commentRef = doc(firestore, 'Comments', comment.commentId);
        comments = comments.filter(comm => comm.commentId !== comment.commentId)
        deleteDoc(commentRef);
        const postRef = doc(firestore, 'Posts', comment.postId);
        post.commentsCount -= 1
        setDoc(postRef, {commentsCount: post.commentsCount}, {merge: true});
        console.log("Deleted Comment");
        
        updateComments(comments, post);
    }

    const editComment = async () => {

        if(commentBody === "") alert("Comment is empty...")

        if(user) 
        {   
            console.log(commentBody);
            comment.body = commentBody;
            const commentRef = doc(firestore, 'Comments', `${comment.commentId}`);
            setDoc(commentRef, comment, {merge: true});
            //if (document && user) {(document.getElementById('comment_modal') as HTMLFormElement).close()}
            const commIndex = comments.findIndex(comm => comm.commentId === comment.commentId);
            [...comments.slice(0, commIndex), Object.assign({}, comments[commIndex], ...comments.slice(commIndex + 1))]

            updateComments(comments, post);
        }

    }

    const updateLike = async () => {

        if(!user)
        {
          alert("Must Login first...");
          return(
            <></>
          )
        }

        const commentRef = doc(firestore, `Comments/${comment.commentId}`);
        const likeId = user.displayName + comment.commentId;
        const likesRef = doc(firestore, "CommentLikes", `${likeId}`);

        if(isLiked && user)
        {
          setIsLiked(false);
          setLikesCount(likesCount - 1);
          comment.likesCount = likesCount - 1;
          //post.likes.splice(post.likes.indexOf(user.uid), 1);
          deleteDoc(likesRef)
          console.log(comment);
          setDoc(commentRef, { ...comment }, { merge: true });
        }
        if(!isLiked && user) {
  
          setIsLiked(true);
          setLikesCount(likesCount + 1);
          comment.likesCount = likesCount + 1;
          //(post.likes).push(user.uid);
          setDoc(likesRef, { likeId: likeId, username: user.displayName, timestamp: new Date().getTime(), userPhotoURL: user.photoURL, commentId: comment.commentId, postId: comment.postId})
          console.log(comment);
          setDoc(commentRef, { ...comment }, { merge: true });

        }
    }

    const uploadReply = async () => {

        console.log(replyBody)

        if(replyBody === "") alert("Reply is empty...")

        if(user) 
        {   
            console.log(replyBody);
            const timestamp = new Date().getTime();
            const replyId = user!.displayName! + timestamp
            const replyRef = doc(firestore, 'Replies', `${replyId}`);
            const newReply: ReplyType = {
                replyId: replyId, 
                username: user!.displayName!, 
                userId: user.uid, 
                userPhotoURL: user!.photoURL!,
                body: replyBody,
                timestamp: timestamp,
                likesCount: 0,
                commentId: comment.commentId,
            };
            setDoc(replyRef, newReply);
            setReplyBody("");

            const commentRef = doc(firestore, 'Comments', `${comment.commentId}`);
            comment.replies += 1
            setDoc(commentRef, {replies: comment.replies}, { merge: true })
            //if (document && user) {(document.getElementById('comment_modal') as HTMLFormElement).close()}
            repliesArr.push(newReply)
            setReplies(repliesArr);
        }

    }

    useEffect(() => {
        async function getData() {
          
            if(user)
            {
                  //setIsLiked((post.postBody.likes.includes(user.uid)));
                  //console.log(isLiked, user.uid, post.postBody.likes);
                const likesDoc = await getDoc(doc(firestore, 'CommentLikes', `${user.displayName}${comment.commentId}`));
                if(likesDoc.exists())
                {
                    setIsLiked(true);
                }
            }

            if(comment.commentId)
            {
                const repliesRef = collection(firestore, 'Replies');
                const q = query(repliesRef, where("commentId", "==", comment.commentId));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                //const comm = doc.data() as CommentType;
                console.log(comment.replies);
                if (repliesArr.length < comment.replies) 
                {
                    repliesArr.push(doc.data() as ReplyType);
                }
                })
                setReplies(repliesArr);
                if(repliesArr.length > 0)
                {
                    setIsReplies(true);
                }
                }
            }
          

        getData();
        
        //getComments(post.postId);
      }, []);



    return (

        <>
            <div className="flex flex-row py-3 w-full">
                <div className="avatar flex flex-row items-start justify-start pl-3 cursor-pointer" onClick={() => router.push(`/profile/${comment.username}`)}>
                    <div className="flex flex-row w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                        <img src={comment.userPhotoURL} width={24} height={24}/>
                    </div>
                </div>
                <div className="flex flex-col text-wrap pl-6 pt-2 w-full">
                    <div className="flex flex-row gap-32">
                        <p className="font-bold cursor-pointer" onClick={() => router.push(`/profile/${comment.username}`)}>{comment.username}</p>
                        {
                            user && comment.userId === user.uid ?

                            <div className="items-end justify-end">
                                <div className="dropdown dropdown-bottom dropdown-end">
                                    <div tabIndex={0} role="button" className="bg-zinc-950 border-none text-gray-300 btn-outline"><span className="material-symbols-outlined cursor-pointer">more_vert</span></div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-zinc-800 rounded-box w-52">
                                        <li className="text-gray-300"><a onClick={() => {if (document) {(document.getElementById('editComment_modal') as HTMLFormElement).showModal();}}}>Edit Comment</a></li>
                                        <li className="text-gray-300"><a onClick={() => {if (document) {(document.getElementById('deleteComment_modal') as HTMLFormElement).showModal();}}}>Delete Comment</a></li>
                                    </ul>
                                </div>
                            </div>
                            :
                            <></>
                        }
                    </div>
                    <p className="pt-3">{comment.body}</p>
                    <div className="flex flex-row pt-6">
                    {
                        isLiked ?
                                    
                        <>
                          <button className="btn btn-circle btn-warning" onClick={updateLike}><span className="material-symbols-outlined">favorite</span></button><p className="pl-3 pt-3">{comment.likesCount}</p>
                        </>
                                      
                        :

                        <>
                          <button className="btn btn-outline btn-circle btn-warning" onClick={updateLike}><span className="material-symbols-outlined">favorite</span></button><p className="pl-3 pt-3">{comment.likesCount}</p>
                        </>   

                      }
                        <div className="pl-8"></div>
                        <button className="btn btn-ghost btn-circle btn-warning text-xs" onClick={loadReplies}><span className="material-symbols-outlined text-xs">comment</span></button><p className="pl-3 pt-3">{comment.replies}</p>
                    </div>
                    <div className="divider w-full"></div>
                    {
                        viewReplies ? 

                            <>
                                <div className="pt-3">
                                    <div className="flex flex-row gap-16">
                                        <p className="text-l pt-3">Replies</p>
                                        <button className="btn btn-circle btn-warning btn-outline w-36" onClick={addReply}>Add Reply</button>
                                    </div>
                                    <div className="divider w-full"></div>
                                </div>
                                <div className="w-full"></div>
                            </>
                            :
                        <></>
                    }
                </div>

                <dialog id="reply_modal" className="modal bg-zinc-900">
                    <div className="modal-box h-auto bg-zinc-900">
                        <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <button className="btn btn-circle btn-warning btn-outline w-36 absolute bottom-3 right-3" onClick={uploadReply}>Post Reply</button>
                        </form>
                        <h3 className="font-bold text-lg">Add Reply</h3>
                        <div className="flex flex-row pt-3 pb-12">
                            <div className="avatar flex flex-row items-start justify-start w-2/12 pr-4">
                                <div className="flex flex-row w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                    <img src={user!.photoURL!} width={24} height={24}/>
                                </div>
                            </div>
                            <textarea className="textarea textarea-bordered w-full resize-none h-64 pb-16 bg-zinc-800" placeholder="Write your reply..." value={replyBody} onChange={(e: any) => {setReplyBody(e.target.value)}}></textarea>
                        </div>
                    </div>
                </dialog>
                <dialog id="editComment_modal" className="modal">
                    <div className="modal-box h-auto bg-zinc-900">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <button className="btn btn-circle btn-warning btn-outline w-36 absolute bottom-3 right-3" onClick={editComment}>Update Comment</button>
                        </form>
                        <h3 className="font-bold text-lg text-gray-300">Edit Comment</h3>
                        <div className="flex flex-row pt-3 pb-12">
                            <div className="avatar flex flex-row items-start justify-start w-2/12">
                                <div className="flex flex-row w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                    <img src={user!.photoURL!} width={24} height={24}/>
                                </div>
                            </div>
                            <textarea className="textarea textarea-bordered w-full resize-none h-64 pb-16 bg-zinc-800 text-gray-300" placeholder="Write your comment..." value={commentBody} onChange={(e: any) => {setCommentBody(e.target.value)}}></textarea>
                        </div>
                    </div>
                </dialog>
                <dialog id="deleteComment_modal" className="modal">
                    <div className="modal-box h-auto bg-zinc-900">
                    <h3 className="font-bold text-lg pb-8">Are you sure you want to delete this comment?</h3>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <div className="flex flex-row gap-3 items-end justify-end">
                                <button className="btn btn-md btn-error btn-outline" onClick={deleteComment}>Yes</button>
                                <button className="btn btn-md btn-neutral btn-outline text-gray-300">No</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </>

    )

}