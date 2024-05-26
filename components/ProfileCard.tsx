"use client"

import LinkCardList from "./LinkCardList";
import { firestore } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserProfileType } from "../types/types";
import BioCard from "./BioCard";
import ReactDOM from 'react-dom';
import React from "react";
import Wallet from "./Wallet";
import FriendsGroupsModal from "./FriendsGroupsModal";

interface IProps {
    profile: UserProfileType;
  }


//Cover and BG image and GIF / VIDEO

export default function ProfileCard ({profile}: IProps) 
{   

    const router = useRouter();
    const isUser = true;

    return (
    <>
        <div className="container flex flex-col bg-zinc-950">
            <div className="card w-512 shadow-xl">
                <div className="card-body">
                    <div className="flex items-center justify-center gap-12 pt-8 px-8 bg-zinc-950 border-1">
                        <div className="avatar flex flex-row">
                            <div className="flex flex-row w-64 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                <img src={profile.profilePhotoURL} width={256} height={256}/>
                            </div>
                        </div>
                        
                        <div className="container flex flex-col ">
                            <h1 className="font-extrabold tracking-tight text-white text-3xl">
                                {profile.fullName}
                            </h1>
                            <h4 className="font-extrabold tracking-tight text-white text-xl pt-1">
                                @{profile.username}
                            </h4>
                            <div className="container flex flex-col py-3">
                                <div className="container flex flex-row pb-3">
                                    <span className="material-symbols-outlined pr-2">pin_drop</span><p>{profile.location}</p>
                                </div>
                                <div className="container flex flex-row">
                                    <span className="material-symbols-outlined pr-2">work</span><p>{profile.occupation}</p>
                                </div>
                                <div className="container flex flex-row pt-3">
                                    <LinkCardList links={profile.links as string[]}/>   
                                    {isUser ?

                                        <div className="pt-1">
                                        <button className="btn" title="Edit Profile" onClick={() => router.push(`/edit/${profile.username}`)}><span className="material-symbols-outlined">person_edit</span></button>  
                                        </div>
                                    :

                                    <></>

                                    }
                                </div> 
                                
                            </div>
                        </div>
                        <button className="btn" title="View h3xSpace" onClick={() => router.push(`/spaces/${profile.username}`)}><span className="material-symbols-outlined">token</span></button>
                        {isUser ? 
                            <>
                            <button className="btn" title="Crypto Wallet" onClick={() => {if (document) {(document.getElementById('my_modal_3') as HTMLFormElement).showModal();}}}><span className="material-symbols-outlined">wallet</span></button>
                            <dialog id="my_modal_3" className="modal">
                            <div className="modal-box w-full">
                                <Wallet profile={profile}/>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                            </dialog>
                            </>
                            :
                            <button className="btn" title="Send Crypto"><span className="material-symbols-outlined">currency_bitcoin</span></button>
                        }
                        
                        {isUser ? 
                        
                            <div>
                                <button id="fng" className="btn" title="Friends and Groups"  onClick={() => {if (document) {(document.getElementById('friends_groups') as HTMLFormElement).showModal();}}}><span className="material-symbols-outlined">diversity_3</span></button> 
                                <dialog id="friends_groups" className="modal">
                                <div className="modal-box w-full">
                                    <FriendsGroupsModal/>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                                </dialog>
                            </div>
                            : 
                            <button className="btn" title="Add Friend"><span className="material-symbols-outlined">person_add</span></button> 
                        }
                    </div>
                </div>
            </div>
        </div>
        <BioCard bio={profile.bio}/>
    </>
    );
}


