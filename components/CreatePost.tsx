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
      friends: [],
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
      friends: [],
    };
    const fileUploadRef = useRef() as MutableRefObject<HTMLInputElement>;
    
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
      const cachedURL = URL.createObjectURL(uploadedFile as Blob|MediaSource);
      setImage(cachedURL);
    };

    const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
      let file = event.target.files?.[0];
      if(file !== undefined)
      { 
        setPreviewImage(file);
        setImagePicked(true);
        handleUpload();
        console.log(image);
        console.log(profile);
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

    
    return (

        <>
            
                <div className="flex h-auto w-auto">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute top-8 right-52">✕</button>
                    <button className="btn btn-circle btn-warning btn-outline w-36 absolute bottom-8 right-52" onClick={uploadPost}>Publish</button>
                    </form>
                    <div className="flex flex-col container w-full bg-zinc-950">
                        <div className="container flex flex-col w-full py-12 items-start justify-start bg-zinc-950">
                            <div className="flex flex-col w-full h-96 px-48 pl-20 ">
                                <div className="flex flex-row">     
                                    <div className="avatar placeholder h-36 w-40">
                                    <div className="bg-neutral text-neutral-content w-64 rounded">
                                        {imagePicked ? <img src={image as string}/> : <span className="text-3xl px-3">Post Preview Image</span>}
                                    </div>
                                    </div> 
                                    <input type={"file"} accept="image/*" className="pr-32 pt-12" onChange={uploadFile} ref={fileUploadRef}/>
                                </div>
                                <div className="flex flex-col w-[600px] pt-8 gap-3">
                                  <input type="text" onChange={(e: any) => {setPost({...post, postTitle: e.target.value})}} placeholder="Post Title" className="input input-bordered w-full text-3xl bg-zinc-950 py-3"/>
                                  <textarea placeholder="Post Preview" onChange={(e: any) => {setPost({...post, postPreview: e.target.value})}} className="textarea textarea-bordered w-full h-36 text-xl bg-zinc-950 resize-none"/>
                                </div>
                            </div>
                            </div>
                        <div className="container h-24"></div>
                    </div>
                </div>
        </>

    )
}