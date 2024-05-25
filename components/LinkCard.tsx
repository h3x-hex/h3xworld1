type ProfileLink = {
    title: string,
    link: string,
}

//Add Icon / BG IMAGE / Change Color and Text Color

export default function LinkCard (profileLinks: ProfileLink) {

    return (
        <>
            <div>
                <div className="card w-96 h-30 bg-base-100 shadow-xl py-4">
                    <div className="card-body">
                        <a href={profileLinks.link}>
                            <h2 className="card-title items-center justify-center">{profileLinks.title}</h2>
                        </a>
                    </div>
                </div>  
            </div>
        </>
    )

}