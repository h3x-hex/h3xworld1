"use client"

import { auth } from "config/firebase.config"
import Link from "node_modules/next/link"
import { PostType } from "types/types"
import PostCard from "./PostCard"
import HomePostCard from "./HomePostCard"

interface IProps {
  posts: PostType[]
}

export default function HomePosts ({posts}: IProps){

    console.log("Posts: ", posts);

    return (
      <>
         <div className="min-w-full w-fit pb-32">
          <div className="flex flex-col gap-3 w-fit">
              {posts.length > 0 ? 
                posts.map((post) => (
                  <>
                    <HomePostCard post={ post } fullPost={false}/>
                    
                  </>
              ))
            :
              <></>
            }
          </div>
        </div>    
      </>  
    )
}