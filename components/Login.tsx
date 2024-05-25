"use client"
import { useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { File } from "buffer";
import { useAddress, useEmbeddedWallet } from "app/thirdweb";


export default function Login ()  {

    const [loginEmail, setLoginEmail] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [occupation, setOccupation] = useState<string>("");
    const [link1, setLink1] = useState<string>("");
    const [link2, setLink2] = useState<string>("");
    const [link3, setLink3] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [image, setImage] = useState<File | string>("https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg");
    const [state, setState] = useState<"init" | "login" | "register" | "sending_email" | "email_verification" | "verified" | "verifying">("login");
    const [verificationCode, setVerificationCode] = useState<string>("");
    const { connect, sendVerificationEmail } = useEmbeddedWallet();
    const fileUploadRef = useRef(null);
    const router = useRouter();
    const address = useAddress();

    const userRegister = () => {
        router.push('/register');
    }

    const userLogin = () => {
        setState("login");
    }

    const enterSite = () => {
        console.log("Site Entered");
        if (state === "login")
        {
            console.log(state);
            handleEmailEntered;
        }
        else if (state === "verified"){
            console.log("VERIFIED3");

            router.push(`/profile/${loginEmail}`)
        }
       
    }

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
      };

      const handleEmailEntered = async () => {
        //Check Firebase list for email: if found continue to verification code or else alert
        setState("sending_email");
        console.log(loginEmail);
        if (!loginEmail) {
            alert("Please enter an email");
            return;
        }
        console.log(state);
        await sendVerificationEmail({ email: loginEmail });
        console.log(state);
        setState("email_verification");
    };

    const handleEmailVerification = async () => {
        console.log("VERIFIED1");
        setState("verifying");
        if (!loginEmail || !verificationCode) {
            alert("Please enter an verification code");
            
            return;
        }
        console.log("VERIFIED2");
        setState("verified");

        if (!loginEmail || !verificationCode) {
            alert("Please enter an verification code");
            return;
        }
        console.log("VERIFY CODE");
        await connect({ strategy: "email_verification", email: loginEmail, verificationCode: verificationCode });
        
        console.log("oooo");

        return <div><span className="loading loading-infinity loading-lg text-warning"></span></div>;
    };


    if(address)
    {
        console.log(address);
        router.push(`/profile/h3x`);
    }

    if (state === "sending_email" || state === "verifying") {

        return <div><span className="loading loading-infinity loading-lg text-warning"></span></div>;
    }

    if (state === "verified") {

        router.push(`/profile/${loginEmail}`);
    }

    if (state === "email_verification") {
        return (
            <>
            <p style={{ color: "#333"}}>Enter the verification code sent to your email</p>
            <input
                className="input input-bordered w-full max-w-xs"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(eVC) => setVerificationCode(eVC.target.value)}
            />
            <button 
                className="btn btn-outline btn-warning"
                onClick={handleEmailVerification}
            >
                Verify
            </button>

            <button 
                className="btn btn-outline btn-warning"
                onClick={handleEmailEntered}
            >
                Resend Code
            </button>

            <div className="divider divider-warning"></div>

            <button 
                className="btn btn-outline btn-warning"
                onClick={() => setState("login")}
            >
                Go Back
            </button>
            </>
    );
    }


    if (state === "login")
    {
        return (
            <>
            <div className="flex flex-col gap-4 sm:grid-cols-2 md:gap-8">
                <input 
                        type="text" 
                        className="input input-bordered w-full max-w-xs"
                        placeholder="Email"
                        value={loginEmail}
                        onChange={(eLoginEmail) => setLoginEmail(eLoginEmail.target.value)}
                    />
                  <button className="btn btn-outline btn-warning" onClick={handleEmailEntered}>Login</button>
            </div>
        
            <div className="divider divider-warning"></div>
            <div className="flex flex-col gap-4 sm:grid-cols-2 md:gap-8">
            <button className="btn btn-outline btn-warning" style={{width: "100%"}} onClick={userRegister}>Register</button>
            </div>
            
            </>   
            
        );
    }

    if (state === "register")
    {   
        return(
            <>
                
                <div className="flex flex-col gap-4 sm:grid-cols-2 md:gap-8">

                <div className="flex flex-row gap-4 sm:grid-cols-2 md:gap-8 items-center" >

                    <div>
                        <h1 className="text-l font-extrabold tracking-tight text-white sm:text-[5rem]">
                            Register on <span className="text-[hsl(0,0%,100%)]">h</span><span className="text-[hsl(39,69%,57%)]">3</span>x<span className="text-[hsl(0,0%,38%)]">|</span>World
                        </h1>
                    </div>

                    <div className="avatar ">
                        <div className="w-24 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                            <img src={image} width={256} height={256}/>
                        </div>
                    </div>

                    <input 
                        type="file" 
                        accept="image/*" 
                        className="file-input file-input-bordered w-full max-w-xs pl-60px" 
                        onChange={handleUpload} 
                        ref={fileUploadRef}
                    />

                </div>

                <div className="flex flex-row gap-4 sm:grid-cols-2 md:gap-8">
                    <input 
                        type="text" 
                        className="input input-bordered w-50"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(eFirstName) => setFirstName(eFirstName.target.value)}
                    />

                    <input 
                        type="text"
                        className="input input-bordered w-50"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(eLastName) => setLastName(eLastName.target.value)}
                    />

                </div>
                    
                <input 
                        type="text" 
                        className="input input-bordered w-100"
                        placeholder="Email"
                        value={email}
                        onChange={(eEmail) => setEmail(eEmail.target.value)}
                    />

                    <input 
                        type="text" 
                        className="input input-bordered w-100"
                        placeholder="Username"
                        value={username}
                        onChange={(eUsername) => setUsername(eUsername.target.value)}
                    />
                
                

                <div className="flex flex-row gap-4 sm:grid-cols-2 md:gap-8">
                    
                    <input 
                        type="text" 
                        className="input input-bordered w-50"
                        placeholder="Location"
                        value={location}
                        onChange={(eLocation) => setLocation(eLocation.target.value)}
                    />

                    <input 
                        type="text"
                        className="input input-bordered w-50"
                        placeholder="Occupation"
                        value={occupation}
                        onChange={(eOccupation) => setOccupation(eOccupation.target.value)}
                    />

                </div>

                <div className="flex flex-col gap-4" id="links">
                    <input 
                        type="text" 
                        id="0"
                        className="input input-bordered w-200"
                        placeholder="Add Link"
                        value={link1}
                        onChange={(eLinks1) => setLink1(eLinks1.target.value)}
                    />

                    <input 
                        type="text" 
                        id="0"
                        className="input input-bordered w-200"
                        placeholder="Add Additional Link"
                        value={link2}
                        onChange={(eLinks2) => setLink2(eLinks2.target.value)}
                    />

                    <input 
                        type="text" 
                        id="0"
                        className="input input-bordered w-200"
                        placeholder="Add Additional Link"
                        value={link3}
                        onChange={(eLinks3) => setLink3(eLinks3.target.value)}
                    />
                </div>
                


            <textarea 
                        className="textarea textarea-bordered w-100 h-60"
                        placeholder="Bio"
                        value={bio}
                        maxLength={256}
                        onChange={(eBio) => setBio(eBio.target.value)}
                    />

            <button className="btn btn-outline btn-warning">Register</button>

            <div className="divider divider-warning"></div>
            <button className="btn btn-outline btn-warning" onClick={userLogin}>Login</button>
            </div>
            </>
        );
    }

    else {
        return <><div><span className="loading loading-infinity loading-lg text-warning"></span></div></>
    }
    
}