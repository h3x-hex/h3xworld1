"use client"

import LinkCardList from "./LinkCardList";
import { auth, firestore } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where, setDoc, deleteDoc, increment, updateDoc, or, and } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FriendsType, UserProfileType, WalletType } from "../types/types";
import BioCard from "./BioCard";
import React from "react";
import Wallet from "./Wallet"; 
import FriendsGroupsModal from "./FriendsGroupsModal";
import { ethers } from "ethers";
import * as bip39 from "bip39";
import Followers from "./Followers";
import { useMediaQuery } from 'react-responsive';



interface IProps {
    profile: UserProfileType;
    wallet: WalletType;
  }


//Cover and BG image and GIF / VIDEO

export default function ProfileCard ({profile, wallet}: IProps) 
{   

    const router = useRouter();
    const user = auth.currentUser;
    const [isUser, setIsUser] = useState<boolean>(false);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [isFriend, setIsFriend] = useState<boolean>(false);
    const [tab, setTab] = useState<string>('1');
    const [requested, setRequested] = useState<boolean>(false);
    
    if (user && !isUser)
    {
        if(user.displayName === profile.username) setIsUser(true);

    }

    const isMobile = useMediaQuery({ maxWidth: 1224 });


    const followUser = async () => {

        if(user)
        {
            if (user.displayName !== profile.username)
            {
                
                if(isFollowing)
                {
                    const fId = user!.displayName! + new Date().getTime();
                    const postRef = doc(firestore, 'Followers', fId);
                    setDoc(postRef,  {
                        username: user!.displayName!,
                        userPhotoURL: user.photoURL,
                        followUser: profile.username,
                        followPhotoURL: profile.profilePhotoURL,
                    });
                    setIsFollowing(!isFollowing);
                    
                }
                else
                {
                    const postRef = collection(firestore, 'Followers');
                    const q = query(postRef, where('followUser', '==', profile.username), where('username', '==', user.displayName));
                    const getQ = await getDocs(q);
                    getQ.forEach((doc) => {
                        deleteDoc(doc.ref);
                    });
                    setIsFollowing(!isFollowing);
                }
            }
        }
        console.log(isFollowing);
    }
     
    useEffect(() => {
        async function getData(username: string) {

            const followerRef = collection(firestore, 'Followers');
            const friendRef = collection(firestore, 'Friends');
            const requestRef = collection(firestore, 'Requests');

            if(user)
            {
                
                if (user.displayName !== username)
                {
                    const q = query(followerRef, where('followName', '==', username), where('username', '==', user.displayName));
                    const getQ = await getDocs(q);
                    getQ.forEach((doc) => {

                        if(doc.exists())
                        {
                            setIsFollowing(true);
                        }
                        else setIsFollowing(false);

                    });

                    const friendQuery = query(friendRef, and(where('friendName', '==', username), where('username', '==', user.displayName)));
                    const getFriendQ = await getDocs(friendQuery);
                    getFriendQ.forEach((doc) => {

                        if(doc.exists())
                        {
                            setIsFriend(true);
                        }
                        else setIsFriend(false);

                    });

                    const requestQuery = query(requestRef, where('username', '==', user.displayName));
                    const getRequestQ = await getDocs(requestQuery);
                    getRequestQ.forEach((doc) => {

                        if(doc.exists())
                        {
                            setRequested(true);
                        }
                        else setRequested(false);

                    });
                }
            }
        }
        getData(profile.username);
      }, []);

      const openFollowersModal = (tabNo: string) => {
        setTab(tabNo);
        if (document) {(document.getElementById('followers') as HTMLFormElement).showModal();}
      }

      const sendFriendRequest = () => {
        //FB: Friend with status(pending/accepted) if declined delete doc
        const requestRef = doc(firestore, 'Requests', `${user?.displayName}${profile.username}`);
        setDoc(requestRef,  {
            username: user!.displayName!,
            userPhotoURL: user!.photoURL,
            friendName: profile.username,
            friendPhotoURL: profile.profilePhotoURL,
            dateAdded: new Date().getTime(),
            friendId: `${user?.displayName}${profile.username}`
        });

        setRequested(true);
        
      }

      const removeFriend = async () => {
        const friendRef = collection(firestore, 'Friends');
        const friendQuery = query(friendRef,and((or(where('friendName', '==', user?.displayName), where('username', '==', user?.displayName))), (or(where('friendName', '==', profile.username), where('username', '==', profile.username)))));
        const querySnapshotFriend = await getDocs(friendQuery);
        querySnapshotFriend.forEach((doc) => {
            deleteDoc(doc.ref);
        });
        
        const userRef = doc(firestore, 'Users', `${user?.displayName}`)
        updateDoc(userRef, {friendsCount: increment(-1)});
        setIsFriend(false);
        setRequested(false);
      }
    

    return (
    <>
    {
        isMobile?

        <>
            <div className="container flex flex-col bg-zinc-950 text-gray-300">
            <div className="card w-512 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-col items-center justify-center gap-12 pt-8 px-8 bg-zinc-950 border-1">
                        <div className="avatar flex flex-col">
                            <div className="flex flex-col w-64 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                <img src={profile.profilePhotoURL} width={256} height={256}/>
                            </div>
                        </div>
                        
                        <div className="container flex flex-col items-center justify-center">
                            <h1 className="font-extrabold tracking-tight text-3xl">
                                {profile.fullName}
                            </h1>
                            <h4 className="font-extrabold tracking-tight text-xl pt-1">
                                @ {profile.username}
                            </h4>
                            
                            <div className="container flex flex-col py-3 items-center justify-center">
                                <div className="container flex flex-row pb-3 items-center justify-center pl-16">
                                    <span className="material-symbols-outlined pr-2 text-gray-300">pin_drop</span><p className="text-gray-300">{profile.location}</p>
                                </div>
                                <div className="container flex flex-row items-center justify-center pl-16">
                                    <span className="material-symbols-outlined pr-2 text-gray-300">work</span><p className="text-gray-300">{profile.occupation}</p>
                                </div>

                                <div className="pt-3 flex flex-row gap-3">
                                    <p className="text-gray-300 cursor-pointer hover:font-bold hover:underline pl-1" onClick={() => openFollowersModal('1')}>{profile.followersCount} Followers</p>
                                    <p className="text-gray-300 cursor-pointer hover:font-bold hover:underline " onClick={() => openFollowersModal('2')} >{profile.followingCount} Following</p>
                                </div>
                                
                                <div className="container flex flex-col pt-3">
                                    <LinkCardList links={profile.links as string[]}/>   
                                    {
                                        isUser ?

                                            <div className="pt-1 w-full pl-1">
                                            <button className="btn btn-outline bg-zinc-900 border-none w-60 text-gray-300" title="Edit Profile" onClick={() => router.push(`/edit/${profile.username}`)}>Edit Profile<span className="material-symbols-outlined text-gray-300">person_edit</span></button>  
                                            </div>
                                        :

                                        <>
                                        {
                                            !isFollowing ?

                                            <div className="pt-1">
                                                <button className="btn btn-outline bg-zinc-900 border-none w-full text-gray-300" title="Follow User" onClick={followUser}>Follow</button>  
                                            </div>

                                            :

                                            <div className="pt-1">
                                                <button className="btn btn-outline btn-warning bg-zinc-900 border-warning w-full text-gray-300" title="Follow User" onClick={followUser}>Following</button>  
                                            </div>
                                        }
                                        </>
                                    }
                                </div> 
                                
                            </div>
                        </div>
                        <div className="flex flex-row gap-8">
                        <button className="btn btn-outline bg-zinc-900 border-none" title="View h3xSpace" onClick={() => router.push(`/spaces/${profile.username}`)}><span className="material-symbols-outlined text-gray-300">token</span></button>
                        {isUser ? 
                            <>
                            <button className="btn btn-outline bg-zinc-900 border-none" title="Crypto Wallet" onClick={() => {if (document) {(document.getElementById('my_modal_3') as HTMLFormElement).showModal();}}}><span className="material-symbols-outlined text-gray-300">wallet</span></button>
                            <dialog id="my_modal_3" className="modal">
                            <div className="modal-box w-full bg-zinc-900">
                                <Wallet profile={profile} wallet={wallet}/>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                            </dialog>
                            </>
                            :
                            <button className="btn btn-outline bg-zinc-900 border-none" title="Send Message"><span className="material-symbols-outlined text-gray-300">chat</span></button>
                        }
                        
                        {
                        
                            isUser ? 
                        
                            <div className="">
                                <button id="fng" className="btn btn-outline bg-zinc-900 border-none" title="Friends and Groups"  onClick={() => {if (document) {(document.getElementById('friends_groups') as HTMLFormElement).showModal();}}}><span className="material-symbols-outlined text-gray-300">diversity_3</span></button> 
                                <dialog id="friends_groups" className="modal ">
                                    {isMobile ? 
                                       
                                    <>
                                    <div className="modal-box w-full bg-zinc-900">
                                        <FriendsGroupsModal profile={profile}/>
                                    </div>
                                    <form method="dialog" className="modal-backdrop">
                                        <button>close</button>
                                    </form>
                                    </>
                                    
                                       
                                    :
                                    
                                    <>
                                    <div className="modal-box max-w-none w-6/12 bg-zinc-900">
                                        <FriendsGroupsModal profile={profile}/>
                                    </div>
                                    <form method="dialog" className="modal-backdrop">
                                        <button>close</button>
                                    </form>
                                    </>
                                    }
                                </dialog>
                            </div>

                            : 

                            requested ?

                                <button className="btn btn-outline bg-zinc-900 border-none" title="Requested"><span className="material-symbols-outlined text-gray-300" onClick={() => {if (document) {(document.getElementById('friendModal') as HTMLFormElement).showModal();}}}>person_alert</span></button> 

                            : 

                            isFriend ?

                                <button className="btn btn-outline bg-zinc-900 border-none" title="Friends"><span className="material-symbols-outlined text-gray-300" onClick={() => {if (document) {(document.getElementById('friendModal') as HTMLFormElement).showModal();}}}>person_check</span></button> 

                            :

                                <button className="btn btn-outline bg-zinc-900 border-none" title="Add Friend"><span className="material-symbols-outlined text-gray-300" onClick={() => {if (document) {(document.getElementById('friendModal') as HTMLFormElement).showModal();}}}>person_add</span></button> 
                        
                        }
                        </div>
                    </div>
                </div>
            </div>
            <BioCard bio={profile.bio}/>
        </div>

        </>

        :

        <div className="container flex flex-col bg-zinc-950 text-gray-300">
            <div className="card w-512 shadow-xl">
                <div className="card-body">
                    <div className="flex items-center justify-center gap-12 pt-8 px-8 bg-zinc-950 border-1">
                        <div className="avatar flex flex-row cursor-pointer" onClick={() => {if (document) {(document.getElementById('userImage') as HTMLFormElement).showModal();}}}>
                            <div className="flex flex-row w-64 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                <img src={profile.profilePhotoURL} width={256} height={256}/>
                            </div>
                        </div>
                        
                        <div className="container flex flex-col ">
                            <h1 className="font-extrabold tracking-tight text-3xl">
                                {profile.fullName}
                            </h1>
                            <h4 className="font-extrabold tracking-tight text-xl pt-1">
                                @ {profile.username}
                            </h4>
                            
                            <div className="container flex flex-col py-3">
                                <div className="container flex flex-row pb-3">
                                    <span className="material-symbols-outlined pr-2 text-gray-300">pin_drop</span><p className="text-gray-300">{profile.location}</p>
                                </div>
                                <div className="container flex flex-row">
                                    <span className="material-symbols-outlined pr-2 text-gray-300">work</span><p className="text-gray-300">{profile.occupation}</p>
                                </div>

                                <div className="pt-3 flex flex-row">
                                    <p className="text-gray-300 cursor-pointer hover:font-bold hover:underline pl-1" onClick={() => openFollowersModal('1')}>{profile.followersCount} Followers</p>
                                    <p className="text-gray-300 cursor-pointer hover:font-bold hover:underline pr-[500px]" onClick={() => openFollowersModal('2')} >{profile.followingCount} Following</p>
                                </div>
                                
                                <div className="container flex flex-row pt-3">
                                    <LinkCardList links={profile.links as string[]}/>   
                                    {
                                        isUser ?

                                            <div className="pt-1">
                                            <button className="btn btn-outline bg-zinc-900 border-none" title="Edit Profile" onClick={() => router.push(`/edit/${profile.username}`)}><span className="material-symbols-outlined text-gray-300">person_edit</span></button>  
                                            </div>
                                        :

                                        <>
                                        {
                                            !isFollowing ?

                                            <div className="pt-1">
                                                <button className="btn btn-outline bg-zinc-900 border-none w-36 text-gray-300" title="Follow User" onClick={followUser}>Follow</button>  
                                            </div>

                                            :

                                            <div className="pt-1">
                                                <button className="btn btn-outline btn-warning bg-zinc-900 border-warning w-36 text-gray-300" title="Follow User" onClick={followUser}>Following</button>  
                                            </div>
                                        }
                                        </>
                                    }
                                </div> 
                                
                            </div>
                        </div>
                        <button className="btn btn-outline bg-zinc-900 border-none" title="View h3xSpace" onClick={() => router.push(`/spaces/${profile.username}`)}><span className="material-symbols-outlined text-gray-300">token</span></button>
                        {isUser ? 
                            <>
                            <button className="btn btn-outline bg-zinc-900 border-none" title="Crypto Wallet" onClick={() => {if (document) {(document.getElementById('my_modal_3') as HTMLFormElement).showModal();}}}><span className="material-symbols-outlined text-gray-300">wallet</span></button>
                            <dialog id="my_modal_3" className="modal">
                            <div className="modal-box w-full bg-zinc-900">
                                <Wallet profile={profile} wallet={wallet}/>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                            </dialog>
                            </>
                            :
                            <button className="btn btn-outline bg-zinc-900 border-none" title="Send Message"><span className="material-symbols-outlined text-gray-300">chat</span></button>
                        }
                        
                        {
                        
                            isUser ? 
                        
                            <div className="">
                                <button id="fng" className="btn btn-outline bg-zinc-900 border-none" title="Friends and Groups"  onClick={() => {if (document) {(document.getElementById('friends_groups') as HTMLFormElement).showModal();}}}><span className="material-symbols-outlined text-gray-300">diversity_3</span></button> 
                                <dialog id="friends_groups" className="modal ">
                                    <div className="modal-box w-full bg-zinc-900">
                                        <FriendsGroupsModal profile={profile}/>
                                    </div>
                                    <form method="dialog" className="modal-backdrop">
                                        <button>close</button>
                                    </form>
                                </dialog>
                            </div>

                            : 

                            requested ?

                                <button className="btn btn-outline bg-zinc-900 border-none" title="Requested"><span className="material-symbols-outlined text-gray-300" onClick={() => {if (document) {(document.getElementById('friendModal') as HTMLFormElement).showModal();}}}>person_alert</span></button> 

                            : 

                            isFriend ?

                                <button className="btn btn-outline bg-zinc-900 border-none" title="Friends"><span className="material-symbols-outlined text-gray-300" onClick={() => {if (document) {(document.getElementById('friendModal') as HTMLFormElement).showModal();}}}>person_check</span></button> 

                            :

                                <button className="btn btn-outline bg-zinc-900 border-none" title="Add Friend"><span className="material-symbols-outlined text-gray-300" onClick={() => {if (document) {(document.getElementById('friendModal') as HTMLFormElement).showModal();}}}>person_add</span></button> 
                        
                        }
                    </div>
                </div>
            </div>
            <BioCard bio={profile.bio}/>
        </div>
        }
        <dialog id="userImage" className="modal">
            <div className="modal-box w-full bg-zinc-900">
                <img src={profile.profilePhotoURL} width={512} height={512}/>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
        <dialog id="followers" className="modal">
            <div className="modal-box w-full bg-zinc-900">
                <Followers profile={profile} tab={tab}/>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
        <dialog id="friendModal" className="modal">
        <div className="modal-box w-full h-auto bg-zinc-900">
            {
                requested ?

                <>
                <h3 className="font-bold text-lg pb-8 text-gray-300">Are you sure you want to cancel your friend request to {profile.username}?</h3>
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <div className="flex flex-row gap-3 items-end justify-end">
                        <button className="btn btn-md btn-error btn-outline" onClick={sendFriendRequest}>Yes</button>
                        <button className="btn btn-md btn-neutral btn-outline text-gray-300">No</button>
                    </div>
                </form>
                </>

                :
                
                !isFriend ?

                <>
                <h3 className="font-bold text-lg pb-8 text-gray-300">Are you sure you want to send a friend request to {profile.username}?</h3>
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <div className="flex flex-row gap-3 items-end justify-end">
                        <button className="btn btn-md btn-warning btn-outline" onClick={sendFriendRequest}>Yes</button>
                        <button className="btn btn-md btn-neutral btn-outline text-gray-300">No</button>
                    </div>
                </form>
                </>

                :

                <>
                <h3 className="font-bold text-lg pb-8 text-gray-300">Are you sure you want to remove {profile.username} as friend?</h3>
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <div className="flex flex-row gap-3 items-end justify-end">
                        <button className="btn btn-md btn-error btn-outline" onClick={removeFriend}>Yes</button>
                        <button className="btn btn-md btn-neutral btn-outline text-gray-300">No</button>
                    </div>
                </form>
                </>

            }
        </div>
        </dialog>
    </>
    );
}


