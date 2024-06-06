import { auth } from "config/firebase.config";
import { useRouter } from "node_modules/next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ReplyType, PostType, CommentType } from "types/types"
import { setDoc, doc, getDoc, query, where, getDocs, collection, deleteDoc} from "firebase/firestore";
import { firestore, storage } from "config/firebase.config";



interface IProps {
    reply: ReplyType
    comment: CommentType
}

export default function ReplyCard ({reply, comment}: IProps) {

    const user = auth.currentUser;
    const router = useRouter();

    const [replyBody, setReplyBody] = useState<string>(reply.body);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likesCount, setLikesCount] = useState<number>(reply.likesCount);

    if(user)
    {
        setIsLiked
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

        if(replyBody === "") alert("Reply is empty...")

        if(user) 
        {   
            console.log(replyBody);
            const timestamp = new Date().getTime();
            const replyId = user!.displayName! + timestamp
            const replyRef = doc(firestore, 'Replies', `${replyId}`);
            setDoc(replyRef, {
                replyId: reply.replyId, 
                username: user.displayName, 
                userId: user.uid, 
                userPhotoURL: user.photoURL,
                body: replyBody,
                timestamp: timestamp,
                likesCount: 0,
                commentId: comment.commentId,
            });
            setReplyBody("");
            //if (document && user) {(document.getElementById('reply_modal') as HTMLFormElement).close()}
        }


    }

    const deleteReply = () => {

        const replyRef = doc(firestore, 'Replies', reply.replyId);
        deleteDoc(replyRef);
        const commentRef = doc(firestore, 'Comments', comment.commentId);
        setDoc(commentRef, {repliesCount: comment.replies - 1}, {merge: true});
        console.log("Deleted Reply");
    }

    const editReply = async () => {

        if(replyBody === "") alert("Reply is empty...")

        if(user) 
        {   
            console.log(replyBody);
            const replyRef = doc(firestore, 'Replies', `${reply.replyId}`);
            setDoc(replyRef, {body: replyBody}, {merge: true});
            //if (document && user) {(document.getElementById('reply_modal') as HTMLFormElement).close()}

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

        const replyRef = doc(firestore, `Replies/${reply.replyId}`);
        const likeId = user.displayName + reply.replyId;
        const likesRef = doc(firestore, "ReplyLikes", `${likeId}`);

        if(isLiked && user)
        {
          setIsLiked(false);
          setLikesCount(likesCount - 1);
          reply.likesCount = likesCount - 1;
          //post.likes.splice(post.likes.indexOf(user.uid), 1);
          deleteDoc(likesRef)
          console.log(reply);
          setDoc(replyRef, { ...reply }, { merge: true });
        }
        if(!isLiked && user) {
  
          setIsLiked(true);
          setLikesCount(likesCount + 1);
          reply.likesCount = likesCount + 1;
          //(post.likes).push(user.uid);
          setDoc(likesRef, { likeId: likeId, username: user.displayName, timestamp: new Date().getTime(), userPhotoURL: user.photoURL, replyId: reply.replyId, comment: comment.commentId})
          console.log(reply);
          setDoc(replyRef, { ...reply }, { merge: true });

        }
    }

    

    useEffect(() => {
        async function getData() {
          
            if(user)
            {
                  //setIsLiked((post.postBody.likes.includes(user.uid)));
                  //console.log(isLiked, user.uid, post.postBody.likes);
                const likesDoc = await getDoc(doc(firestore, 'ReplyLikes', `${user.displayName}${reply.replyId}`));
                if(likesDoc.exists())
                {
                    setIsLiked(true);
                }
            }
          }
      getData();
        //getReplies(post.postId);
      }, []);



    return (

        <>
            <div className="flex flex-row py-3 w-full">
                <div className="avatar flex flex-row items-start justify-start pl-3 cursor-pointer" onClick={() => router.push(`/profile/${reply.username}`)}>
                    <div className="flex flex-row w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                        <img src={reply.userPhotoURL} width={24} height={24}/>
                    </div>
                </div>
                <div className="flex flex-col text-wrap pl-6 pt-2 w-full">
                    <div className="flex flex-row">
                        <p className="font-bold cursor-pointer" onClick={() => router.push(`/profile/${reply.username}`)}>{reply.username}</p>
                        {
                            user && reply.userId === user.uid ?

                            <div className="dropdown dropdown-bottom dropdown-end">
                                <div tabIndex={0} role="button" className=""><span className="material-symbols-outlined cursor-pointer">more_vert</span></div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a onClick={() => {if (document) {(document.getElementById('editReply_modal') as HTMLFormElement).showModal();}}}>Edit Reply</a></li>
                                    <li><a onClick={() => {if (document) {(document.getElementById('deleteReply_modal') as HTMLFormElement).showModal();}}}>Delete Reply</a></li>
                                </ul>
                            </div>
                            :
                            <></>
                        }
                    </div>
                    <p className="pt-3">{reply.body}</p>
                    <div className="flex flex-row pt-6">
                    {
                        isLiked ?
                                    
                        <>
                          <button className="btn btn-circle btn-warning" onClick={updateLike}><span className="material-symbols-outlined">favorite</span></button><p className="pl-3 pt-3">{reply.likesCount}</p>
                        </>
                                      
                        :

                        <>
                          <button className="btn btn-outline btn-circle btn-warning" onClick={updateLike}><span className="material-symbols-outlined">favorite</span></button><p className="pl-3 pt-3">{reply.likesCount}</p>
                        </>   

                      }
                    </div>
                    <div className="divider w-full"></div>
                    
                </div>
                <dialog id="editReply_modal" className="modal">
                    <div className="modal-box h-auto">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <button className="btn btn-circle btn-warning btn-outline w-36 absolute bottom-3 right-3" onClick={editReply}>Update Reply</button>
                        </form>
                        <h3 className="font-bold text-lg">Edit Reply</h3>
                        <div className="flex flex-row pt-3 pb-12">
                            <div className="avatar flex flex-row items-start justify-start w-2/12">
                                <div className="flex flex-row w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                    <img src={user!.photoURL!} width={24} height={24}/>
                                </div>
                            </div>
                            <textarea className="textarea textarea-bordered w-full resize-none h-64 pb-16" placeholder="Write your reply..." value={replyBody} onChange={(e: any) => {setReplyBody(e.target.value)}}></textarea>
                        </div>
                    </div>
                </dialog>
                <dialog id="deleteReply_modal" className="modal">
                    <div className="modal-box h-auto">
                    <h3 className="font-bold text-lg pb-8">Are you sure you want to delete this reply?</h3>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <div className="flex flex-row gap-3">
                                <button className="btn btn-md btn-error btn-outline" onClick={deleteReply}>Yes</button>
                                <button className="btn btn-md btn-neutral btn-outline">No</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </>

    )

}