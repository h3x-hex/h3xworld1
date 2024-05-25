import { useState } from "react";
import { UserProfileType } from "types/types"
import WalletActivity from "./WalletActivity";
import WalletAssets from "./WalletAssets";
import WalletCollections from "./WalletCollections";

interface IProps {
    profile: UserProfileType
}

export default function Wallet ({profile}: IProps) {


    const [assetsTab, setAssetsTab] = useState<boolean>(true);
    const [collectionsTab, setCollectionsTab] = useState<boolean>(false);
    const [activityTab, setActivityTab] = useState<boolean>(false);

    const switchTab = (tab: string) => {

        console.log(tab);

        if(tab == "1"){
            if (document) {

                (document.getElementById('walletTab1') as HTMLFormElement).className = "tab cursor-pointer tab-active";
                (document.getElementById('walletTab2') as HTMLFormElement).className = "tab cursor-pointer";
                (document.getElementById('walletTab3') as HTMLFormElement).className = "tab cursor-pointer";
                setAssetsTab(true);
                setCollectionsTab(false);
                setActivityTab(false);
            }
        }
        if(tab == "2"){
            if (document) {

                (document.getElementById('walletTab2') as HTMLFormElement).className = "tab cursor-pointer tab-active";
                (document.getElementById('walletTab1') as HTMLFormElement).className = "tab cursor-pointer";
                (document.getElementById('walletTab3') as HTMLFormElement).className = "tab cursor-pointer";
                setAssetsTab(false);
                setCollectionsTab(true);
                setActivityTab(false);
            }
        }
        if(tab == "3"){
            if (document) {

                (document.getElementById('walletTab3') as HTMLFormElement).className = "tab cursor-pointer tab-active";
                (document.getElementById('walletTab2') as HTMLFormElement).className = "tab cursor-pointer";
                (document.getElementById('walletTab1') as HTMLFormElement).className = "tab cursor-pointer";
                setAssetsTab(false);
                setCollectionsTab(false);
                setActivityTab(true);
            }
        }

    }

    const handler = () => {

        

    }

    const checkBalance = () => {

        

    }

    const getOpenNetwork = () => {

        

    }

    const getSelectedNetwork = () => {

        

    }

    const setNetwork = () => {

        

    }

    const loginUser = () => {

        

    }

    const createUser = () => {

        

    }

    const openCreate = () => {

        

    }

    const signUp = () => {

        

    }

    const login = () => {

        

    }

    const logout = () => {

        

    }

    const openTransfer = () => {

        

    }

    const goBack = () => {

        

    }

    const openImport = () => {

        

    }

    const importGoBack = () => {

        

    }

    const openActivity = () => {

        

    }

    const openAssets = () => {

        

    }

    const goHomePage = () => {

        

    }

    const openImportModel = () => {

        

    }

    const closeImportModel = () => {

        

    }

    const addToken = () => {

        

    }

    const addAccount = () => {

        

    }

    const getAllData = () => {

        

    }

    const copyAddress = () => {

        

    }

    const changeAccount = () => {

        

    }



    return (

        <div className="container flex w-full">
            <div className="flex flex-col w-full">
            <div className="w-full absolute top-2 left-2">
                <ul className="menu items-end justify-end lg:menu-horizontal bg-base-100 rounded-box">
                <li>
                    <details open={false}>
                    <summary>Polygon Matic</summary>
                    <ul>
                        <li><a>Ethereum </a></li>
                        <li><a>Polygon Matic</a></li>
                    </ul>
                    </details>
                </li>
                </ul>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="avatar placeholder h-28 pt-3">
                    <div className="bg-neutral text-neutral-content w-24 rounded-full">
                        <img src={profile.profilePhotoURL} className="object-cover"/>
                    </div>
                </div> 
                <h3 className="font-bold text-xl pt-3">Welcome {profile.username}</h3>
                <div className="badge badge-outline py-3 px-3">0x6c67Ebf96BA059E33C205A5f993F32627bd27055</div>
                <h1 className="text-3xl pt-3">8008.135 MATIC</h1>
                <h1 className="text-2xl pt-3 pb-3">$8008.5</h1>
            </div>
            <div className="flex flex-row px-[88px] py-3 gap-3">
            <button className="btn btn-circle" title="Buy and Sell Crypto">
                <span className="material-symbols-outlined text-xl">unknown_2</span>
            </button>
            <div className="flex flex-col items-center justify-center">
            <button className="btn btn-circle" title="Send Crypto">
                <span className="material-symbols-outlined">send_money</span>
            </button>
            </div>
            <button className="btn btn-circle" title="Swap Crypto">
                <span className="material-symbols-outlined">swap_horizontal_circle</span>
            </button>
            <button className="btn btn-circle" title="Add Tokens">
                <span className="material-symbols-outlined">add_circle</span>
            </button>
            <button className="btn btn-circle" title="More">
                <span className="material-symbols-outlined">more_horiz</span>
            </button>
            </div>
            <div role="tablist" className="tabs tabs-bordered pt-3">
                <a id="walletTab1" role="tab" className="tab tab-active"  onClick={() => switchTab("1")}>Assets</a>
                <a id="walletTab2" role="tab" className="tab" onClick={() => switchTab("2")}>Collection</a>
                <a id="walletTab3" role="tab" className="tab" onClick={() => switchTab("3")}>Activity</a>
            </div>
            <div id="tabs_content" className="w-full">
                
            {
                assetsTab ?

                <WalletAssets profile={profile}/>

                :

                collectionsTab ?

                <WalletCollections/>

                :

                activityTab ?

                <WalletActivity/>

                :

                <></>

            }
            </div>
        </div>
    </div>
    )

}