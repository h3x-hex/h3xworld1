"use client"
import { embeddedWallet, ThirdwebProvider } from "app/thirdweb";
import Login from "./Login";
import LoginUser from "./LoginUser";

export default function LoginWrapper () {

    return(

        <ThirdwebProvider
        clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
        activeChain={"mumbai"}
        supportedWallets={[embeddedWallet(
          {
            auth:{
              options:[
                "email"
              ]
            }
          }
        )]}
      >

          <LoginUser/>

        </ThirdwebProvider>
    );

}