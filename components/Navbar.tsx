"use client"

import { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { PostType, UserProfileType } from 'types/types';
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getAuth, signOut } from 'firebase/auth';
import { firestore, storage } from 'config/firebase.config';
import { useRouter } from "next/navigation";
import CreatePost from '../components/CreatePost';
import Image from 'next/image';
import { hexLogo } from 'public';
import { useMediaQuery } from 'react-responsive';



interface IProps {
    isLoggedIn: boolean;
    write?: boolean;
}

export const Navbar = ({isLoggedIn, write}: IProps) => {

    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter();
    
    const isMobile = useMediaQuery({ maxWidth: 1224 });

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
        {
            isMobile ?

            <>
                <div className="navbar bg-zinc-950">
                    <div className="navbar-start pl-3">
                        <Image className='cursor-pointer' src={hexLogo} alt='logo' width={36} height={36} onClick={() => router.push('/home')}/>
                        <p className="text-3xl font-bold pl-3 cursor-pointer text-gray-300" onClick={() => router.push('/home')}>h</p><span className="text-[#fdb702] text-3xl font-bold cursor-pointer" onClick={() => window.open("https://www.h3x.club", '_blank')}>3</span><p className="text-3xl font-bold cursor-pointer text-gray-300" onClick={() => router.push('/home')}>x</p><span className="text-gray-600 text-3xl font-bold cursor-pointer" onClick={() => router.push('/home')}>|</span><p className="text-3xl font-bold cursor-pointer text-gray-300" onClick={() => router.push('/home')}>World</p>
                    </div>
                    <div className="navbar-center">
                        
                    </div>
                    <div className="navbar-end">
                        {write ? 
                        <>
                            <div tabIndex={0} role="button" className="avatar dropdown dropdown-bottom dropdown-end px-3">
                                <div className="w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-1">
                                    <img src={user!.photoURL!} />
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu mt-3 p-2 shadow rounded-box w-72 bg-zinc-900">
                                    <li>
                                        <div tabIndex={0} role="button" className="avatar" onClick={() => router.push(`/profile/${user!.displayName!}`)}>
                                            <div className="w-24 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                                <img src={user!.photoURL!}/>
                                            </div>
                                            <h1 className="text-xl pl-3 text-gray-300">{user!.displayName!}</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="w-full" onClick={logout}>
                                            <p className="items-start justify-start text-gray-300">Logout</p>
                                            <span className="material-symbols-outlined items-end justify-end text-gray-300">logout</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </>
                        :
                        <>
                        {
                            isLoggedIn ? 
                            <>
                            <div tabIndex={0} role="button" className="avatar dropdown dropdown-bottom dropdown-end px-3">
                                <div className="w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-1">
                                    <img src={user!.photoURL!} />
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu mt-3 p-2 shadow rounded-box w-72 bg-zinc-900">
                                    <li>
                                        <div tabIndex={0} role="button" className="avatar" onClick={() => router.push(`/profile/${user!.displayName!}`)}>
                                            <div className="w-24 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                                <img src={user!.photoURL!}/>
                                            </div>
                                            <h1 className="text-xl pl-3 text-gray-300">{user!.displayName!}</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="w-full">
                                            <p className="items-start justify-start text-gray-300" onClick={() => router.push(`/write`)}>Create Post</p>
                                            <span className="material-symbols-outlined items-end justify-end text-gray-300">edit_square</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="w-full" onClick={logout}>
                                            <p className="items-start justify-start text-gray-300">Logout</p>
                                            <span className="material-symbols-outlined items-end justify-end text-gray-300">logout</span>
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

            :
            
            <>
            <div className="navbar bg-zinc-950">
                <div className="navbar-start pl-3">
                    <Image className='cursor-pointer' src={hexLogo} alt='logo' width={36} height={36} onClick={() => router.push('/home')}/>
                    <p className="text-3xl font-bold pl-3 cursor-pointer text-gray-300" onClick={() => router.push('/home')}>h</p><span className="text-[#fdb702] text-3xl font-bold cursor-pointer" onClick={() => window.open("https://www.h3x.club", '_blank')}>3</span><p className="text-3xl font-bold cursor-pointer text-gray-300" onClick={() => router.push('/home')}>x</p><span className="text-gray-600 text-3xl font-bold cursor-pointer" onClick={() => router.push('/home')}>|</span><p className="text-3xl font-bold cursor-pointer text-gray-300" onClick={() => router.push('/home')}>World</p>
                </div>
                <div className="navbar-center">
                    
                </div>
                <div className="navbar-end">
                    {write ? 
                    <>
                        <div tabIndex={0} role="button" className="avatar dropdown dropdown-bottom dropdown-end px-3">
                            <div className="w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-1">
                                <img src={user!.photoURL!} />
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu mt-3 p-2 shadow rounded-box w-72 bg-zinc-900">
                                <li>
                                    <div tabIndex={0} role="button" className="avatar" onClick={() => router.push(`/profile/${user!.displayName!}`)}>
                                        <div className="w-24 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                            <img src={user!.photoURL!}/>
                                        </div>
                                        <h1 className="text-xl pl-3 text-gray-300">{user!.displayName!}</h1>
                                    </div>
                                </li>
                                <li>
                                    <a className="w-full" onClick={logout}>
                                        <p className="items-start justify-start text-gray-300">Logout</p>
                                        <span className="material-symbols-outlined items-end justify-end text-gray-300">logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </>
                    :
                    <>
                      {
                        isLoggedIn ? 
                        <>
                        <button className="btn btn-outline btn-warning btn-circle w-36" onClick={() => router.push(`/write`)}>Create Post</button>
                        
                        <div tabIndex={0} role="button" className="avatar dropdown dropdown-bottom dropdown-end px-3">
                            <div className="w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-1">
                                <img src={user!.photoURL!} />
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu mt-3 p-2 shadow rounded-box w-72 bg-zinc-900">
                                <li>
                                    <div tabIndex={0} role="button" className="avatar" onClick={() => router.push(`/profile/${user!.displayName!}`)}>
                                        <div className="w-24 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                            <img src={user!.photoURL!}/>
                                        </div>
                                        <h1 className="text-xl pl-3 text-gray-300">{user!.displayName!}</h1>
                                    </div>
                                </li>
                                <li>
                                    <a className="w-full" onClick={logout}>
                                        <p className="items-start justify-start text-gray-300">Logout</p>
                                        <span className="material-symbols-outlined items-end justify-end text-gray-300">logout</span>
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
        }
        </>
    )
}