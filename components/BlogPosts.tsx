"use client"

import { auth } from "config/firebase.config"
import Link from "node_modules/next/link"
import { BlogPostType, PostType } from "types/types"
import BlogPostCard from "./BlogPostCard"
import { useMediaQuery } from "react-responsive"

interface IProps {
  posts: BlogPostType[]
}

export default function BlogPosts ({posts}: IProps){

    console.log("BlogPosts: ", posts);

    const isMobile = useMediaQuery({ maxWidth: 1224 });

    return (
      <>
        <div className="flex items-center justify-center w-full pb-32  pr-8">
          <div className="flex flex-col gap-3 pt-3">
              {posts.length > 0 ? 
                posts.map((post) => (

                  isMobile ?

                  <>
                    <BlogPostCard post={ post } fullPost={false}/>
                    <div className="divider divider-warning w-12/12 pl-16"></div> 
                  </>

                  :

                  <>
                    <BlogPostCard post={ post } fullPost={false}/>
                    <div className="divider divider-warning w-11/12 pl-16"></div> 
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