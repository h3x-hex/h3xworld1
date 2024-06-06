import { useEffect, useState } from "react";
import FriendsTab from "./FriendsTab";
import GroupsTab from "./GroupsTab";
import RequestsTab from "./RequestsTab";
import { doc, getDoc, onSnapshot, query, collection, getDocs, documentId, where, FieldPath, setDoc } from "firebase/firestore";
import { firestore } from "config/firebase.config";
import { getAuth } from "firebase/auth";
import { FollowerType, UserProfileType } from "types/types";
import { useRouter } from "next/navigation";

interface IProps {
    profile: UserProfileType
    tab: string
}

export default function Followers ({profile, tab}: IProps) {

    const [followersTab, setFollowersTab] = useState<boolean>((tab == '1'));
    const [followingTab, setFollowingTab] = useState<boolean>((tab == '2'));

    const [followers, setFollowers] = useState<FollowerType[]>([]);
    var followersArr: FollowerType[] = [];

    const [followings, setFollowings] = useState<FollowerType[]>([]);
    var followingArr: FollowerType[] = [];

    const router = useRouter();

    const switchTab = (tabNo: string) => {


        if(tabNo == "1"){
            if ((document.getElementById('followersTab') as HTMLFormElement)) {

                (document.getElementById('followersTab') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
                (document.getElementById('followingTab') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
                setFollowersTab(true);
                setFollowingTab(false);
            }
        }
        if(tabNo == "2"){
            if ((document.getElementById('followingTab') as HTMLFormElement)) {

                (document.getElementById('followingTab') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
                (document.getElementById('followersTab') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
                setFollowersTab(false);
                setFollowingTab(true);
            }
        }

    }


    

    useEffect(() => {
        async function getData(username: string) {
          
            const followerRef = collection(firestore, 'Followers');
            const followerQuery = query(followerRef, where('followName', '==', username));
            const querySnapshotFollower = await getDocs(followerQuery);
            querySnapshotFollower.forEach((doc) => {

                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                console.log(doc.data());

                if(followersArr.length < profile.followersCount)
                {
                    followersArr.push(doc.data() as FollowerType);
                }
             
            });
            setFollowers(followersArr);
            console.log(followers);
            console.log(followersArr);

            const followingQuery = query(followerRef, where('username', '==', username));
            const querySnapshotFollowing = await getDocs(followingQuery);
            querySnapshotFollowing.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                console.log(doc.data());
             
                if(followingArr.length < profile.followingCount)
                {
                    followingArr.push(doc.data() as FollowerType);
                }

            });

            setFollowings(followingArr);
            console.log(followingArr)
            
        }
        getData(profile.username);
      }, []);

    return (

        <>
            <div>
                <div role="tablist" className="tabs tabs-bordered bg-zinc-900">
                    <a id="followersTab" role="tab" className="tab cursor-pointer tab-active text-gray-300" onClick={() => switchTab("1")}>Followers</a>
                    <a id="followingTab" role="tab" className="tab cursor-pointer text-gray-300" onClick={() => switchTab("2")}>Following</a>
                </div>
                <div id="tabs_content" className="w-full">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <tbody>
                            {
                                followersTab ?
                                <>
                                {
                                    followers.length > 0 
                                    
                                    ?
        
                                    followers.map((follower) => (
                                        
                                        <tr>
                                            <td>
                                                <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push(`/profile/${follower.username}`)}>
                                                    <div className="avatar">
                                                        <div className="mask mask-circle w-12 h-12">
                                                            <img src={follower.userPhotoURL} alt="Follower Photo" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-300">{follower.username}</div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    
                                    :
        
                                    <>No Followers.</>
        
                                }
                                </>

                                :
                                    
                                <>
                                {
                                    followings.length > 0 
                                    
                                    ?
        
                                    followings.map((following) => (
                                        
                                        <tr>
                                            <td>
                                                <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push(`/profile/${following.followName}`)}>
                                                    <div className="avatar">
                                                        <div className="mask mask-circle w-12 h-12">
                                                            <img src={following.followPhotoURL} alt="Follower Photo" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-300">{following.followName}</div>
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                    
                                    :
        
                                    <>Not Following anyone.</>
        
                                }
                                </>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    )

}