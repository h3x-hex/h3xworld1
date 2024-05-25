"use client"
import LinkCard from "./LinkCard"

interface IProps{
    links: string[],
}

export default function LinkCardList ({links}: IProps) {

    console.log(links);

    return (
        <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1 w-60"><span className="material-symbols-outlined">link</span>Links</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-60">
                
                {links ? links.map((link) => 
                    <li className="travelcompany-input">
                        <a className="input-label" href={`https://${link}`}>{link}</a>
                    </li>
                ) : <></>}

                </ul>
        </div>    
    )
}