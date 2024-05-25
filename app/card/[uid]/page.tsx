"use client"

import { firestore } from "config/firebase.config";
import { useEffect } from "react";
import { setDoc, doc, getDoc, updateDoc, where, query, collection, getDocs } from "firebase/firestore";
import { UserProfileType } from "types/types";
import { Router } from "express";
import { useRouter } from "node_modules/next/navigation";


export default function Page ({ params }: { params: { uid: string } }) {

    const userId = params.uid;
    const router = useRouter();

    useEffect(() => {
        async function getData(userId: string) {
            const q = query(collection(firestore, "Users"), where("id", "==", userId));
            console.log(userId);
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                
                if (doc.data()) 
                {
                    console.log(doc.id, " => ", doc.data());
                    router.push(`/profile/${doc.id}`);
                } else 
                {
                    console.log("User Not Found");
                }

            });
            
        }
        getData(userId);
      }, []);

      return (
        <div className="flex h-screen">
            <div className="m-auto"><span className="loading loading-infinity text-warning loading-lg"></span></div>
        </div>
      )

}