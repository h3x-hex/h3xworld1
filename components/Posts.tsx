"use client"

import Link from "node_modules/next/link"
import { PostBody, PostPreview, PostType } from "types/types"
import PostCard from "./PostCard"

interface IProps {
  posts: PostType[]
}

export default function Posts ({posts}: IProps){

    console.log("Posts: ", posts);

    return (
      <>
        <div className="flex flex-col">
          {posts ? 
            posts.map((post) => (
              <PostCard post={ post } fullPost={false}/>
            ))
            :
            <>No Posts YETi</>
          }
      </div>    
      </>  
    )
}