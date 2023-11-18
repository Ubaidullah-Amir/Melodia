"use client"

import { useGetUsersQuery, usePostUserMutation } from "@/redux/features/api"
import { useState } from "react"

export default function reduxApi() {
      const [addUser,{
            isLoading: isUpdating,
            isSuccess:hasUserAdded,
            isError
      }] = usePostUserMutation()
      const [formState,setFormState] = useState({
            name:"",
            age:""
      })
      const {data, error, isLoading ,isFetching} = useGetUsersQuery("")
      console.log(data, error, isLoading)
      function handleSubmit(e){
            e.preventDefault()
            addUser(formState)
      }
      if(isLoading){
            return <p>Loading</p>
      }
      if(isFetching){
            return <p>Loading</p>
      }
      if(error){
            return <p>Error</p>
      }
      const UIuser = data?.data.map((user,index)=>(<p key={index}>name : {user.name} age : {user.age}</p>))
      return (
            <div >
                 <h1>Redux Api</h1>
                 {isUpdating && <p>Updating ...</p>}
                 {hasUserAdded && <p> user successfully added</p>}
                 {isError && <p>Error in adding user</p>}
                 <form onSubmit={handleSubmit}>
                  <input type="text" name="name" onChange={(e)=>{setFormState(prevState=>({...prevState,name:e.target.value}))}} required/>
                  <input type="number" name="age"  onChange={(e)=>{setFormState(prevState=>({...prevState,age:e.target.value}))}}  required />
                  <button type="submit">add user</button>
                 </form>
                 {UIuser}
            </div>
      )
}