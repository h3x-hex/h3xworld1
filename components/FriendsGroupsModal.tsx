import { useState } from "react";
import FriendsTab from "./FriendsTab";
import GroupsTab from "./GroupsTab";
import RequestsTab from "./RequestsTab";


export default function FriendsGroupsModal () {

    const [friendsTab, setFriendsTab] = useState<boolean>(true);
    const [requestsTab, setRequestsTab] = useState<boolean>(false);

    const switchTab = (tab: string) => {

        console.log(tab);

        if(tab == "1"){
            if (document) {

                (document.getElementById('tab1') as HTMLFormElement).className = "tab cursor-pointer tab-active";
                (document.getElementById('tab2') as HTMLFormElement).className = "tab cursor-pointer";
                setFriendsTab(true);
                setRequestsTab(false);
            }
        }
        if(tab == "2"){
            if (document) {

                (document.getElementById('tab2') as HTMLFormElement).className = "tab cursor-pointer tab-active";
                (document.getElementById('tab1') as HTMLFormElement).className = "tab cursor-pointer";
                setFriendsTab(false);
                setRequestsTab(true);
            }
        }

    }

    return (

        <>
            <div>
                <div role="tablist" className="tabs tabs-bordered">
                    <a id="tab1" role="tab" className="tab cursor-pointer tab-active" onClick={() => switchTab("1")}>Friends</a>
                    <a id="tab2" role="tab" className="tab cursor-pointer" onClick={() => switchTab("2")}>Requests</a>
                </div>
                {
                    friendsTab ?

                    <FriendsTab/>

                    :

                    requestsTab ?

                    <RequestsTab/>

                    :

                    <></>
                }
            </div>
        </>

    )

}