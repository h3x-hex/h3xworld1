import { useEffect, useState } from "react";
import FriendsTab from "./FriendsTab";
import GroupsTab from "./GroupsTab";
import RequestsTab from "./RequestsTab";
import { doc, getDoc, onSnapshot, query, collection, getDocs, documentId, where, FieldPath, setDoc } from "firebase/firestore";
import { firestore } from "config/firebase.config";
import { getAuth } from "firebase/auth";
import { FollowerType, UserProfileType } from "types/types";

interface IProps {
    profile: UserProfileType
}

export default function Following ({profile}: IProps) {

    const [friendsTab, setFriendsTab] = useState<boolean>(true);
    const [requestsTab, setRequestsTab] = useState<boolean>(false);
    const [followers, SetFollowers] = useState<FollowerType>();
    var followersArr: FollowerType[] = [];

    const switchTab = (tab: string) => {

        console.log(tab);

        if(tab == "1"){
            if (document) {

                (document.getElementById('tab1') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
                (document.getElementById('tab2') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
                setFriendsTab(true);
                setRequestsTab(false);
            }
        }
        if(tab == "2"){
            if (document) {

                (document.getElementById('tab2') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
                (document.getElementById('tab1') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
                setFriendsTab(false);
                setRequestsTab(true);
            }
        }

    }

    useEffect(() => {
        async function getData(username: string) {
          
            const postRef = collection(firestore, 'Followers');
            const followingQuery = query(postRef, where('username', '==', username));
            const querySnapshotFollowing = await getDocs(followingQuery);
            querySnapshotFollowing.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              console.log(doc.data());
             
            });
    
        }
        getData(profile.username);
      }, []);

    return (

        <>
            <div>
                <div role="tablist" className="tabs tabs-bordered bg-zinc-900">
                    <a id="tab1" role="tab" className="tab cursor-pointer tab-active text-gray-300" onClick={() => switchTab("1")}>Friends</a>
                    <a id="tab2" role="tab" className="tab cursor-pointer text-gray-300" onClick={() => switchTab("2")}>Requests</a>
                </div>

                <FriendsTab/>

            </div>
        </>

    )

}