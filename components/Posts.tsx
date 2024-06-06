"use client"

import { auth } from "config/firebase.config"
import Link from "node_modules/next/link"
import { PostType } from "types/types"
import PostCard from "./PostCard"

interface IProps {
  posts: PostType[]
}

export default function Posts ({posts}: IProps){

    console.log("Posts: ", posts);

    return (
      <>
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
      </>  
    )
}