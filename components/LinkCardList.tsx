"use client"
import LinkCard from "./LinkCard"
import { useRouter } from "next/navigation"

interface IProps{
    links: string[],
}

export default function LinkCardList ({links}: IProps) {

    console.log(links);
    const router = useRouter();

    return (
        <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1 w-60 bg-zinc-900 border-none text-gray-300 btn-outline"><span className="material-symbols-outlined">link</span>Links</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-zinc-900 rounded-box w-60">
                
                {links ? links.map((link) => 
                    <li className="link-input text-gray-300">
                        <button className="input-label" onClick={() => router.push(`https://${link}`)}>{link}</button>
                    </li>
                ) : <></>}

                </ul>
        </div>    
    )
}