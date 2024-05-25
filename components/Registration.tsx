"use client"

import { useAuth } from "context/AuthContext";
import { ChangeEvent, useRef, useState } from "react";
import { UserRegistrationType } from "types/types";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firestore, storage } from "config/firebase.config";
import {useRouter} from "next/navigation";


export default function Registration() :JSX.Element {

    const { signUp } = useAuth();
    const auth = getAuth();
    const router = useRouter();
    
    const [data, setData] = useState<UserRegistrationType>({
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
        postCount: 0,
      });

      const [password, setPassword] = useState("");
      const [link, setLink] = useState<string[]>([]);
      const [imagePicked, setImagePicked] = useState<boolean>(false);
      const [profilePhoto, setProfilePhoto] = useState<File>();
      const [image, setImage] = useState<File | string>("https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg");
      const fileUploadRef = useRef(null);
      const [buyCard, setBuyCard] = useState<boolean>(false);


      const handleFileChange = (eImage: React.ChangeEvent<HTMLInputElement>) => {
        if (eImage.target.files) {
            eImage.preventDefault();
          //setImage(eImage.target.files[0]);
            fileUploadRef.current.click();
        }
      };
    
      const handleUpload = async () => 
      {
        // We will fill this out later
        handleFileChange;
        const uploadedFile = fileUploadRef.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setImage(cachedURL);
      };

      const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        let file = event.target.files?.[0];
        if(file !== undefined)
        { 
          setProfilePhoto(file);
          setImagePicked(true);
          handleUpload();
          console.log(image);
          //uploadProfilePhoto(file);
        }
        else{
          alert("Choose a profile photo")
        }
      };


      const userLogin = () => {

        console.log(data);

      }

      const canSetUsername = async () => {
        const docRef = doc(firestore, "Users", `${data.username}`);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          alert("Username already taken. Choose a different Username");
          return false;
        } else {
          // docSnap.data() will be undefined in this case
          return true;
        }
      };
    
      const canSetEmail = async () => {
        const docRef = doc(firestore, "Emails", `${data.email}`);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          alert("Email already in use. Use a different Email");
          return false;
        } else {
          // docSnap.data() will be undefined in this case
          return true;
        }
      };
    
      const setUserProfile = async (user: any) => {
        const uid = user.user.uid;
        if (uid) {

            console.log(uid);
            const usersRef = doc(firestore, "Users", `${data.username}`);        
        if (image)
        { 
          const storageRef = ref(storage, `Users/${data.username}`);
          const uploadTask = uploadBytesResumable(storageRef, profilePhoto);
          var photoURL = "";
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
                photoURL = downloadURL;
                console.log(photoURL);
                console.log(link);

                setDoc(usersRef, data);
                setDoc(usersRef, { id: uid, profilePhotoURL: photoURL, links:link, posts: [] }, { merge: true });

                updateProfile(auth.currentUser, {
                  displayName: data.username, photoURL: photoURL
                }).then(() => {
                  // Profile updated!
                  // ...
                  router.push(`/profile/${data.username}`);
                  setBuyCard(true);
                }).catch((error: any) => {
                  // An error occurred
                  // ...
                });
              });
            }
          );          
        }
      }
    }
    
          
      const userRegister = async () => {

        setData({...data, links: link})
        setData({...data, fullName: `${data.firstName} ${data.lastName}`})

        console.log(data);

        const { id, postCount, ...allData } = data;
        // Disable submit button until all fields are filled in
        const canSubmit = [...Object.values(allData)].every(Boolean);

        if (canSubmit)
        {
          
            try {
                if (await canSetEmail()) {
                  if (await canSetUsername()) {
                        const user = await signUp(data.email, password);
                        if(user)
                        {
                          await setUserProfile(user);
                        }
                  }
                }
            } catch (error: any) {
                console.log(error.message);
            }
        }
        else 
        {
          alert("Fill all the required details.")
        }
        console.log(data);
      }

    return(
        <>
        {
          buyCard ?

          <></>

          :

          <div className="flex w-full justify-center items-center gap-4  bg-gradient-to-b from-[#101010] to-[#1d1d1d]">
            <div className="flex flex-col gap-4 py-12">
                <div className="flex flex-row gap-4 sm:grid-cols-2 md:gap-8 items-center py-12">
                    <div className="avatar gap-4">
                        <div className="w-24 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                            <img src={image} width={256} height={256}/>
                        </div>
                    </div>

                    <input 
                        type="file" 
                        accept="image/*" 
                        className="file-input file-input-bordered w-full max-w-xs pl-60px" 
                        onChange={uploadFile} 
                        ref={fileUploadRef}
                    />
                </div>

                <div className="flex flex-row gap-4 sm:grid-cols-2 md:gap-8">
                    <input 
                        type="text" 
                        className="input input-bordered w-50"
                        placeholder="First Name"
                        required
                        onChange={(e: any) => {
                            setData({
                            ...data,
                            firstName: e.target.value,
                            });
                        }}
                    />

                    <input 
                        type="text"
                        className="input input-bordered w-50"
                        placeholder="Last Name"
                        required
                        onChange={(e: any) => {
                            setData({
                            ...data,
                            lastName: e.target.value,
                            });
                        }}
                    />

                </div>
                    
                <input 
                        type="text" 
                        className="input input-bordered w-100"
                        placeholder="Email"
                        required
                        onChange={(e: any) => {
                            setData({
                            ...data,
                            email: e.target.value,
                            });
                        }}
                    />

                    <input 
                        type="text" 
                        className="input input-bordered w-100"
                        placeholder="Username"
                        required
                        onChange={(e: any) => {
                            setData({
                            ...data,
                            username: e.target.value,
                            });
                        }}
                    />
                    <input 
                        type="password" 
                        className="input input-bordered w-100"
                        placeholder="Password"
                        required
                        onChange={(e: any) => {
                            setPassword(e.target.value);
                        }}
                    />
                
                

                <div className="flex flex-row gap-4 sm:grid-cols-2 md:gap-8">
                    
                    <input 
                        type="text" 
                        className="input input-bordered w-50"
                        placeholder="Location"
                        required
                        onChange={(e: any) => {
                            setData({
                            ...data,
                            location: e.target.value,
                            });
                        }}
                    />

                    <input 
                        type="text"
                        className="input input-bordered w-50"
                        placeholder="Occupation"
                        required
                        onChange={(e: any) => {
                            setData({
                            ...data,
                            occupation: e.target.value,
                            });
                        }}
                    />

                </div>

                <div className="flex flex-col gap-4" id="links">
                    <input 
                        type="text" 
                        id="0"
                        className="input input-bordered w-200"
                        placeholder="Add Link"
                        onChange={(e: any) => {
                            setLink(link => [...link, e.target.value]);
                        }}
                    />
                    <input 
                        type="text" 
                        id="1"
                        className="input input-bordered w-200"
                        placeholder="Add Additional Link"
                        onChange={(e: any) => {
                            setLink(link => [...link, e.target.value]);
                        }}
                    />
                    <input 
                        type="text" 
                        id="2"
                        className="input input-bordered w-200"
                        placeholder="Add Additional Link"
                        onChange={(e: any) => {
                            setLink(link => [...link, e.target.value]);
                        }}
                    />
                </div>
                
                <textarea 
                        className="textarea textarea-bordered w-100 h-60 resize-none"
                        placeholder="Bio"
                        required
                        maxLength={256}
                        onChange={(e: any) => {
                            setData({
                            ...data,
                            bio: e.target.value,
                            });
                        }}
                    />

                <button className="btn btn-outline btn-warning" onClick={userRegister}>Next</button>
                <div className="divider divider-warning"></div>
                <button className="btn btn-outline btn-warning" onClick={userLogin}>Login</button>
            </div>
        </div>
        }
        </>
    );
}