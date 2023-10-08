"use client"
import Link from 'next/link';
import React, {  useState } from 'react';

const Filter = ({posts}) => {
      const [sort,setSort] = useState("None")
      const [filterText,setFilterText] = useState("")
      const queryText=filterText.trim().replace(/\s+/g, '+')
      return (
            <div className='mt-6'>
                  <h1>Filter :</h1>
                  
                  <h2>Sort By:</h2>
                  
                  <div className='flex justify-between '>
                        <button className={"w-28 p-2  border-b-2 "+(sort=="description"?"bg-blue-700":"bg-zinc-700")} onClick={()=>{setSort("description")}}>Description</button>
                        <button className={"w-28 p-2  border-b-2 "+(sort=="title"?"bg-blue-700":"bg-zinc-700")} onClick={()=>{setSort("title")}}>title</button>
                        <button className={"w-28 p-2  border-b-2 "+(sort=="type"?"bg-blue-700":"bg-zinc-700")} onClick={()=>{setSort("type")}}>type</button>
                        <button className={"w-28 p-2  border-b-2 "+(sort=="None"?"bg-blue-700":"bg-zinc-700")} onClick={()=>{setSort("None")}}>None</button>
                  </div>
                  <input value={filterText} className='w-4/5 block m-auto rounded-md p-3 text-black outline-none focus:border-2' onChange={(e)=>{setFilterText(e.target.value)}}/>
                  <div className='mt-3 w-3/4 m-auto flex text-center'>
                        <Link className='grow bg-red-700 rounded-md p-3 ' href={`/post?sort=${sort}&startWith=${queryText}`}>Filter</Link>
                  </div>
                  <h1 className="m-3">Posts:</h1>
                  {
                        posts?.map((post)=>{
                              return (<div key={post.id} className="border-2 border-blue-700 rounded-md mb-2 text-center">
                                    <p className=" text-lime-300">Title:{post.title}</p>
                                    <p className=" text-lime-300">description:{post.description}</p>
                                    <p className=" text-lime-300">Type:{post.type}</p>
                                    <p className=" text-lime-300">ID:{post.id}</p>
                              </div>)
                        })
                  }
            </div>
            
      );
};

export default Filter;