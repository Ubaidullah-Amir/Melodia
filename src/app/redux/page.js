"use client"

import { logIn } from "@/redux/features/auth-slice"
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

export default function Redux(){
      console.log("Redux",useSelector((state)=>state.auth.value))
      const username = useSelector((state)=>state.auth.value?.username)
      const email = useSelector((state)=>state.auth.value?.email)
      const [formState,setFormState] = useState({
            username: '',
            email: ''
      })
      const dispatch = useDispatch()
      function onsubmit(e){
            e.preventDefault()
            console.log("formState",formState)
            dispatch(logIn(formState))
      }
      return (
            <div>
                  <p>Username : {username}</p>
                  <p>Email : {email}</p>
                  <form onSubmit={onsubmit}>
                        <input type="text" onChange={(e)=>setFormState((prevState)=>{return {...prevState,username:e.target.value}})} name="username" required/>
                        <input type="text" name="email" onChange={(e)=>setFormState((prevState)=>{return {...prevState,email:e.target.value}})} required/>
                        <button className="dark:bg-white dark:text-black" type="submit">Log in</button>
                  </form>
            </div>
      )
}