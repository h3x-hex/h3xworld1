"use client";

import { useEffect, useState } from "react";
import { BlogPostType, H3XclusivePostType, PostType, StoreCategoryType, StoreContentType, StoreProductType, UserProfileType, WalletType } from "types/types";
import BioCard from "./BioCard";
import LinkCard from "./LinkCard";
import LinkCardList from "./LinkCardList";
import { Navbar } from "./Navbar";
import Posts from "./Posts";
import ProfileCard from "./ProfileCard";
import { useRouter } from "next/navigation";
import { doc, getDoc, onSnapshot, query, collection, getDocs, documentId, where, FieldPath, setDoc } from "firebase/firestore";
import { firestore } from "config/firebase.config";
import { getAuth } from "firebase/auth";
import { ethers } from "ethers";
import * as bip39 from "bip39";
import { useMediaQuery } from "react-responsive";
import BlogPosts from "./BlogPosts";

interface IProps {
  username: string;
}

export default function Profile({ username }: IProps) {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();
  var isLoggedIn = false;

  console.log(username);

  if(user)
  {
    isLoggedIn = true;
    
  }

  const [profile, setProfile] = useState<UserProfileType>();
  const [isLoading, setIsLoading] = useState(false);

  const [posts, setPosts] = useState<PostType[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [storeContent, setStoreContent] = useState<StoreContentType[]>([]);
  const [h3XclusivePosts, setH3XclusivePosts] = useState<H3XclusivePostType[]>([]);
  const [wallet, setWallet] = useState<WalletType>();

  const [categories, setCategories] = useState<StoreCategoryType[]>([]);
  const [products, setProducts] = useState<StoreProductType[]>([]);

  var postsSs : PostType[] = []
  var blogPostsSs : BlogPostType[] = []
  var storeContentSs : StoreContentType[] = []
  var h3XclusivePostsSs : H3XclusivePostType[] = []

  const [tab, setTab] = useState<"portfolio" | "blog" | "store" | "h3Xclusive">("portfolio");

  const isMobile = useMediaQuery({ maxWidth: 1224 });

  const switchTab = (tab: string) => {

    console.log(tab);
    

    if(tab === "1"){
        if (document) {

            (document.getElementById('tab1') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
            (document.getElementById('tab2') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            (document.getElementById('tab3') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            (document.getElementById('tab4') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            setTab("portfolio");
        }
    }
    if(tab === "2"){
        if (document) {

            (document.getElementById('tab2') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
            (document.getElementById('tab1') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            (document.getElementById('tab3') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            (document.getElementById('tab4') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            setTab("blog");
        }
    }
    if(tab === "3"){
        if (document) {

            (document.getElementById('tab3') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
            (document.getElementById('tab2') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            (document.getElementById('tab1') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            (document.getElementById('tab4') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
            setTab("store");
        }
    }
    if(tab === "4"){
      if (document) {

          (document.getElementById('tab4') as HTMLFormElement).className = "tab cursor-pointer tab-active text-gray-300";
          (document.getElementById('tab2') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
          (document.getElementById('tab1') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
          (document.getElementById('tab3') as HTMLFormElement).className = "tab cursor-pointer text-gray-300";
          setTab("h3Xclusive");
      }
  }

}


  useEffect(() => {
    async function getData(username: string) {
      
      const userProfileRef = doc(firestore, `Users/${username}`);
      const walletRef = doc(firestore, `Wallets/${username}`);
      //const postRef = doc(firestore, `Users/${username}/Posts`);
      console.log(username);
      const userProfileDoc = await getDoc(userProfileRef);
      const walletDoc = await getDoc(walletRef);
      //const postsDoc = await getDoc(postRef);
      if (userProfileDoc.exists() ) 
      {
        if(walletDoc.exists())
        {
          const profileObj = { ...userProfileDoc.data() };
          setProfile(profileObj as UserProfileType);
          console.log(profileObj);
          const postRef = collection(firestore, 'Posts');
          const q = query(postRef, where('username', '==', username));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log(doc.data());
            if(postsSs.length < profileObj.postCount)
            {
              postsSs.push(doc.data() as PostType);
            }
          });
          console.log(postsSs);
          setPosts(postsSs);
          setWallet(walletDoc.data() as WalletType);

          const blogPostRef = collection(firestore, 'BlogPosts');
          const qb = query(blogPostRef, where('username', '==', username));
          const querySnapshotb = await getDocs(qb);
          querySnapshotb.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log(doc.data());
            if(blogPostsSs.length < profileObj.blogPostCount)
            {
              blogPostsSs.push(doc.data() as BlogPostType);
            }
          });
          console.log(blogPostsSs);
          setBlogPosts(blogPostsSs);

          return profile;
        }
        else{
          console.log("Wallet not found");
        }
      } 
      else 
      {
        console.log("User Not Found");
      }

    }

    async function getBlogData(username: string) {
      
        

    }

    async function getStoreData(username: string) {
      
      const postRef = collection(firestore, 'StoreContent');
      const q = query(postRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        console.log(doc.data());
        storeContentSs.push(doc.data() as StoreContentType);

      });
      console.log(storeContentSs);
      setStoreContent(storeContentSs);

    }
    async function getH3XclusiveData(username: string) {
      
      const postRef = collection(firestore, 'H3XclusivePosts');
      const q = query(postRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        console.log(doc.data());
        if(h3XclusivePostsSs.length < profile!.h3XclusivePostCount)
        {
          h3XclusivePostsSs.push(doc.data() as H3XclusivePostType);
        }
      });
      console.log(h3XclusivePostsSs);
      setPosts(h3XclusivePostsSs);

    }

    getData(username);
    
  }, []);

  const createStore = () => {

    router.push(`/store/create`);

  }

  console.log(posts);
  return (
    <>
    <Navbar/>
      <div className="bg-zinc-950 flex flex-col items-center justify-center min-h-screen">
        
        { profile && wallet ? 
          <ProfileCard profile={ profile } wallet={wallet}/>
          :
         <></>
        }
        {
          isMobile ?

          <div role="tablist" className="tabs tabs-bordered tabs-lg pb-6 text-gray-300 gap-8">
            <a id="tab1" role="tab" className="tab tab-active text-gray-300" data-tip="Portfolio" onClick={() => switchTab("1")}>
                <span className="material-symbols-outlined">photo_library</span>                        
            </a>
            <a id="tab2" role="tab" className="tab text-gray-300" data-tip="Blog" onClick={() => switchTab("2")}>
                <span className="material-symbols-outlined">contextual_token</span>                        
            </a>
            <a id="tab3" role="tab" className="tab text-gray-300" data-tip="Store" onClick={() => switchTab("3")}>
                <span className="material-symbols-outlined">storefront</span>                        
            </a>
            <a id="tab4" role="tab" className="tab text-gray-300" data-tip="h3XClusive" onClick={() => switchTab("4")}>
                <span className="material-symbols-outlined">box</span>                        
            </a>
          </div>

          :

          <div role="tablist" className="tabs tabs-bordered tabs-lg pb-6 text-gray-300 gap-24">
            <a id="tab1" role="tab" className="tab tab-active text-gray-300" onClick={() => switchTab("1")}>Portfolio</a>
            <a id="tab2" role="tab" className="tab text-gray-300" onClick={() => switchTab("2")}>Blog</a>
            <a id="tab3" role="tab" className="tab text-gray-300" onClick={() => switchTab("3")}>Store</a>
            <a id="tab4" role="tab" className="tab text-gray-300" onClick={() => switchTab("4")}>h3Xclusive</a>
          </div>
        }
        
        {
          tab === "portfolio" ?

            posts ?
  
            <div className="pt-16">
              <Posts posts={ posts }/>
            </div>
  
            :
  
            <div className="container pl-32 min-h-full bg-zinc-950">
                <div className="pb-32">
                  <p className="pl-32">No Posts yet...</p>
                  <button className="btn btn-warning" onClick={() => router.push(`/write/portfolio`)}>Create Post</button>
                </div>
            </div>
          

          :

          tab === "blog" ?

          
            blogPosts ?

              isMobile ?

                <div className="flex items-center justify-center ">
                    <BlogPosts posts={ blogPosts }/>
                </div>

              :

                <div className="flex items-center justify-center pl-44 pt-16">
                  <BlogPosts posts={ blogPosts }/>
                </div>

              :

              <div className="container pl-32 min-h-full bg-zinc-950">
                  <div className="pb-32">
                    <p className="pl-32">No Posts yet...</p>
                    <button className="btn btn-warning" onClick={() => router.push(`/write/portfolio`)}>Create Post</button>
                  </div>
              </div>
          

          :

          tab === "store" ?

          <>
            <div className="text-gray-300 pb-96 pl-32">
                <div>
                    <div className="pt-8 pb-8">
                        <p className="text-xl">Store Logo</p>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    
                </div>
                <div className="pt-8 items-center justify-center pb-8">
                    <p className="text-xl">Store Name</p>
                    <input type="text" placeholder="Store Name" className="input input-bordered w-full max-w-xs text-gray-950" />
                </div>
                <div className="">
                    <p className="text-xl">Hero Section</p>
                    <div className="flex flex-row gap-3">
                        <div className="artboard artboard-horizontal phone-6 bg-zinc-300">1024×320</div>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                </div>
                <div className="flex">
                    <div className="pt-8 flex flex-row">
                        <p className="text-xl pb-8 pr-3">Categories</p>
                        <button className="btn btn-sm btn-circle btn-outline text-gray-300 hover:bg-warning hover:text-gray-950" onClick={() => {if (document) {(document.getElementById('addCategory') as HTMLFormElement).showModal()}}}>
                            <span className="material-symbols-outlined ">add</span>
                        </button>
                    </div>
                </div>
                <div className="pt-8">
                    <div className="pt-8 flex flex-row">
                        <p className="text-xl pb-8 pr-3">Products</p>
                        <button className="btn btn-sm btn-circle btn-outline text-gray-300 hover:bg-warning hover:text-gray-950" onClick={() => {if (document) {(document.getElementById('addProduct') as HTMLFormElement).showModal()}}}>
                            <span className="material-symbols-outlined ">add</span>
                        </button>
                    </div>
                </div>
            </div>
            <dialog id="addCategory" className="modal">
                <div className="modal-box w-96 bg-zinc-900">
                    <div className="container text-gray-300 ">
                        <div className="pb-8">
                            <p className="text-xl pb-3">Category Name</p>
                            <input type="text" placeholder="Category Name" className="input input-bordered w-full max-w-xs text-gray-950" />
                        </div>

                        <div>
                            <p className="text-xl pb-3">Category Image</p>
                            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                            <img src={"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} width={128} height={128}/>
                        </div>

                        <div className="pt-8">
                            <button className="btn btn-outline btn-warning w-24 rounded-full text-gray-300 hover:bg-warning hover:text-gray-950">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <dialog id="addProduct" className="modal">
                <div className="modal-box w-full bg-zinc-900">
                    <div className="container flex flex-col text-gray-300">

                        <div className="flex flex-col">
                          <div className="pb-8">
                            <p className="text-xl pb-3">Product Image</p>
                            <input type="file" className="file-input file-input-bordered w-9/12" />
                            <img src={"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} width={128} height={128}/>
                          </div>

                          <div className="pb-8">
                            <p className="text-xl pb-3">Product Name</p>
                            <input type="text" placeholder="Product Name" className="input input-bordered w-9/12 text-gray-950" />
                          </div>

                          <div className="pb-8">
                            <p className="text-xl pb-3">Product Description</p>
                            <textarea className="textarea textarea-bordered w-9/12 h-64 resize-none text-gray-950" placeholder="Bio"></textarea>
                          </div>
                        </div>

                        <div>
                          <p className="text-xl pb-3">Product Details</p>
                          <div className="overflow-x-auto">
                            <table className="table">
                              {/* head */}
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>Name</th>
                                  <th>Job</th>
                                  <th>Favorite Color</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* row 1 */}
                                <tr>
                                  <th>1</th>
                                  <td>Cy Ganderton</td>
                                  <td>Quality Control Specialist</td>
                                  <td>Blue</td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                  <th>2</th>
                                  <td>Hart Hagerty</td>
                                  <td>Desktop Support Technician</td>
                                  <td>Purple</td>
                                </tr>
                                {/* row 3 */}
                                <tr>
                                  <th>3</th>
                                  <td>Brice Swyre</td>
                                  <td>Tax Accountant</td>
                                  <td>Red</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="pt-8">
                            <button className="btn btn-outline btn-warning w-24 rounded-full text-gray-300 hover:bg-warning hover:text-gray-950">
                                Add
                            </button>
                        </div>
                        
                        
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <div className="pt-8 pb-16">
              <button className="btn btn-outline btn-warning w-48 rounded-full text-gray-300 hover:bg-warning hover:text-gray-950">
                  Create Store
              </button>
            </div>
          </>

          : 

          tab === "h3Xclusive" ?

          <>
            
          </>

          :

          <></>
        }
        
      </div>
    </>
  );
}
