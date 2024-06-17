"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore, storage, auth } from "config/firebase.config";
import { PostType, UserProfileType } from "types/types";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { hexLogo } from "public";
import { Navbar } from "components/Navbar";



export default function CreatePost () {

    const user = auth.currentUser;
    const router = useRouter();

    console.log(user);
    if(!user)
    {
      router.push("/");
    }
    var isLoggedIn = false;

    var newPost = 
    {
        postId: "",
        userId: "",
        username: "",
        fullName: "",
        userPhotoURL: "",
        postTitle: "",
        postPreview: "",
        previewPhotoURL: "",
        commentsCount: 0,
        likesCount: 0,
        timestamp: 0,
    };

    const [username, setUsername] = useState<string>("");
    const [post, setPost] = useState<PostType>({
        postId: "",
        userId: "",
        username: "",
        fullName: "",
        userPhotoURL: "",
        postTitle: "",
        postPreview: "",
        previewPhotoURL: "",
        commentsCount: 0,
        likesCount: 0,
        timestamp: 0,
    });
    const [image, setImage] = useState<File | string>();
    const [previewImage, setPreviewImage] = useState<File>();
    const [fileExt, setFileExt] = useState<string>("png");
    const [imagePicked, setImagePicked] = useState<boolean>(false);
    const [profile, setProfile] = useState<UserProfileType>({
      id: "",
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      fullName: "",
      occupation: "",
      location: "",
      links: [],
      bio: "",
      profilePhotoURL: "",
      postCount: 0,
      blogPostCount: 0,
      h3XclusivePostCount: 0,
      friendsCount: 0,
      followersCount: 0,
      followingCount: 0,
    });

    var profileV : UserProfileType = {
      id: "",
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      fullName: "",
      occupation: "",
      location: "",
      links: [],
      bio: "",
      profilePhotoURL: "",
      postCount: 0,
      blogPostCount: 0,
      h3XclusivePostCount: 0,
      friendsCount: 0,
      followersCount: 0,
      followingCount: 0,
    };

    const fileUploadRef = useRef() as MutableRefObject<HTMLInputElement>;
    const isMobile = useMediaQuery({ maxWidth: 1224 });
    const [initState, setInitState] = useState<boolean>(true);
    const portfolioState = useState<boolean>(false);
    const blogState = useState<boolean>(false);
    
    useEffect(() => {
      async function getData(username: string) {
        const userProfileRef = doc(firestore, `Users/${username}`);
        console.log(username);
        const userProfileDoc = await getDoc(userProfileRef);
        if (userProfileDoc.exists()) 
        {
          const profileObj = { ...userProfileDoc.data() };
          profileV = profileObj as UserProfileType;
          setProfile(profileV);
          username = (profileObj.username);
          console.log(profile);
        } else 
        {
          console.log("User Not Found");
        }
      }
      if(user) getData(user!.displayName!);
    }, []);

    const handleFileChange = (eImage: React.ChangeEvent<HTMLInputElement>) => {
      if (eImage.target.files) {
          eImage.preventDefault();
        //setImage(eImage.target.files[0]);
          fileUploadRef.current.click();
      }
    };
  
    const handleUpload = async () => {
      // We will fill this out later
      handleFileChange;
      if(!fileUploadRef.current.files) return;
      const uploadedFile = fileUploadRef.current.files[0];
      setFileExt(uploadedFile?.name.split('.').pop()!)
      const cachedURL = URL.createObjectURL(uploadedFile as Blob|MediaSource);
      setImage(cachedURL);
    };

    const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
      let file = event.target.files?.[0];
      if(file !== undefined)
      { 
        setPreviewImage(file);
        setFileExt(file.name.split('.').pop()!)
        setImagePicked(true);
        handleUpload();

      }
      else {
        alert("Choose a preview image")
      }
    };

    const uploadPost = async () => {

      console.log("Upload Post")

      if(!user) return;

      const time = new Date().getTime();
      const uName = profile.username;
      const postCount = profile.postCount + 1;
      const postID =  uName + time + postCount;
      
      newPost = {
        postId: postID,
        userId: profile.id,
        username: uName,
        fullName: profile.fullName,
        userPhotoURL: profile.profilePhotoURL,
        postTitle: post.postTitle,
        postPreview: post.postPreview,
        previewPhotoURL: "",
        commentsCount: 0,
        likesCount: 0,
        timestamp: time,
      };

      setPost(newPost);

      console.log(profile);
      console.log(newPost)

      if (previewImage)
        { 
          const storageRef = ref(storage, `Posts/${postID}`);
          const uploadTask = uploadBytesResumable(storageRef, previewImage);
          uploadTask.on(
            "state_changed",
            (snapshot: { bytesTransferred: number; totalBytes: number; }) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
            },
            (error: any) => {
              alert(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
                console.log(downloadURL);
                
                newPost.previewPhotoURL = downloadURL
                setPost(newPost);
                setPost({...post, previewPhotoURL: downloadURL})

                //const userRef = doc(firestore, `Users/${username}`);
                
                const userRef = doc(firestore, `Users/${uName}`);
                const postRef = doc(firestore, `Posts/${postID}`);

                setDoc(userRef, { postCount: postCount }, { merge: true });
                setDoc(postRef, {...newPost}, { merge: true });
                
                console.log(post);

                console.log(uName);
                router.push(`/profile/${uName}`);
              });
            }
          );    
          
        }
        else 
        {
          alert("Choose a preview photo, nude previews are not preferred.");
        }
    }

    const openCreatePost = () => {
        if(document) {(document.getElementById('post_modal') as HTMLFormElement).showModal();}
    }

    const createPortfolioPost = () => {

      console.log("Portfolio")

    }

    const createBlogPost = () => {

    }
    

    
    return (

      <>
          {
            isMobile ?

            <>
                <Navbar write={true}/>
                <div className="flex w-full bg-zinc-900 items-center justify-center">
                    <div className="flex flex-col container h-screen w-full bg-zinc-900 items-center justify-center pt-16">
                        <div className="container flex flex-col w-full items-center justify-center bg-zinc-900">
                            <div className="flex flex-col w-full">
                                <div className="flex flex-col w-auto h-auto pl-8">     
                                    <div className="avatar">
                                        <div className="w-80 rounded">
                                            <img src={image as string} />
                                        </div>
                                    </div>
                                    <input type={"file"} accept="image/*" className="px-32 pt-12" onChange={uploadFile} ref={fileUploadRef}/>
                                </div>
                               
                                <div className="flex flex-col w-full px-3 pt-8 gap-3">
                                  <input type="text" onChange={(e: any) => {setPost({...post, postTitle: e.target.value})}} placeholder="Post Title" className="input input-bordered w-full text-3xl text-gray-300 bg-zinc-800 py-3"/>
                                  <textarea placeholder="Post Preview" onChange={(e: any) => {setPost({...post, postPreview: e.target.value})}} className="textarea textarea-bordered w-full h-36 text-xl text-gray-300 bg-zinc-800 resize-none"/>
                                  <div className="items-center justify-center pb-8">
                                    <button className="btn btn-circle btn-warning btn-outline w-36 px-32" onClick={uploadPost}>Publish</button>
                                  </div>
                                </div>
                            </div>
                            </div>
                        <div className="container h-24"></div>
                    </div>
                </div>
            </>

            :
            <>
            <Navbar write={true}/>
                <div className="flex w-full bg-zinc-900 items-center justify-center">
                    <div className="flex flex-col container h-screen w-full bg-zinc-900 items-center justify-center">
                        <div className="container flex flex-col w-full items-center justify-center bg-zinc-900">
                            <div className="flex flex-col w-full pl-8">
                                <div className="flex flex-row w-auto h-auto">     
                                    <div className="avatar">
                                        <div className="w-96 rounded">
                                            <img src={image as string} />
                                        </div>
                                    </div>
                                    <input type={"file"} accept="image/*" className="px-32 pt-12" onChange={uploadFile} ref={fileUploadRef}/>
                                </div>
                               
                                <div className="flex flex-col w-full  pt-8 gap-3">
                                  <input type="text" onChange={(e: any) => {setPost({...post, postTitle: e.target.value})}} placeholder="Post Title" className="input input-bordered w-full text-3xl text-gray-300 bg-zinc-800 py-3"/>
                                  <textarea placeholder="Post Preview" onChange={(e: any) => {setPost({...post, postPreview: e.target.value})}} className="textarea textarea-bordered w-full h-36 text-xl text-gray-300 bg-zinc-800 resize-none"/>
                                  <div className="">
                                    <button className="btn btn-circle btn-warning btn-outline w-36" onClick={uploadPost}>Publish</button>
                                  </div>
                                </div>
                            </div>
                            </div>
                        <div className="container h-24"></div>
                    </div>
                </div>
                </>
        }
        </>

    )
}