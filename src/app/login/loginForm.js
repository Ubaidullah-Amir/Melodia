'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { signIn} from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
const LoginForm = () => {
      const router = useRouter()
      const [formData,setFormData]=useState({
            email:"",
            password:""
      })
      const [focused,setFocused]= useState({
            email:false,
            password:false
      })
      const [loading,setLoading]= useState(false)
      const [error,setError]= useState(false)
      const [passShow,setPassShow]=useState(false)
      const [disableSubmit,setDisableSubmit]=useState(true)
      const searchParams = useSearchParams();
      const callbackUrl = searchParams.get("callbackUrl") || "/";
      useEffect(()=>{
            if(formData.email.length && formData.password.length){
                  setDisableSubmit(false)
            }else{
                  setDisableSubmit(true)
            }
      },[formData])
      
      const onSubmit= async (e)=>{
            try {
                  e.preventDefault();
                  setLoading(true)
                  console.log(formData)
                  const res = await signIn("credentials", {
                        redirect: false,
                        email: formData.email,
                        password: formData.password,
                        callbackUrl,
                      });
                  // console.log("res",res)
                  setLoading(false)
                  if (!res?.error) {
                        router.push(res.url);
                  } else {
                        console.log("error :",res?.error)
                        setError(true)
                  }
            } catch (error) {
                  console.log("error :",error)
                  setLoading(false)
                  setError(true)
                  toast.error("error occured")
            }
            
      }
      return (
            <div className=' dark:bg-gray-900 flex flex-col p-4 gap-6 justify-around'>
                  <Toaster/>
                  {loading?<p className='text-center text-blue-600'>Processing ...</p>:null}
                  {error?<p className='text-center text-red-500'>Error occured.</p>:null}
                  <p className='text-right text-xs'>Not a member?<Link className='text-blue-500 ' href="/register">Register Now</Link></p>
                  <div className='text-center'>
                        <p className='text-2xl'>Hello Again!</p>
                        <p>welcome back you have been missed!</p>
                  </div>
                  <form onSubmit={onSubmit} className='flex flex-col gap-6'>
                        <div >
                              <label htmlFor="email" className={focused.email || formData.email!=""?"absolute transition-transform -translate-y-5 border-2 border-gray-300  scale-90 bg-white inline-block translate-x-1 p-1 px-2 rounded-md dark:bg-gray-800":"dark:bg-gray-800 absolute block translate-y-3 translate-x-3"}>{focused.email || formData.email!=""?"Email":"Enter Email"}</label>
                              <input className={` w-full dark:text-gray-300 dark:bg-gray-800  bg-white rounded-md p-3 text-black outline-none focus:border-2 ${error ?"border-2 focus:border-gray-400 border-red-400":"border-gray-400"}`}  type='text' id='email' onBlur={()=>{setFocused((prevState)=>{return{...prevState,email:false}})}} onFocus={()=>{setFocused((prevState)=>{return{...prevState,email:true}})}} onChange={(e)=>{setFormData((prevState)=>{return {...prevState,email:e.target.value}})}}/>
                              
                        </div>
                        <div className='relative '>
                              
                              {passShow?
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{setPassShow((prevState=>!prevState))}} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="blue" className="w-5 h-5 absolute right-3 bottom-3 hover:cursor-pointer">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>:
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{setPassShow((prevState=>!prevState))}} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="blue" className="w-5 h-5 absolute right-3 bottom-3 hover:cursor-pointer ">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                              }
                              <label htmlFor="password" className={focused.password || formData.password!=""?" transition-transform absolute -translate-y-5 border-2 border-gray-300 scale-90 bg-white inline-block translate-x-1 p-1 px-2 rounded-md dark:bg-gray-800":"dark:bg-gray-800 absolute block translate-y-3 translate-x-3"}>Password</label>
                              <input className={` w-full dark:bg-gray-800 dark:text-gray-300 bg-white  rounded-md p-3 text-black outline-none focus:border-2 ${error?"border-2 border-red-400":"border-gray-400"}`} type={passShow?"text":'password'} id='password' onBlur={()=>{setFocused((prevState)=>{return{...prevState,password:false}})}} onFocus={()=>{setFocused((prevState)=>{return{...prevState,password:true}})}} onChange={(e)=>{setFormData((prevState)=>{return {...prevState,password:e.target.value}})}}/>
                              
                        </div>
                        <input disabled={disableSubmit || loading} className=' py-2 text-center w-full rounded-md text-white my-2.5 bg-red-600 outline-none disabled:cursor-not-allowed disabled:bg-red-400 hover:bg-red-800 hover:cursor-pointer' type='submit'  />
                  
                  </form>
                  <p className='text-right text-sm'>
                        <Link href="/resetPasswordToken" >Recovery Password</Link>
                  </p>
                  <p className='text-center text-xs'>
                        Or continue with
                  </p>
                  <div className='flex justify-center gap-6'>
                        <div onClick={()=>{signIn('google', { callbackUrl: callbackUrl })}} className=" hover:bg-gray-50 bg-gray-100 hover:scale-110 transition-transform w-12 h-12 rounded-md flex justify-center items-center shadow-lg  shadow-indigo-500/50">
                              <Image
                                    src="/googleIcon.png"
                                    width={32}
                                    height={32}
                                    alt="Icon"
                              />
                        </div>
                        <div onClick={()=>{alert("Not yet implemented")}} className="hover:bg-gray-50 bg-gray-100 hover:scale-110 transition-transform duration-150 w-12 h-12 rounded-md flex justify-center items-center shadow-lg  shadow-indigo-500/50">
                              <Image
                                    src="/githubIcon.png"
                                    width={32}
                                    height={32}
                                    alt="Icon"
                              />
                        </div>
                        <div onClick={()=>{alert("Not yet implemented")}} className="hover:bg-gray-50 bg-gray-100 hover:scale-110 transition-transform duration-150 w-12 h-12 rounded-md flex justify-center items-center shadow-lg  shadow-indigo-500/50">
                              <Image
                                    src="/facebookIcon.png"
                                    width={32}
                                    height={32}
                                    alt="Icon"
                              />
                        </div>
                        
                  </div>
            </div>
      );
};

export default LoginForm;