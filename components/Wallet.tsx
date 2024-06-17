import { useState } from "react";
import { UserProfileType, WalletType } from "types/types"
import WalletActivity from "./WalletActivity";
import WalletAssets from "./WalletAssets";
import WalletCollections from "./WalletCollections";
import { ethers } from "ethers";
import * as bip39 from "bip39";
import { auth } from "config/firebase.config";
import { useMediaQuery } from 'react-responsive';



interface IProps {
    profile: UserProfileType
    wallet: WalletType
}

export default function Wallet ({profile, wallet}: IProps) {

    const [assetsTab, setAssetsTab] = useState<boolean>(true);
    const [collectionsTab, setCollectionsTab] = useState<boolean>(false);
    const [activityTab, setActivityTab] = useState<boolean>(false);
    const [provider, setProvider] = useState<string>("Polygon MATIC");
    const [balance, setBalance] = useState<string>("");
    const [walletValue, setWalletValue] = useState<string>("$0.00");

    const user = auth.currentUser;

    const isMobile = useMediaQuery({ maxWidth: 1224 });

    

    const switchTab = (tab: string) => {

        console.log(tab);
        

        if(tab == "1"){
            if (document) {

                (document.getElementById('walletTab1') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
                (document.getElementById('walletTab2') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
                (document.getElementById('walletTab3') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
                setAssetsTab(true);
                setCollectionsTab(false);
                setActivityTab(false);
            }
        }
        if(tab == "2"){
            if (document) {

                (document.getElementById('walletTab2') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
                (document.getElementById('walletTab1') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
                (document.getElementById('walletTab3') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
                setAssetsTab(false);
                setCollectionsTab(true);
                setActivityTab(false);
            }
        }
        if(tab == "3"){
            if (document) {

                (document.getElementById('walletTab3') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
                (document.getElementById('walletTab2') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
                (document.getElementById('walletTab1') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
                setAssetsTab(false);
                setCollectionsTab(false);
                setActivityTab(true);
            }
        }

    }

    const handler = () => {

        

    }

    const checkBalance = async (networkProvider: string) => {

        if(networkProvider === "Polygon MATIC")
        {
            const maticProvider = new ethers.JsonRpcProvider("https://polygon-rpc.com/"); // Update with appropriate Polygon (Matic) RPC URL

            const maticBalance = await maticProvider.getBalance(wallet.address);

            setBalance(ethers.formatEther(maticBalance) + " MATIC");
        }

        if(networkProvider === "Ethereum")
        {
            const ethereumProvider = ethers.getDefaultProvider("homestead");        

            const ethereumBalance = await ethereumProvider.getBalance(wallet.address);
            console.log("Ethereum Balance:", ethers.formatEther(ethereumBalance), "ETH");

            setBalance(ethers.formatEther(ethereumBalance) + " ETH");
        }
        

    }

    if(balance === "") checkBalance(provider);
    

    const getOpenNetwork = () => {

        

    }

    const getSelectedNetwork = () => {

        

    }

    const setNetwork = async (providerName: string) => {

        setProvider(providerName);
        await checkBalance(providerName);

    }

    const loginUser = () => {

        

    }

    const getWalletValue = () => {

        

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

        <div className="container flex w-full bg-zinc-900">
            <div className="flex flex-col w-full">
            <div className="w-full absolute top-2 left-2">
                <ul className="menu items-end justify-end lg:menu-horizontal bg-zinc-800 rounded-box">
                <li className="bg-zinc-800 text-gray-300">
                    <details open={false}>
                    <summary>{provider}</summary>
                    <ul className="bg-zinc-800 text-gray-300">
                        <li className="bg-zinc-800 text-gray-300"><a onClick={() => setNetwork("Ethereum")}>Ethereum</a></li>
                        <li className="bg-zinc-800 text-gray-300"><a onClick={() => setNetwork("Polygon MATIC")}>Polygon MATIC</a></li>
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
                <div className="badge badge-outline py-3 px-3">{wallet.address}</div>
                <h1 className="text-3xl pt-3">{balance}</h1>
                <h1 className="text-2xl pt-3 pb-3">{walletValue}</h1>
            </div>
            {
                isMobile ?
                
                <div className="flex flex-row px-3 py-3 gap-3">
                    <button className="btn btn-circle" title="Buy and Sell Crypto">
                        <span className="material-symbols-outlined text-xl">unknown_2</span>
                    </button>
                    <div className="flex flex-col items-center justify-center">
                    <button className="btn btn-circle" title="Send Crypto" onClick={() => { console.log("Send Crypto"); if (document) {(document.getElementById('sendCryptoModal') as HTMLFormElement).showModal();}} }>
                        <span className="material-symbols-outlined">send_money</span>
                    </button>
                    </div>
                    <button className="btn btn-circle" title="Swap Crypto" >
                        <span className="material-symbols-outlined">swap_horizontal_circle</span>
                    </button>
                    <button className="btn btn-circle" title="Add Tokens">
                        <span className="material-symbols-outlined">add_circle</span>
                    </button>
                    <div className="dropdown dropdown-end ">
                        <div tabIndex={0} role="button" className="">
                            <button className="btn btn-circle" title="More">
                                <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-52 text-gray-950 pt-3">
                            <li><a onClick={() => {if (document) {(document.getElementById('viewSeedPhraseModal') as HTMLFormElement).showModal();}} }>View Seed Phrase</a></li>
                            <li><a onClick={() => {if (document) {(document.getElementById('viewPrivateKeyModal') as HTMLFormElement).showModal();}} }>View Private Key</a></li>
                            <li><a onClick={() => {if (document) {(document.getElementById('viewPublicKeyModal') as HTMLFormElement).showModal();}} }>View Public Key</a></li>
                        </ul>
                    </div>
                </div>

                :

                <div className="flex flex-row px-[88px] py-3 gap-3">
                    <button className="btn btn-circle" title="Buy and Sell Crypto">
                        <span className="material-symbols-outlined text-xl">unknown_2</span>
                    </button>
                    <div className="flex flex-col items-center justify-center">
                    <button className="btn btn-circle" title="Send Crypto" onClick={() => { console.log("Send Crypto"); if (document) {(document.getElementById('sendCryptoModal') as HTMLFormElement).showModal();}} }>
                        <span className="material-symbols-outlined">send_money</span>
                    </button>
                    </div>
                    <button className="btn btn-circle" title="Swap Crypto" >
                        <span className="material-symbols-outlined">swap_horizontal_circle</span>
                    </button>
                    <button className="btn btn-circle" title="Add Tokens">
                        <span className="material-symbols-outlined">add_circle</span>
                    </button>
                    <div className="dropdown dropdown-end ">
                        <div tabIndex={0} role="button" className="">
                            <button className="btn btn-circle" title="More">
                                <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-52 text-gray-950 pt-3">
                            <li><a onClick={() => {if (document) {(document.getElementById('viewSeedPhraseModal') as HTMLFormElement).showModal();}} }>View Seed Phrase</a></li>
                            <li><a onClick={() => {if (document) {(document.getElementById('viewPrivateKeyModal') as HTMLFormElement).showModal();}} }>View Private Key</a></li>
                            <li><a onClick={() => {if (document) {(document.getElementById('viewPublicKeyModal') as HTMLFormElement).showModal();}} }>View Public Key</a></li>
                        </ul>
                    </div>
                </div>
            }
            <div role="tablist" className="tabs tabs-bordered pt-3 text-gray-300">
                <a id="walletTab1" role="tab" className="tab tab-active text-gray-300"  onClick={() => switchTab("1")}>Assets</a>
                <a id="walletTab2" role="tab" className="tab text-gray-300" onClick={() => switchTab("2")}>Collection</a>
                <a id="walletTab3" role="tab" className="tab text-gray-300" onClick={() => switchTab("3")}>Activity</a>
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
        <dialog id="viewSeedPhraseModal" className="modal">
            <form method="dialog" className="modal-backdrop">
                <button>Cancel</button>
            </form>
            <div className="modal-box w-full bg-zinc-900 items-center justify-center">
                <h3 className="font-bold text-lg pb-8 text-gray-300">Seed Phrase</h3>
                <input type="text" placeholder="Seed Phrase" className="input input-bordered w-full text-gray-950" value={wallet.seedPhrase}/>
            </div>
        </dialog>
        <dialog id="viewPrivateKeyModal" className="modal">
            <form method="dialog" className="modal-backdrop">
                <button>Cancel</button>
            </form>
            <div className="modal-box w-full bg-zinc-900 items-center justify-center">
                <h3 className="font-bold text-lg pb-8 text-gray-300">Private Key</h3>
                <input type="text" placeholder="Seed Phrase" className="input input-bordered w-full text-gray-950" value={wallet.privateKey}/>
            </div>
        </dialog>
        <dialog id="viewPublicKeyModal" className="modal">
            <form method="dialog" className="modal-backdrop">
                <button>Cancel</button>
            </form>
            <div className="modal-box w-full bg-zinc-900 items-center justify-center">
                <h3 className="font-bold text-lg pb-8 text-gray-300">Public Key</h3>
                <input type="text" placeholder="Seed Phrase" className="input input-bordered w-full text-gray-950" value={wallet.publicKey}/>
            </div>
        </dialog>
        <dialog id="sendCryptoModal" className="modal">
            <form method="dialog" className="modal-backdrop">
                <button>Send</button>
                <button>Cancel</button>
            </form>
            <div className="modal-box w-full bg-zinc-800 items-center justify-center">
                <h3 className="font-bold text-lg pb-8 text-gray-300">Send Crypto</h3>
                <input type="text" placeholder="Recipient Name" className="input input-bordered w-full text-gray-950" />
                <div className="pt-3"></div>
                <input type="text" placeholder="Recipient Address" className="input input-bordered w-full text-gray-950" />
                <div className="py-3">
                    <input type="text" placeholder="Amount" className="input input-bordered w-full text-gray-950" />
                </div>
                <button className="btn btn-outline btn-warning w-full">Send</button>
            </div>
        </dialog>
    </div>
    )

}