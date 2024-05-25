import { getAuth } from "firebase/auth";
import { useState } from "react";


export default function Comments () {

    const auth = getAuth();
    const user = auth.currentUser;

    const [viewReplies, setViewReplies] = useState<boolean>(false);


    const loadComments = () => {

        setViewReplies(!viewReplies);

    }

    const postComment = () => {



    }

    const addComment = () => {
        if(!user) 
        {
            alert("Must Login first...")
            return (<></>);
        }
        if (document && user) {(document.getElementById('comment_modal') as HTMLFormElement).showModal();}
    }


    return (
        <div className="container pt-8 w-full">
            <div className="flex flex-row">
                <p className="text-xl pt-3">Comments</p>
                <button className="btn btn-circle btn-warning btn-outline w-36" onClick={addComment}>Add Comment</button>
            </div>
            <div className="divider w-full"></div>
            
            <div className="flex flex-row">
                <div className="avatar flex flex-row items-start justify-start w-3/12">
                    <div className="flex flex-row w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                        <img src="https://img.daisyui.com/tailwind-css-component-profile-5@56w.png" width={24} height={24}/>
                    </div>
                </div>
                <div className="flex flex-col text-wrap pl-6">
                    <p className="font-bold">Username</p>
                    <p className="">h3xWorld is the best platform on planet Earth and the multiverse. This is first and best web3 social media platform coming soon to web and your mobile.</p>
                    <div className="flex flex-row pt-3">
                        <button className="btn btn-outline btn-circle btn-warning text-xs"><span className="material-symbols-outlined text-xs">favorite</span></button><p className="pl-3 pt-3">0</p>
                        <div className="pl-8"></div>
                        <button className="btn btn-ghost btn-circle btn-warning text-xs" onClick={loadComments}><span className="material-symbols-outlined text-xs">comment</span></button><p className="pl-3 pt-3">0</p>
                    </div>
                    {
                        viewReplies ? 

                        <>
                            <div className="pt-3">
                                <p className="text-l">Replies</p>
                                <div className="divider w-full"></div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="avatar flex flex-row items-start justify-start w-3/12">
                                        <div className="flex flex-row w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                            <img src="https://img.daisyui.com/tailwind-css-component-profile-5@56w.png" width={24} height={24}/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col text-wrap pl-6">
                                        <p className="font-bold">Username</p>
                                        <p className="">h3xWorld is the best platform on planet Earth and the multiverse. This is first and best web3 social media platform coming soon to web and your mobile.</p>
                                        <div className="flex flex-row pt-3">
                                            <button className="btn btn-outline btn-circle btn-warning text-xs"><span className="material-symbols-outlined text-xs">favorite</span></button><p className="pl-3 pt-3">0</p>
                                            <div className="pl-8"></div>
                                            <button className="btn btn-ghost btn-circle btn-warning text-xs"><span className="material-symbols-outlined text-xs">comment</span></button><p className="pl-3 pt-3">0</p>
                                        </div>
                                    </div>
                                </div>
                        </>
                        :
                        <></>
                    }
                </div>
            </div>
            <dialog id="comment_modal" className="modal">
            <div className="modal-box h-auto">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Add Comment</h3>
                <div className="flex flex-row pt-6">
                    <div className="avatar flex flex-row items-start justify-start w-2/12">
                        <div className="flex flex-row w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                            <img src="https://img.daisyui.com/tailwind-css-component-profile-5@56w.png" width={24} height={24}/>
                        </div>
                    </div>
                    <textarea className="textarea textarea-bordered w-full resize-none h-64" placeholder="Write your comment..."></textarea>
                </div>
                <div className="pl-80 pt-6 items-end justify-end">
                <button className="btn btn-circle btn-warning btn-outline w-36" onClick={postComment}>Post Comment</button>
                </div>
            </div>
            </dialog>
        </div>
    )
}