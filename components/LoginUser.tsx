"use client"

import { auth, firestore } from "config/firebase.config";
import { useAuth } from "context/AuthContext";
import { useRouter } from "node_modules/next/navigation";
import { useState } from "react";
import { LoginType } from "types/types";
import { doc, getDoc } from 'firebase/firestore';
import { setPersistence, browserSessionPersistence } from 'firebase/auth';
import { useMediaQuery } from "react-responsive";



export default function LoginUser () {

    const [data, setData] = useState<LoginType>({
		email: '',
		password: '',
	});

	// Use the signIn method from the AuthContext
	const { logIn } = useAuth();
	const user = auth.currentUser;
	const router = useRouter();
    const isMobile = useMediaQuery({ maxWidth: 1224 });

	const handleLogin = async (e: any) => {
		e.preventDefault();
		try {
			await logIn(data.email, data.password);
			if(user !== null)
			{
				router.push(`/profile/${user.displayName}`)
			}
			
		} catch (error: any) {
			console.log(error.message);
		}
	};

    const userRegister = () => {
        router.push('/register');
    }

	// Destructure data from the data object
	const { ...allData } = data;

	// Disable submit button until all fields are filled in
	const canSubmit = [...Object.values(allData)].every(Boolean);

    return (

        <>
        {
            isMobile ?

            <div className="flex flex-col w-full">
                <div className="grid flex-grow h-64 card rounded-box place-items-center">
                <div className="flex flex-col gap-4">
                        <input 
                                type="text" 
                                className="input input-bordered w-full"
                                placeholder="Email"
                                onChange={(e: any) => {
                                    setData({
                                        ...data,
                                        email: e.target.value,
                                    });
                                }}
                            />
                            <input 
                                type="password" 
                                className="input input-bordered w-80"
                                placeholder="Password"
                                onChange={(e: any) => {
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    });
                                }}
                            />
                        <button className="btn btn-outline btn-warning" onClick={handleLogin} disabled={!canSubmit}>Login</button>
                    </div>
                </div>
                <div className="divider divider-warning lg:divider-horizontal pl-3"></div> 
                <div className="grid flex-grow h-64 card rounded-box place-items-center">
                    <div className="flex flex-col gap-4 sm:grid-cols-2 md:gap-8">
                        <button className="btn btn-outline btn-warning" style={{width: "100%"}} onClick={userRegister}>Join h3xWorld</button>
                        <p><span className="text-[hsl(0,0%,100%)]">h</span><span className="text-[hsl(39,69%,57%)]">3</span>x<span className="text-[hsl(0,0%,38%)]">|</span>World beta only for <span className="text-[hsl(0,0%,100%)]">h</span><span className="text-[hsl(39,69%,57%)]">3</span>xCard holders.</p>
                    </div>
                    
                </div> 
                
            </div>

            :

            <div className="flex w-full flex-row">
                <div className="grid flex-grow h-64 card rounded-box place-items-center">
                    <div className="flex flex-col gap-4 sm:grid-cols-2 md:gap-8">
                        <button className="btn btn-outline btn-warning" style={{width: "100%"}} onClick={userRegister}>Join h3xWorld</button>
                        <p><span className="text-[hsl(0,0%,100%)]">h</span><span className="text-[hsl(39,69%,57%)]">3</span>x<span className="text-[hsl(0,0%,38%)]">|</span>World beta only for <span className="text-[hsl(0,0%,100%)]">h</span><span className="text-[hsl(39,69%,57%)]">3</span>xCard holders.</p>
                    </div>
                    
                </div> 
                <div className="divider divider-warning lg:divider-horizontal pl-3"></div> 
                <div className="grid flex-grow h-64 card rounded-box place-items-center">
                <div className="flex flex-col gap-4">
                        <input 
                                type="text" 
                                className="input input-bordered w-full"
                                placeholder="Email"
                                onChange={(e: any) => {
                                    setData({
                                        ...data,
                                        email: e.target.value,
                                    });
                                }}
                            />
                            <input 
                                type="password" 
                                className="input input-bordered w-80"
                                placeholder="Password"
                                onChange={(e: any) => {
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    });
                                }}
                            />
                        <button className="btn btn-outline btn-warning" onClick={handleLogin} disabled={!canSubmit}>Login</button>
                    </div>
                </div>
            </div>

        }
        
        
        </>




    )

}