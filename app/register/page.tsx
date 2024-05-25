import Registration from "components/Registration";
import { AuthContextProvider } from "context/AuthContext";



function Page() {

    return (
        <AuthContextProvider>
            <Registration/>
        </AuthContextProvider>
    )
}

export default Page;