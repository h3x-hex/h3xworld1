"use client"

import { auth } from "config/firebase.config"
import Link from "node_modules/next/link"
import { PostType } from "types/types"
import PostCard from "./PostCard"
import { useMediaQuery } from "react-responsive"

interface IProps {
  posts: PostType[]
}

export default function Posts ({posts}: IProps){

    console.log("Posts: ", posts);

    const isMobile = useMediaQuery({ maxWidth: 1224 });

    return (
      <>
        {
          isMobile ?

          <div className="flex items-center justify-center w-fit pb-32 pl-6">
            <div className="grid grid-cols-3 gap-3 w-fit">
                {posts.length > 0 ? 
                  posts.map((post) => (
                    <>
                      <PostCard post={ post } fullPost={false}/>
                      
                    </>
                ))
              :
                <></>
              }
            </div>
          </div>  

          :

          <div className="flex items-center justify-center w-fit pb-32">
            <div className="grid grid-cols-3 gap-3 w-fit">
                {posts.length > 0 ? 
                  posts.map((post) => (
                    <>
                      <PostCard post={ post } fullPost={false}/>
                      
                    </>
                ))
              :
                <></>
              }
            </div>
          </div>  
        }  
      </>  
    )
}