
import EditProfile from "components/EditProfile";
import { AuthContextProvider } from "context/AuthContext";
import { UserProfileType } from "types/types";


function Page() {

    return (
        <AuthContextProvider>
            <EditProfile/>
        </AuthContextProvider>
    )
}

export default Page;