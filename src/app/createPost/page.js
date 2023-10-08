import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"


const createPostAction=async (formData)=>{
      "use server"
      const title = formData.get("title")
      const type = formData.get("type")
      const description = formData.get("description")
      const formBody = {
            title,
            description,
            type
      }
      const url =`${process.env.DOMAIN_URL}/api/post`
      await fetch(url, {
            method: 'POST',
            headers: {
                  "Accept":"*/*",
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(formBody),
      })
      revalidateTag("posts")
      redirect("/post")
      
      
}      

const createPost = () => {
      return (
            <div className="bg-black">
                  <form action={createPostAction} className='flex max-w-3xl m-auto flex-col text-gray-200 gap-6'>
                        <div >
                              <label htmlFor="title" className="">Title</label>
                              <input required name="title" className="w-full rounded-md p-3 text-black outline-none focus:border-2 border-gray-400"  type='text' id='title' />
                              
                        </div>
                        <div >
                              <label htmlFor="description" className="">Description</label>
                              <textarea required  name="description" rows="4" cols="50" className="w-full rounded-md p-3 text-black outline-none focus:border-2 border-gray-400"   id='description' />
                              
                        </div>
                        <div >
                              <label htmlFor="type" className="">Type</label>
                              <select required name="type" className="w-full rounded-md p-3 text-black outline-none focus:border-2 border-gray-400"   id='type' >
                                    <option value="">-</option>
                                    <option value="good">good</option>
                                    <option value="bad">bad</option>
                                    <option value="average">average</option>
                              </select>
                        </div>
                        <input  className=' py-2 text-center w-full rounded-md text-white my-2.5 bg-red-600 outline-none  hover:bg-red-800 hover:cursor-pointer' type='submit'  />
                  
                  </form>
            </div>
      );
};

export default createPost;