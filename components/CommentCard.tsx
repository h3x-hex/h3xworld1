import { auth } from "config/firebase.config";
import { useRouter } from "node_modules/next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { CommentType, PostType } from "types/types"
import { setDoc, doc, getDoc, query, where, getDocs, collection, deleteDoc} from "firebase/firestore";
import { firestore, storage } from "config/firebase.config";



interface IProps {
    comment: CommentType
    post: PostType
    updateComments: boolean
    setUpdateComments: Dispatch<SetStateAction<boolean>>
}

export default function CommentCard ({comment, post, updateComments, setUpdateComments}: IProps) {

    const [viewReplies, setViewReplies] = useState<boolean>(false);
    const [replyBody, setReplyBody] = useState<string>("");
    const [commentBody, setCommentBody] = useState<string>(comment.body);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likesCount, setLikesCount] = useState<number>(comment.likesCount);

    const user = auth.currentUser;
    const router = useRouter();

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

    const uploadReply = async () => {

        if(replyBody === "") alert("Comment is empty...")

        if(user) 
        {   
            console.log(replyBody);
            const timestamp = new Date().getTime();
            const replyId = user!.displayName! + timestamp
            const replyRef = doc(firestore, 'Replies', `${replyId}`);
            setDoc(replyRef, {
                commentId: comment.commentId, 
                username: user.displayName, 
                userId: user.uid, 
                userPhotoURL: user.photoURL,
                body: replyBody,
                timestamp: timestamp,
                likesCount: 0,
                replyId: replyId,
            });
            setReplyBody("");
            //if (document && user) {(document.getElementById('comment_modal') as HTMLFormElement).close()}
        }
        setUpdateComments(!updateComments);

    }

    const deleteComment = () => {

        const commentRef = doc(firestore, 'Comments', comment.commentId);
        deleteDoc(commentRef);
        const postRef = doc(firestore, 'Posts', comment.postId);
        setDoc(postRef, {commentsCount: post.commentsCount - 1}, {merge: true});
        console.log("Deleted Comment");
        setUpdateComments(!updateComments);
    }

    const editComment = async () => {

        if(commentBody === "") alert("Comment is empty...")

        if(user) 
        {   
            console.log(commentBody);
            const commentRef = doc(firestore, 'Comments', `${comment.commentId}`);
            setDoc(commentRef, {body: commentBody}, {merge: true});
            //if (document && user) {(document.getElementById('comment_modal') as HTMLFormElement).close()}

        }
        setUpdateComments(!updateComments);

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



    return (

        <>
            <div className="flex flex-row pb-3 w-full">
                <div className="avatar flex flex-row items-start justify-start pl-3 cursor-pointer" onClick={() => router.push(`/profile/${comment.username}`)}>
                    <div className="flex flex-row w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                        <img src={comment.userPhotoURL} width={24} height={24}/>
                    </div>
                </div>
                <div className="flex flex-col text-wrap pl-6 pt-2 w-full">
                    <div className="flex flex-row">
                        <p className="font-bold cursor-pointer" onClick={() => router.push(`/profile/${comment.username}`)}>{comment.username}</p>
                        {
                            user && comment.userId === user.uid ?

                            <div className="dropdown dropdown-bottom dropdown-end">
                                <div tabIndex={0} role="button" className=""><span className="material-symbols-outlined cursor-pointer">more_vert</span></div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a onClick={() => {if (document) {(document.getElementById('editComment_modal') as HTMLFormElement).showModal();}}}>Edit Comment</a></li>
                                    <li><a onClick={() => {if (document) {(document.getElementById('deleteComment_modal') as HTMLFormElement).showModal();}}}>Delete Comment</a></li>
                                </ul>
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
                                    <div className="flex flex-row">
                                        <p className="text-l pt-3">Replies</p>
                                        <button className="btn btn-circle btn-warning btn-outline w-36" onClick={addReply}>Add Reply</button>
                                    </div>
                                    <div className="divider w-full"></div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="avatar flex flex-row items-start justify-start w-3/12">
                                            <div className="flex flex-row w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                                <img src={""} width={24} height={24}/>
                                            </div>
                                        </div>
                                        <div className="flex flex-col text-wrap pl-6">
                                            <p className="font-bold">Username</p>
                                            <p className="">h3xWorld is the best platform on planet Earth and the multiverse. This is first and best web3 social media platform coming soon to web and your mobile.</p>
                                            <div className="flex flex-row pt-3">
                                                <button className="btn btn-md btn-outline btn-circle btn-warning text-xs"><span className="material-symbols-outlined text-xs">favorite</span></button><p className="pl-3 pt-3">0</p>
                                                <div className="pl-8"></div>
                                                <button className="btn btn-ghost btn-circle btn-warning text-xs"><span className="material-symbols-outlined text-xs">comment</span></button><p className="pl-3 pt-3">0</p>
                                            </div>
                                            <div className="divider w-full"></div>
                                        </div>
                                        
                                    </div>
                            </>
                            :
                        <></>
                    }
                </div>

                <dialog id="reply_modal" className="modal">
                <div className="modal-box h-auto">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <button className="btn btn-circle btn-warning btn-outline w-36 absolute bottom-3 right-3" onClick={() => uploadReply}>Post Reply</button>
                    </form>
                    <h3 className="font-bold text-lg">Add Reply</h3>
                    <div className="flex flex-row pt-3 pb-12">
                        <div className="avatar flex flex-row items-start justify-start w-2/12">
                            <div className="flex flex-row w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                <img src={user!.photoURL!} width={24} height={24}/>
                            </div>
                        </div>
                        <textarea className="textarea textarea-bordered w-full resize-none h-64 pb-16" placeholder="Write your reply..." ></textarea>
                    </div>
                </div>
                </dialog>
                <dialog id="editComment_modal" className="modal">
                    <div className="modal-box h-auto">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <button className="btn btn-circle btn-warning btn-outline w-36 absolute bottom-3 right-3" onClick={editComment}>Update Comment</button>
                        </form>
                        <h3 className="font-bold text-lg">Edit Comment</h3>
                        <div className="flex flex-row pt-3 pb-12">
                            <div className="avatar flex flex-row items-start justify-start w-2/12">
                                <div className="flex flex-row w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                    <img src={user!.photoURL!} width={24} height={24}/>
                                </div>
                            </div>
                            <textarea className="textarea textarea-bordered w-full resize-none h-64 pb-16" placeholder="Write your comment..." value={commentBody} onChange={(e: any) => {setCommentBody(e.target.value)}}></textarea>
                        </div>
                    </div>
                </dialog>
                <dialog id="deleteComment_modal" className="modal">
                    <div className="modal-box h-auto">
                    <h3 className="font-bold text-lg pb-8">Are you sure you want to delete this comment?</h3>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <div className="flex flex-row gap-3">
                                <button className="btn btn-md btn-error btn-outline" onClick={deleteComment}>Yes</button>
                                <button className="btn btn-md btn-neutral btn-outline">No</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </>

    )

}