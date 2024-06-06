import { useEffect, useState } from "react";
import FriendsTab from "./FriendsTab";
import GroupsTab from "./GroupsTab";
import RequestsTab from "./RequestsTab";
import { collection, deleteDoc, doc, getDocs, increment, or, query, setDoc, updateDoc, where } from "firebase/firestore";
import { firestore } from "config/firebase.config";
import { FriendsType, UserProfileType } from "types/types";
import { auth } from "../config/firebase.config";
import { useMediaQuery } from 'react-responsive';



interface IProps {
    profile: UserProfileType
}

export default function FriendsGroupsModal ({ profile }: IProps) {

    const [friendsTab, setFriendsTab] = useState<boolean>(true);
    const [requestsTab, setRequestsTab] = useState<boolean>(false);
    const [requestedTab, setRequestedTab] = useState<boolean>(false);

    const [friends, setFriends] = useState<FriendsType[]>([]);
    var friendsArr: FriendsType[] = [];

    const [requests, setRequests] = useState<FriendsType[]>([]);
    var requestsArr: FriendsType[] = [];

    const [requested, setRequested] = useState<FriendsType[]>([]);
    var requestedArr: FriendsType[] = [];

    const user = auth.currentUser;

    const isMobile = useMediaQuery({ maxWidth: 1224 });

    const switchTab = (tab: string) => {

        console.log(tab);

        if(tab == "1"){
            if (document) {

                (document.getElementById('tab1') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
                (document.getElementById('tab2') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
                (document.getElementById('tab3') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
                setFriendsTab(true);
                setRequestsTab(false);
                setRequestedTab(false);
            }
        }
        if(tab == "2"){
            if (document) {

                (document.getElementById('tab2') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
                (document.getElementById('tab1') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
                (document.getElementById('tab3') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
                setFriendsTab(false);
                setRequestsTab(true);
                setRequestedTab(false);
            }
        }
        if(tab == "3"){
            if (document) {

                (document.getElementById('tab3') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
                (document.getElementById('tab2') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
                (document.getElementById('tab1') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
                setFriendsTab(false);
                setRequestsTab(false);
                setRequestedTab(true);
            }
        }

    }

    const confirmRequest = (request: FriendsType) => {

        const timestamp = new Date().getTime()
        const friendId1 = `${request.username}${timestamp}`
        const friendRef1 = doc(firestore, 'Friends', friendId1);
        setDoc(friendRef1,  {
            username: request.username,
            userPhotoURL: request.userPhotoURL,
            friendName: request.friendName,
            friendPhotoURL: request.friendPhotoURL,
            dateAdded: timestamp,
            friendId: friendId1
        });

        const friendId2 = `${request.friendName}${timestamp}`
        const friendRef2 = doc(firestore, 'Friends', friendId2);
        setDoc(friendRef2,  {
            username: request.friendName,
            userPhotoURL: request.friendPhotoURL,
            friendName: request.username,
            friendPhotoURL: request.userPhotoURL,
            dateAdded: timestamp,
            friendId: friendId2
        });

        deleteDoc(doc(firestore, 'Requests', request.friendId));

        const userRef = doc(firestore, 'Users', `${request.username}`)
        updateDoc(userRef, {friendsCount: increment(1)});

        const userRef1 = doc(firestore, 'Users', `${request.friendName}`)
        updateDoc(userRef1, {friendsCount: increment(1)});

        console.log(requestedArr);
        //Find and delete from requests and add to friends and set states
        requestsArr.forEach((obj, index) => {
            if(obj.username === request.username && obj.friendName === request.friendName)
            {
                requestsArr.splice(index, 1);
                friendsArr.push(obj);
            }
            //if(val === request){requestedArr.delete(val)}
            //friendsArr.push(val);
        })
        console.log(requestsArr);
        console.log(friendsArr);

        setRequests(requestsArr);
        setFriends(friendsArr);

    }

    const cancelRequest = (request: FriendsType) => {

        deleteDoc(doc(firestore, 'Requests', request.friendId));

        //Find and delete from requests
        requestsArr.forEach((obj, index) => {
            if(obj === request){requestedArr.splice(index, 1)}
        })
        console.log(requestsArr);

    }

    const removeFriend = (friend: FriendsType) => {

        deleteDoc(doc(firestore, 'Friends', `${friend.username}${friend.dateAdded}`));
        deleteDoc(doc(firestore, 'Friends',`${friend.friendName}${friend.dateAdded}`));

        const userRef = doc(firestore, 'Users', `${friend.username}`)
        updateDoc(userRef, {friendsCount: increment(-1)});
        
        const userRef1 = doc(firestore, 'Users', `${friend.friendName}`)
        updateDoc(userRef1, {friendsCount: increment(-1)});

        friends.forEach((obj, index) => {
            if(obj === friend){friendsArr.splice(index, 1)}
            friendsArr.push(obj);
        })
        console.log(requestsArr);
        console.log(friendsArr);
        setFriends(friendsArr);
    }

    const containsObject = (obj: FriendsType, list: FriendsType[]) => {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i]?.username === obj.username && list[i]?.friendName === obj.friendName) {
                return true;
            }
        }
    
        return false;
    }

    useEffect(() => {
        async function getData(username: string) {

            const requestRef = collection(firestore, 'Requests');
            const requestQuery = query(requestRef, or(where('username', '==', username), where('friendName', '==', username)));
            const querySnapshotRequest = await getDocs(requestQuery);
            querySnapshotRequest.forEach((doc) => {

                // doc.data() is never undefined for query doc snapshots
                const requestDoc = doc.data() as FriendsType;
                
                if(!containsObject(requestDoc, requests))
                {
                    if(requestDoc.username === username)
                    {
                        requestedArr.push(requestDoc);
                    }
    
                    else if(requestDoc.friendName === username)
                    {
                        requestsArr.push(requestDoc);
                    }
                }
             
            });

            const friendRef = collection(firestore, 'Friends');
            const friendQuery = query(friendRef, where('username', '==', username));
            const querySnapshotFriend = await getDocs(friendQuery);
            querySnapshotFriend.forEach((doc) => {

                // doc.data() is never undefined for query doc snapshots
                const friendDoc = doc.data() as FriendsType;

                if(friendsArr.length < profile.friendsCount)
                {
                    friendsArr.push(friendDoc);
                }
             
            });

            setFriends(friendsArr);
            setRequests(requestsArr);
            setRequested(requestedArr);
            console.log(username);
            console.log(friends);
            console.log(friendsArr);
            console.log(requests);
            console.log(requestsArr);
        }
        getData(profile.username);
      }, []);

    return (

        <>
            <div className="w-full items-center justify-center">
                <div role="tablist" className="tabs tabs-bordered bg-zinc-900">
                    <a id="tab1" role="tab" className="tab cursor-pointer tab-active text-gray-300" onClick={() => switchTab("1")}>Friends</a>
                    <a id="tab2" role="tab" className="tab cursor-pointer text-gray-300" onClick={() => switchTab("2")}>Requests</a>
                    <a id="tab3" role="tab" className="tab cursor-pointer text-gray-300" onClick={() => switchTab("3")}>Requested</a>
                </div>
                {
                    friendsTab ?

                    <>
                        <div className="">
                            <table className="table">
                                <tbody>
                                {/* row 1 */}

                                    {friends.map((friend) => (

                                        <tr>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-circle w-12 h-12">
                                                            <img src={friend.userPhotoURL} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-300">{friend.username}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex flex-row pl-32 gap-6 pr-32">
                                                    {
                                                        !isMobile ?
                                                        
                                                        <>
                                                            <p className="pt-3">Date Added: {(new Date(friend.dateAdded)).toString().substring(4, 15)}</p>
                                                            <div className=""><button className="btn btn-circle btn-error px-3" onClick={() => removeFriend(friend)}><span className="material-symbols-outlined">cancel</span></button></div>
                                                        </>

                                                        : 

                                                        <>
                                                            <div className="pr-8"><button className="btn btn-circle btn-error px-3" onClick={() => removeFriend(friend)}><span className="material-symbols-outlined">cancel</span></button></div>
                                                        </>
                                                    }
                                                    
                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>  
                    </> 

                    :

                    requestsTab ?

                        <>
                            <div className="">
                                <table className="table">
                                    <tbody>
                                    {/* row 1 */}
                                        
                        

                            {requests.map((request) => (

                                <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={request.userPhotoURL} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-gray-300">{request.username}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <th>
                                        <div className="flex flex-row pl-32 gap-8">
                                            <div className=""><button className="btn btn-circle btn-success px-3" onClick={() => confirmRequest(request)}><span className="material-symbols-outlined text-xl">check_circle</span></button></div>
                                            <div className=""><button className="btn btn-circle btn-error px-3" onClick={() => cancelRequest(request)}><span className="material-symbols-outlined">cancel</span></button></div>
                                        </div>
                                    </th>
                                </tr>
                            ))}

                                </tbody>
                                </table>
                            </div>  
                        </> 

                    :

                    requestedTab ?

                    <>
                        <div className="">
                            <table className="table">
                                <tbody>
                                    {requested.map((requeste) => (

                                        <tr>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-circle w-12 h-12">
                                                            <img src={requeste.friendPhotoURL} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-300">{requeste.friendName}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <th>
                                                <p>Requested: {requeste.dateAdded}</p>
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>  
                    </> 

                    :

                    <></>
                }
            </div>
        </>
        

    )

}