"use client"

import {ConnectWallet, useAddress} from "app/thirdweb";
import { ChangeEvent, useRef, useState } from 'react';
import { PostType } from 'types/types';
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getAuth, signOut } from 'firebase/auth';
import { firestore, storage } from 'config/firebase.config';
import {useRouter} from "next/navigation";
import { use } from "chai";


interface IProps {
    isLoggedIn: boolean;
    write?: boolean;
}

export const Navbar = ({isLoggedIn, write}: IProps) => {

    const auth = getAuth();
    const user = auth.currentUser;
    var username = "";
    const router = useRouter();

    if(user){
        isLoggedIn = true;
        username = user.displayName;

    }

    const goProfile = () => {
        router.push(`/profile/${username}`);
    }
    


    const openCreatePost = () => {
        router.push("/write");
    }

    const goLogin = () => {

        router.push("/");
    }

    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            router.push("/")
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });          
    }

    
    return (
        <>
            <div className="navbar bg-zinc-950">
                <div className="navbar-start">
                    <p className="text-3xl font-bold pl-8">h<span className="text-[#fdb702] cursor-pointer" onClick={() => window.open("https://www.h3x.club", '_blank')}>3</span>x<span className="text-gray-600">|</span>World</p>
                </div>
                <div className="navbar-center">
                    
                </div>
                <div className="navbar-end">
                    {write ? 
                    <></>
                    :
                    <>
                      {
                        isLoggedIn ? 
                        <>
                        <button className="btn btn-outline btn-warning btn-circle w-36" onClick={openCreatePost}>Create Post</button>
                        <div tabIndex={0} role="button" className="avatar dropdown dropdown-bottom dropdown-end px-3">
                            <div className="w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-1">
                                <img src={user.photoURL} />
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-72">
                                <li>
                                    <div tabIndex={0} role="button" className="avatar" onClick={router.push(`/profile/${user.displayName}`)}>
                                        <div className="w-24 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                            <img src={user.photoURL}/>
                                        </div>
                                        <h1 className="text-xl">{user.displayName}</h1>
                                    </div>
                                </li>
                                <li>
                                    <a className="w-full" onClick={logout}>
                                        <p className="items-start justify-start">Logout</p>
                                        <span className="material-symbols-outlined items-end justify-end">logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        </>
                        : 
                        <button className="btn btn-warning btn-outline px-8 btn-circle w-40" onClick={goLogin}>Login</button> 
                      }
                    </>
                    } 
                </div>
            </div>
            <div className="h-1 bg-yellow-600"></div>
        </>
        )



}