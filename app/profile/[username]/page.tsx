import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Profile from 'components/Profile';
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
