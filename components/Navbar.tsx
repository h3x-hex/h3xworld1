"use client"

import { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { PostType, UserProfileType } from 'types/types';
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getAuth, signOut } from 'firebase/auth';
import { firestore, storage } from 'config/firebase.config';
import { redirect, useRouter } from "next/navigation";
import CreatePost from '../components/CreatePost';
import Image from 'next/image';
import { hexLogo } from 'public';
import { useMediaQuery } from 'react-responsive';



interface IProps {
    write?: boolean;
}

export const Navbar = ({write}: IProps) => {

    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    if(user && !isLoggedIn) setIsLoggedIn(true);
    
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
                                        <a className="w-full">
                                            <p className="items-start justify-start text-gray-300" onClick={() => router.push(`/write`)}>Create Post</p>
                                            <span className="material-symbols-outlined items-end justify-end text-gray-300">edit_square</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="w-full">
                                            <p className="items-start justify-start text-gray-300" onClick={() => router.push(`/edit/${user!.displayName!}`)}>Edit Profile</p>
                                            <span className="material-symbols-outlined items-end justify-end text-gray-300">person_edit</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="w-full">
                                            <p className="items-start justify-start text-gray-300" onClick={() => router.push(`/settings/${user!.displayName!}`)}>Settings</p>
                                            <span className="material-symbols-outlined items-end justify-end text-gray-300">settings</span>
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
                                        <a className="w-full">
                                            <p className="items-start justify-start text-gray-300" onClick={() => router.push(`/edit/${user!.displayName!}`)}>Edit Profile</p>
                                            <span className="material-symbols-outlined items-end justify-end text-gray-300">person_edit</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="w-full">
                                            <p className="items-start justify-start text-gray-300" onClick={() => router.push(`/settings/${user!.displayName!}`)}>Settings</p>
                                            <span className="material-symbols-outlined items-end justify-end text-gray-300">settings</span>
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
                    <p className='pl-8 pt-1 text-gray-300 cursor-pointer font-bold' onClick={() => router.push('/home')}>Home</p>
                    <p className='pl-8 pt-1 text-gray-300 cursor-pointer font-bold' onClick={() => router.push(`/profile/${user?.displayName}`)}>Profile</p>
                    <p className='pl-8 pt-1 text-gray-300 cursor-pointer font-bold' onClick={() => router.push(`/profile/${user?.displayName}/chats`)}>Messages</p>
                    <p className='pl-8 pt-1 text-gray-300 cursor-pointer font-bold' onClick={() => router.push(`/store/${user?.displayName}`)}>Store</p>
                    <p className='pl-8 pt-1 text-gray-300 cursor-pointer font-bold' onClick={() => router.push(`/h3xLife/${user?.displayName}`)}>h3xLife</p>

                    <div className='pl-8'>
                        <label className="input input-bordered flex items-center gap-2 rounded-full w-88">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                            <input type="text" className="grow" placeholder="Search" />
                        </label>
                    </div>
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
                                    <a className="w-full">
                                        <p className="items-start justify-start text-gray-300" onClick={() => router.push(`/write`)}>Create Post</p>
                                        <span className="material-symbols-outlined items-end justify-end text-gray-300">edit_square</span>
                                    </a>
                                </li>
                                <li>
                                        <a className="w-full">
                                            <p className="items-start justify-start text-gray-300" onClick={() => router.push(`/edit/${user!.displayName!}`)}>Edit Profile</p>
                                            <span className="material-symbols-outlined items-end justify-end text-gray-300">person_edit</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="w-full">
                                            <p className="items-start justify-start text-gray-300" onClick={() => router.push(`/settings/${user!.displayName!}`)}>Settings</p>
                                            <span className="material-symbols-outlined items-end justify-end text-gray-300">settings</span>
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
                                    <a className="w-full">
                                        <p className="items-start justify-start text-gray-300" onClick={() => router.push(`/write`)}>Create Post</p>
                                        <span className="material-symbols-outlined items-end justify-end text-gray-300">edit_square</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="w-full">
                                        <p className="items-start justify-start text-gray-300" onClick={() => router.push(`/edit/${user!.displayName!}`)}>Edit Profile</p>
                                        <span className="material-symbols-outlined items-end justify-end text-gray-300">person_edit</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="w-full">
                                        <p className="items-start justify-start text-gray-300" onClick={() => router.push(`/settings/${user!.displayName!}`)}>Settings</p>
                                        <span className="material-symbols-outlined items-end justify-end text-gray-300">settings</span>
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
        }
        </>
    )
}