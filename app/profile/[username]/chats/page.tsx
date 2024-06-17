"use client"

import { Navbar } from "components/Navbar";
import { auth, firestore } from "config/firebase.config";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { database } from "config/firebase.config";
import { ChatType, MessageType } from "types/types";






export default function Page () {

    const user = auth.currentUser;
    const isMobile = useMediaQuery({ maxWidth: 1224 });

    const [userLoaded, setUserLoaded] = useState<boolean>(false);

    const [message, setMessage] = useState<string>("");

    const [userChats, setUserChats] = useState<ChatType[]>([]);
    var userChatsArr: ChatType[] = [];

    const [chatUser, setChatUser] = useState<ChatType>();

    const [userMessages, setUserMessages] = useState<MessageType[]>([]);
    var userMessagesArr: MessageType[] = [];

    if(user && !userLoaded) setUserLoaded(true);


    useEffect(() => {
        async function getData() {
        
            const chatRef = ref(database, `Users/${user?.displayName}/Chats`);
            onValue(chatRef, (snapshot) => {
                snapshot.forEach((chatSnapshot) => {
                    console.log(chatSnapshot.val());
                    userChatsArr.push(chatSnapshot.val());
                })
                setUserChats(userChatsArr);
                console.log(userChats);
                console.log(userChatsArr);
                
            });
            
 
        }
        getData();
    }, []);

    const sendMessage = (currentChat: ChatType) => {

        if(user)
        {
            console.log(message);
            const username = user?.displayName
            const timeS = new Date().getTime();
            const msgId = username! + timeS
            set(ref(database, `Chats/${currentChat.chatId}/${msgId}`), {
                username: username,
                userPhotoURL: user.photoURL,
                timestamp: timeS,
                message: message,
            });
           setMessage("");
        }

    }

    const openChat = (currentChat: ChatType) => {

        setChatUser(currentChat);
        const chatRef = ref(database, `Chats/${currentChat.chatId}`);
        onValue(chatRef, (snapshot) => {
            snapshot.forEach((chatSnapshot) => {
                console.log(chatSnapshot.val());
                userMessagesArr.push(chatSnapshot.val());
            })
           
            setUserMessages(userMessagesArr);
            console.log(userMessages);
            console.log(userMessagesArr);
        });
        

    }

    return (

        <>
            <Navbar write={false}/>
            <h1 className="text-3xl text-gray-300 pt-3 pl-3 pb-3">Messages</h1>
            <div className="flex flex-col w-full h-full bg-zinc-950 items-center justify-center pb-32">
                <div className="flex flex-row h-full w-full bg-zinc-800">
                    <div className="flex flex-col w-3/12 bg-zinc-700 text-gray-300">
                        <div className="flex flex-row bg-zinc-800 h-16 pl-3 pt-2">
                            <div className="avatar">
                                <div className="w-12 h-12 rounded-full ">
                                    <img src={user?.photoURL!} />
                                </div>
                            </div>
                            <div className="flex flex-row pt-3 pl-3">
                                <p className="text-gray-300">{user?.displayName}</p>
                                <span className="material-symbols-outlined text-gray-300 cursor-pointer">more_vert</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto bg-zinc-700">
                            <table className="table">
                                <tbody>
                                {
                                    userChats.length > 0 ?
                                    
                                    userChats.map((userChat) => (
                                        <tr>
                                            <td>
                                            <div className="flex items-center gap-3 cursor-pointer" onClick={() => openChat(userChat)}>
                                                <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={userChat.recipientPhotoURL} alt="User Photo" />
                                                </div>
                                                </div>
                                                <div>
                                                <div className="font-bold">{userChat.recipientName}</div>
                                                </div>
                                            </div>
                                            </td>
                                        </tr>
                                    ))

                                    :

                                    <></>
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {
                        chatUser ?

                        <div className="flex flex-col w-full">
                            <div className="flex flex-col w-full h-16 bg-zinc-900">
                                <div className="flex flex-row pl-3 pt-2">
                                    <div className="avatar">
                                        <div className="w-12 h-12 rounded-full ">
                                            <img src={chatUser.recipientPhotoURL} />
                                        </div>
                                    </div>
                                    <div className="flex flex-row pt-3 pl-3">
                                        <p className="text-gray-300">{chatUser.recipientName}</p>
                                        <div className=""><span className="material-symbols-outlined text-gray-300 cursor-pointer">more_vert</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-5/6 overflow-y-auto">
                                <div className="">
                                    {
                                        userMessages.length > 0 ?

                                        userMessages.map((msg) => (

                                            msg.username === user?.displayName ?

                                                <div className="chat chat-end pr-3">
                                                    <div className="chat-image avatar">
                                                        <div className="w-10 rounded-full">
                                                            <img alt="Tailwind CSS chat bubble component" src={msg.userPhotoURL} />
                                                        </div>
                                                    </div>
                                                    <div className="chat-header">
                                                        {msg.username}
                                                        <time className="text-xs opacity-50">{new Date(msg.timestamp).toLocaleTimeString("en-US")}</time>
                                                    </div>
                                                    <div className="chat-bubble text-zinc-950 bg-warning">{msg.message}</div>
                                                    <div className="chat-footer opacity-50">
                                                        Seen at 12:46
                                                    </div>
                                                </div>
                                            :

                                            <div className="chat chat-start pl-3 pt-6">
                                                <div className="chat-image avatar">
                                                    <div className="w-10 rounded-full">
                                                    <img alt="Tailwind CSS chat bubble component" src={msg.userPhotoURL} />
                                                    </div>
                                                </div>
                                                <div className="chat-header text-zinc-300">
                                                    {msg.username}
                                                    <time className="text-xs opacity-50">{new Date(msg.timestamp).toLocaleTimeString("en-US")}</time>
                                                </div>
                                                <div className="chat-bubble ">{msg.message}</div>
                                                <div className="chat-footer opacity-50 text-gray-500">
                                                    Delivered
                                                </div>
                                            </div>
                                    ))

                                    :

                                    <></>
                                    }
                                </div>
                            </div>
                            <div className="h-16 bg-zinc-950 flex flex-row w-full ">
                                <div className="pl-32 w-full pt-2">
                                    <input type="text" placeholder="Type your message here!!!" value={message} onChange={(e: any) => setMessage(e.target.value)} className="input input-bordered input-warning w-5/6 max-w-xs rounded-full "/>
                                </div>
                                <div className="pr-3 pt-2">
                                    <button className="btn btn-outline btn-warning rounded-full w-24" onClick={() => sendMessage(chatUser)}>Send</button>
                                </div>
                            </div>
                        </div>

                        :

                        <></>
                    }
                </div>
            </div>
        </>
        
    )
}