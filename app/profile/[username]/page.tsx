import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThirdwebProvider, embeddedWallet } from "@thirdweb-dev/react";
import Profile from 'components/Profile';
import { useAddress } from 'app/thirdweb';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from 'config/firebase.config';



export default function Page ({ params }: { params: { username: string } }) {

  console.log(params.username);

  return(
      <>
        <Profile username={params.username} />
      </>
  );
};
