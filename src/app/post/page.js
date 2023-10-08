// "use client"
import Link from "next/link"
import Filter from "./filter"
const getPosts=async ({startWith,sort,id})=>{
      try{
            const queryParams="?"+(startWith?"startWith="+startWith:"")+(sort?"&sort="+sort:"")+(id?"&id="+id:"")
            
            const res = await fetch(`${process.env.DOMAIN_URL}/api/post${queryParams}`,{
                  next:{
                        tags:["posts"],
                        revalidate:1
                  },
            })
            const data =await res.json()
            return {posts:data.posts,isError:false}
      }catch(error){
            console.log(error.message)
            return {posts : null,isError:true}
      }

}

const Post =async (props) => {
      const {searchParams} = props
      const {posts,isError} = await getPosts({...searchParams})
      if(isError){
            return <h1>Something went wrong.</h1>
      }
      return (
            <div className="p-2">
                  <Link className="bg-blue-700 rounded-md p-3 " href="/createPost">create post</Link>
                  <Filter posts={posts}/>
                  
                  
            </div>
      );
};

export default Post;