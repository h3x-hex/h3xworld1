
import EditProfile from "components/EditProfile";
import { AuthContextProvider } from "context/AuthContext";
import { UserProfileType } from "types/types";


function Page({params}: {params: {username: string}}) {

    return (
        <AuthContextProvider>
            <EditProfile username={params.username}/>
        </AuthContextProvider>
    )
}

export default Page;