"use client"

interface IProps {
    bio: string,
}

export default function BioCard ({bio}: IProps) {


    return (
        <>
            <div className="container flex flex-col pt-6 pb-16 px-3 w-full">
                <div className="card w-full h-30 bg-zinc-900 shadow-xl">
                    <div className="card-body text-gray-300">
                        <h2 className="card-title">About me</h2>
                        <p>{bio}</p>
                    </div>
                </div>  
            </div>
        </>
    )

}

