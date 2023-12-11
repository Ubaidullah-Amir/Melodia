// components/CustomModal.js

import UseModal from '@/customHooks/useModal';
import UseResetPassword from '@/customHooks/useFormResetPassword';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { usePostResetPasswordEmailMutation } from '@/redux/features/api';
import toast, { Toaster } from 'react-hot-toast';
import { EMAIL_NOT_SENT, USER_NOT_EXIST } from '@/helper/ImportantStrings';


const ResetPasswordToken = () => {
      const {modalIsOpen, ModalStyles ,openModal ,closeModal} = UseModal()
      const {email,setEmail,focusedEmail,setFocusedEmail,isSubmitDisabled}= UseResetPassword()
      const [sendResetPasswordEmail,{
            isLoading,
            isSuccess,
            isError,
            error ,
            data
      }] = usePostResetPasswordEmailMutation()
      const onSubmit = (e)=>{
            e.preventDefault();
            sendResetPasswordEmail({email})
      }
      useEffect(()=>{
            if (isSuccess){
                  toast.success("Email has been sent successfully")
                  setEmail("")
                  closeModal()
            }
            if (isError){
                  console.log(error,data)
                  if(error?.data?.errorCode === USER_NOT_EXIST){
                        toast.error("Enter the correct email address")  
                  }
                  if(error?.data?.errorCode === EMAIL_NOT_SENT){
                        toast.error("Enter the correct email address")  
                  }
                  setEmail("")
            }



      },[ isLoading,isSuccess,isError])
      
      return (
      <div>
            <button onClick={openModal}>Forgot Password?</button>
            <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="Reset Password Modal"
                  style={ModalStyles}
            >
                  <div className='flex flex-col justify-around h-full p-4 dark:bg-gray-900'>
                        {isLoading?<p className='text-gray-700'>Please wait we are sending the email</p>:null}
                        <p className='text-center font-bold'>Forgotten your password?</p>
                        {/* lock svg */}
                        <svg style={{width:"30%",marginInline:"auto"}} xmlns="http://www.w3.org/2000/svg" fill='blue'  viewBox="0 0 50 50">
                              <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.300781 20 6 21.300781 6 23 L 6 47 C 6 48.699219 7.300781 50 9 50 L 41 50 C 42.699219 50 44 48.699219 44 47 L 44 23 C 44 21.300781 42.699219 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 25 30 C 26.699219 30 28 31.300781 28 33 C 28 33.898438 27.601563 34.6875 27 35.1875 L 27 38 C 27 39.101563 26.101563 40 25 40 C 23.898438 40 23 39.101563 23 38 L 23 35.1875 C 22.398438 34.6875 22 33.898438 22 33 C 22 31.300781 23.300781 30 25 30 Z"></path>
                        </svg>
                        <p className='text-center '>Don't worry! Simply enter your email below, and we'll send you a link to reset it in no time.</p>
                        <form onSubmit={onSubmit} className='flex flex-col gap-6'>
                              <div >
                                    <label 
                                          htmlFor="email" 
                                          className={focusedEmail || email!=""?"absolute transition-transform -translate-y-5 border-2 border-gray-300  scale-90 bg-white inline-block translate-x-1 p-1 px-2 rounded-md dark:bg-gray-800":"dark:bg-gray-800 absolute block translate-y-3 translate-x-3"}>
                                          {focusedEmail || email!=""?"Email":"Enter Email"}
                                    </label>
                                    <input className={` w-full dark:text-gray-300 dark:bg-gray-800  bg-white rounded-md p-3 text-black outline-none focus:border-opacity-100 border-opacity-50 border-2 ${isError ?"border-2 focus:border-gray-400 border-red-400":"border-gray-400"}`}  
                                          type='email' id='email'
                                          value={email} 
                                          onBlur={()=>{setFocusedEmail(false)}} 
                                          onFocus={()=>{setFocusedEmail(true)}} 
                                          onChange={(e)=>{setEmail(e.target.value)}}/>
                              </div>
                              <button disabled={isSubmitDisabled || isLoading} className=' py-2 text-center w-full rounded-md text-white my-2.5 bg-red-600 outline-none disabled:cursor-not-allowed disabled:bg-red-400 hover:bg-red-800 hover:cursor-pointer' type='submit'  >Submit Email</button>
                  
                        </form>
                        <button className='text-red-500' onClick={closeModal}>Close Modal</button>
                  </div>
            </Modal>
      </div>
      );
};

export default ResetPasswordToken;
