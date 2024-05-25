import React from 'react'

const test = () => {
    
  return (
    <div><div className="flex flex-col relative">
    <div className="flex">
    {imagePicked ? 
        <img src={image}/> : <></>}
    </div>
    <input
        type="text"
        placeholder="Title"
        className="p-50 text-xl" 
        onChange={(e) => setTitle(e.target.value)}
    />
    <div className="flex gap-5 relative">
        <input
            type="file"
            id="image"
            accept="image/*" 
            onChange={uploadFile}
            style={{ display: "none" }}
        />
        <button>
            <span className="material-symbols-outlined">add_photo_alternate</span>
        </button>
        <ReactQuill
            className="w-full"
            theme="bubble"
            value={value}
            onChange={(eBody) => setValue(eBody.target.value)}
            placeholder="Tell your story..."
        />
        <ReactQuill
                ref={quillRef} 
                value={value}
                modules={modules}
                onChange={handleQuillChange}
                placeholder="Write your story..."
            />
    </div>
    <button className="btn btn-circle btn-outline btn-warning w-36" onClick={handleSubmit}>
        Publish
    </button>
    <button className="btn btn-outline btn-warning btn-circle w-36" onClick={()=>document.getElementById('my_modal_3').showModal()}>Create Post</button>

    </div></div>
  )
}

export default test

"use client";

import Image from "next/image";
import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { firestore, storage } from "config/firebase.config";
import { Navbar } from "components/Navbar";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const Page = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false);
    const [image, setImage] = useState<File | string>("");
    const [file, setFile] = useState<File>();
    const [imagePicked, setImagePicked] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [canSubmit, setCanSubmit] = useState<boolean>(false);
    const quillRef = useRef<ReactQuill | null>(null);
    var isLoggedIn = false;


    const imageHandler = async () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            var file: any = input && input.files ? input.files[0] : null;
            var formData = new FormData();
            formData.append("file", file);
            let quillObj = quillRef.current.getEditor();

        };
    }

    const modules = {
        toolbar: {
            container: [
                [{ font: [] }, { 'size': [] }, { 'header': [1, 2, 3, 4, 5, 6] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'header': 1 }, { 'header': 2 }, 'blockquote', 'code-block'],
                [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' },
                ],
                [{ 'direction': 'rtl' }, { 'align': [] }],
                ['link', 'image', 'clean'],
            ],
            'handlers': {
                image: imageHandler
            }
        }
    }

    if(user !== null)
    {
        isLoggedIn = true;
    }
    else {
        router.push("/");
    }

    useEffect(() => {
        const upload = () => {

        };

        file && upload();
    }, [file]);

    const conLog = () => {
        console.log(value);
    }

    const slugify = (str) =>
        str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");


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
            const uploadedFile = fileUploadRef.current.files[0];
            const cachedURL = URL.createObjectURL(uploadedFile);
            setImage(cachedURL);
            setImagePicked(true);
          };
    
          const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
            let file = event.target.files?.[0];
            if(file !== undefined)
            { 
              setFile(file);
              handleUpload();
              console.log(file);
              //uploadImageStorage(file);
            }
            else{
              alert("Choose a profile photo")
            }
          };

    const handleSubmit = async () => {

        if(!isLoggedIn) router.push('/');

        if(value === "" && title === "" && (file === null || file === undefined))
        {   
            setCanSubmit(false);
            alert("Post is empty");
        }
        else{
            setCanSubmit(true);
        }
        
        if (file !== undefined && canSubmit)
            {
                const name = new Date().getTime() + file.name;
                const storageRef = ref(storage, name);
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                        console.log("Upload is paused");
                        break;
                        case "running":
                        console.log("Upload is running");
                        break;
                    }
                    },
                    (error: any) => {},
                    () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        
                        const username = user.displayName;
                        const usersRef = doc(firestore, "Users", `${user.username}`);
                        const postsRef = doc(firestore, "Posts", `${user.username}`);

                    });
                    }
                );
            }

    };


    const slugify = (str) =>
        str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");


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
            const uploadedFile = fileUploadRef.current.files[0];
            const cachedURL = URL.createObjectURL(uploadedFile);
            setImage(cachedURL);
            setImagePicked(true);
          };
    
          const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
            let file = event.target.files?.[0];
            if(file !== undefined)
            { 
              setFile(file);
              handleUpload();
              console.log(file);
              //uploadImageStorage(file);
            }
            else{
              alert("Choose a profile photo")
            }
          };

    const handleSubmit = async () => {

        if(!isLoggedIn) router.push('/');

        if(value === "" && title === "" && (file === null || file === undefined))
        {   
            setCanSubmit(false);
            alert("Post is empty");
        }
        else{
            setCanSubmit(true);
        }
        
        if (file !== undefined && canSubmit)
            {
                const name = new Date().getTime() + file.name;
                const storageRef = ref(storage, name);
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                        console.log("Upload is paused");
                        break;
                        case "running":
                        console.log("Upload is running");
                        break;
                    }
                    },
                    (error: any) => {},
                    () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        
                        const username = user.displayName;
                        const usersRef = doc(firestore, "Users", `${username}`);
                        const postsRef = doc(firestore, "Posts", `${username}`);

                    });
                    }
                );
            }

    };


    return (
        <>
        <Navbar write={true}/>
        <div className="flex flex-col container items-center justify-center gap-6 w-full">
            <h1 className="text-3xl text-white">Create Post</h1>
            <ReactQuill
                ref={quillRef}
                className="w-full text-white px-80"
                theme="snow"
                value={value}
                modules={modules}
                onChange={setValue(value)}
                placeholder="Write your story..."
            />
            
            <button className="btn btn-circle btn-outline btn-warning w-36" onClick={conLog}>Publish</button>
        </div>
        
        </>
    );
};

export default Page;