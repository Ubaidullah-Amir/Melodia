"use client"

import { useVerifyResetPassTokenMutation } from "@/redux/features/api";
import UseResetPassToken from "./useResetPassToken";
import { useEffect } from "react";
import { RESET_PASSWORD_TOKEN_EXPIRED } from "@/helper/ImportantStrings";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function page({searchParams}) {
      const router = useRouter();

      const {token,email} = searchParams
      const {password,setPassword,focusedPassword,setFocusedPassword,passShow,setPassShow,isSubmitDisabled}=UseResetPassToken()
      const [verifyPassTokenMutation,{
            isLoading,
            isSuccess,
            isError,
            error ,
            data
      }] = useVerifyResetPassTokenMutation()
      const onSubmit = (e)=>{
            e.preventDefault();
            verifyPassTokenMutation({token,email,newPassword:password});
      }
      useEffect(()=>{
            if (!(email && token)){
                  router.push('/login')
            }
      },[])
      useEffect(()=>{
            if (isSuccess){
                  // route to login page
                  toast.success("Password updated successfully.")
                  router.push('/login') //go to login page 
            }
            if (isError){
                  if(error?.data?.errorCode === RESET_PASSWORD_TOKEN_EXPIRED){
                        toast.error("Your token has expired. Tokens have a limited validity period. Please request a new token to proceed with resetting your password.")  
                        router.push('/login') //go to login page 
                  }
                  else{
                        toast.error("Error occured while updating password")  
                  }
                  setPassword("")
            }
            
      },[ isLoading,isSuccess,isError])
      return (
            <div className="m-auto max-w-md   min-h-screen flex items-center ">
                  <Toaster/>
                  <div className="min-h-[50vh] w-full border-2 rounded p-2 m-auto">
                        <p className="">For the email address <span className="text-blue-600">{email}</span>, you have been issued a token with a validity of 60 minutes from the moment this email was sent. Please use this token to set a new password. However, please note that your password reset request will not be processed if the token has expired. Thank you.</p>
                        <form onSubmit={onSubmit} className='flex flex-col gap-6'>
                              <div className='relative mt-5'>
                                    
                                    {passShow?
                                          <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{setPassShow((prevState=>!prevState))}} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="blue" className="w-5 h-5 absolute right-3 bottom-3 hover:cursor-pointer">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                          </svg>:
                                          <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{setPassShow((prevState=>!prevState))}} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="blue" className="w-5 h-5 absolute right-3 bottom-3 hover:cursor-pointer ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                          </svg>
                                    }
                                    <label 
                                          htmlFor="password"
                                          required
                                          className={focusedPassword || password!=""?" transition-transform absolute -translate-y-5 border-2 border-gray-300 scale-90 bg-white inline-block translate-x-1 p-1 px-2 rounded-md dark:bg-gray-800":"dark:bg-gray-800 absolute block translate-y-3 translate-x-3"}>
                                          {focusedPassword || password!=""?"New Password":"Enter New Password"}
                                    </label>
                                    <input className={` w-full dark:bg-gray-800 dark:text-gray-300 bg-white  rounded-md p-3 text-black outline-none border-2 border-opacity-75 focus:border-opacity-100 ${error?"border-2 border-red-400":"border-gray-400"}`} 
                                    type={passShow?"text":'password'} 
                                    id='password' 
                                    onBlur={()=>{setFocusedPassword(false)}} 
                                    onFocus={()=>{setFocusedPassword(true)}} 
                                    onChange={(e)=>{setPassword(e.target.value)}}/>
                                    
                              </div>
                              <input disabled={isSubmitDisabled || isLoading} className=' py-2 text-center w-full rounded-md text-white my-2.5 bg-red-600 outline-none disabled:cursor-not-allowed disabled:bg-red-400 hover:bg-red-800 hover:cursor-pointer' type='submit'  />
                        
                        </form>
                  </div>
                  
            </div>
      );
}

export default page;