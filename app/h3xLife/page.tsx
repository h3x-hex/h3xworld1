"use client"

import { Navbar } from 'components/Navbar'
import { auth, firestore } from 'config/firebase.config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { defineHex, Grid, rectangle } from 'honeycomb-grid'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';


export default function Page () {

    const user = auth.currentUser;
    const router = useRouter();

    const [tab, setTab] = useState<"home" | "todo" | "notes" | "fitness" | "diet" | "finance" | "calendar">("home");
    const [todo, setTodoName] = useState<string>("");

    
    

    const addTodo = () => {

        const toDoRef = doc(firestore, "ToDo", `${user?.displayName}`);
        setDoc(toDoRef, {todo}, {merge: true});

    }



    

    

    return (
        <>
            <Navbar/>
            <div className='flex flex-row text-gray-300'>
            {
                tab === "home" ?

                <ul className="menu bg-zinc-800 w-2/12 h-screen text-gray-300 ">
                    <div className='flex flex-row gap-20 pt-3'>
                        <span className="material-symbols-outlined cursor-pointer" onClick={() => user ? router.push(`/profile/${user.displayName}`) : router.push(`/home`)}>arrow_back_ios</span>
                        <p className='text-xl font-bold'>h<span className='text-warning'>3</span>xLife</p>
                    </div>
                    <div className="divider divider-warning"></div>
                    <li className=''>
                        <a onClick={() => setTab("todo")}>
                        <span className="material-symbols-outlined">fact_check</span>
                        To Do
                        </a>
                    </li>
                    <div className="divider divider-warning"></div>
                    <li>
                        <a onClick={() => setTab("notes")}>
                        <span className="material-symbols-outlined">book_2</span>
                        Notes
                        </a>
                    </li>
                    <div className="divider divider-warning"></div>
                    <li>
                        <a onClick={() => setTab("fitness")}>
                        <span className="material-symbols-outlined">exercise</span>
                        Fitness
                        </a>
                    </li>
                    <div className="divider divider-warning"></div>
                    <li>
                        <a onClick={() => setTab("diet")}>
                        <span className="material-symbols-outlined">restaurant</span>
                        Diet
                        </a>
                    </li>
                    <div className="divider divider-warning"></div>
                    <li>
                        <a onClick={() => setTab("finance")}>
                        <span className="material-symbols-outlined">account_balance</span>
                        Finance
                        </a>
                    </li>
                    <div className="divider divider-warning"></div>
                    <li>
                        <a onClick={() => setTab("calendar")}>
                        <span className="material-symbols-outlined">calendar_month</span>
                        Calendar
                        </a>
                    </li>
                    <div className="divider divider-warning"></div>
                </ul>

                : 

                tab === "todo" ?

                
                    <ul className="menu bg-zinc-800 w-2/12 h-screen text-gray-300 ">
                        <div className='flex flex-row gap-20 pt-3 pl-3'>
                            <span className="material-symbols-outlined cursor-pointer pt-1" onClick={() => setTab("home")}>arrow_back_ios</span>
                            <p className='text-xl font-bold pt-1'>To Do</p>
                            <button className="btn btn-circle btn-sm btn-outline btn-warning hover:bg-warning hover:text-gray-950" onClick={() => {if (document) {(document.getElementById('addTodo') as HTMLFormElement).showModal();}}}>
                                <span className="material-symbols-outlined">add</span>
                            </button>
                        </div>
                        <div className="divider divider-warning"></div>
                    <li className='pt-3'>
                        <a onClick={() => setTab("todo")}>
                        <span className="material-symbols-outlined">fact_check</span>
                        To Do
                        </a>
                    </li>
                    <div className="divider divider-warning"></div>
                    
                </ul>

                :

                tab === "notes" ?

                <ul className="menu bg-zinc-800 w-2/12 h-screen text-gray-300 ">
                    <div className='flex flex-row gap-24 pt-3'>
                            <span className="material-symbols-outlined cursor-pointer" onClick={() => setTab("home")}>arrow_back_ios</span>
                            <p className='text-xl font-bold'>Notes</p>
                        </div>
                        <div className="divider divider-warning"></div>
                    <li className='pt-3'>
                        <a onClick={() => setTab("notes")}>
                        <span className="material-symbols-outlined">fact_check</span>
                        Notes
                        </a>
                    </li>
                    <div className="divider divider-warning"></div>
                </ul>

                :

                tab === "fitness" ?

                <ul className="menu bg-zinc-800 w-2/12 h-screen text-gray-300 ">
                    <div className='flex flex-row gap-24 pt-3'>
                            <span className="material-symbols-outlined cursor-pointer" onClick={() => setTab("home")}>arrow_back_ios</span>
                            <p className='text-xl font-bold'>Fitness</p>
                        </div>
                        <div className="divider divider-warning"></div>
                    <li className='pt-3'>
                        <a onClick={() => setTab("fitness")}>
                        <span className="material-symbols-outlined">fact_check</span>
                        Fitness
                        </a>
                    </li>
                    <div className="divider divider-warning"></div>
                    
                </ul>
                :

                tab === "diet" ?

                <ul className="menu bg-zinc-800 w-2/12 h-screen text-gray-300 ">
                    <div className='flex flex-row gap-24 pt-3'>
                            <span className="material-symbols-outlined cursor-pointer" onClick={() => setTab("home")}>arrow_back_ios</span>
                            <p className='text-xl font-bold'>Diet</p>
                        </div>
                        <div className="divider divider-warning"></div>
                    <li className='pt-3'>
                        <a onClick={() => setTab("diet")}>
                        <span className="material-symbols-outlined">fact_check</span>
                        Diet
                        </a>
                    </li>
                    <div className="divider divider-warning"></div>
                    
                </ul>

                :

                tab === "finance" ?

                <ul className="menu bg-zinc-800 w-2/12 h-screen text-gray-300 ">
                    <div className='flex flex-row gap-24 pt-3'>
                            <span className="material-symbols-outlined cursor-pointer" onClick={() => setTab("home")}>arrow_back_ios</span>
                            <p className='text-xl font-bold'>Finance</p>
                        </div>
                        <div className="divider divider-warning"></div>
                    <li className='pt-3'>
                        <a onClick={() => setTab("finance")}>
                        <span className="material-symbols-outlined">fact_check</span>
                        Finance
                        </a>
                    </li>
                    <div className="divider divider-warning"></div>
                    
                </ul>

                : 

                tab === "calendar" ?

                <ul className="menu bg-zinc-800 w-2/12 h-screen text-gray-300 ">
                    <div className='flex flex-row gap-20 pt-3'>
                            <span className="material-symbols-outlined cursor-pointer" onClick={() => setTab("home")}>arrow_back_ios</span>
                            <p className='text-xl font-bold'>Calendar</p>
                            
                        </div>
                        <div className="divider divider-warning"></div>
                    <li className='pt-3'>
                        <a onClick={() => setTab("todo")}>
                        <span className="material-symbols-outlined">fact_check</span>
                        Calendar
                        </a>
                    </li>
                    <div className="divider divider-warning"></div>
                    
                </ul>

                : 

                <></>
            }

            {
                tab === "todo" ?

                
                    todo !== "" ?
                    
                    <div className='h-48 bg-zinc-900'>
                        <p className='text-3xl'>{todo}</p>
                        <button className="btn btn-circle btn-sm btn-outline btn-warning hover:bg-warning hover:text-gray-950" onClick={() => {if (document) {(document.getElementById('addTodo') as HTMLFormElement).showModal();}}}>
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>

                    :

                    <></>
                

                :

                tab === "notes" ?

                <p>Journal</p>

                :

                tab === "fitness" ?

                <p>Fitness</p>

                :

                tab === "diet" ?

                <p>Diet</p>

                :

                tab === "finance" ?

                <p>Finance</p>

                :

                tab === "calendar" ?

                <p>Calendar</p>

                :

                <></>
            }    
        
            </div>
            
            <dialog id="addTodo" className="modal">
                <div className="modal-box h-auto bg-zinc-900">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <button className="btn btn-circle btn-warning btn-outline w-36 absolute bottom-3 left-6" onClick={addTodo}>Add</button>
                    </form>
                    <h3 className="font-bold text-lg text-gray-300">Add New List</h3>
                    <div className="flex flex-row pt-3 pb-12">
                    <input
                        type="text"
                        placeholder="To Do List Name"
                        className="input input-bordered input-warning w-full max-w-xs" 
                        onChange={(e: any) => {
                            setTodoName(e.target.value);
                        }}
                        />
                    </div>
                </div>
            </dialog>
        </>
    )
}