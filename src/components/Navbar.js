"use client"
import { toggleHamMenu } from '@/redux/features/ui-slice';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
      const path = usePathname()
      const dispatch = useDispatch()
      const session = useSession()
      const isHamMenuOpen = useSelector(state=>state.ui.isHamMenuOpen)
      const stylesColorTheme = "bg-white dark:bg-gray-800"
      const stylesLargeScreen=" lg:static lg:w-64 flex flex-col items-center gap-10 p-2 rounded-lg lg:block"
      // medium screen is default styles
      const stylesMediumScreen=` absolute  z-40 w-60 h-full ${!isHamMenuOpen?"hidden":null}`


      return (
            <>
            <div className={`absolute  z-30 w-screen h-full  bg-gray-900 opacity-25 lg:hidden ${!isHamMenuOpen?"hidden":null}`}
                  onClick={() =>dispatch(toggleHamMenu())}
            ></div>
            <div className={`${stylesColorTheme} ${stylesLargeScreen} ${stylesMediumScreen} `}>
                  
                  <div className='flex flex-col items-center m-[-8px]'>
                        <Image
                        className='rounded-[50%] border-2 border-blue-500'
                              src={session.data?.user.image? session.data.user.image:"/NoUserImage.jpeg"}
                              width={50}
                              height={50}
                              alt="Picture of the author"
                        />
                        <p className='text-sm font-bold'>Ubaidullah Amir</p>
                        <p className='text-xs text-blue-400'>ubaid123456@gamil.com</p>
                  </div>
                  <ul className='flex flex-col text-sm gap-2 w-full'>
                        {/* title */}
                        <p className='p-2  font-bold'>Browse</p>

                        <li className={path == "/home" ? "font-bold border-l-2 border-blue-600" : "text-gray-500 hover:border-l-2 hover:bg-gray-200"}><Link className='flex pl-3 items-center ' href="/home">
                              <svg className='h-7 w-7 pr-1' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path fill="currentColor" d="M395.49,450H125.8a15,15,0,0,1-15-15V197a15,15,0,0,1,30,0V420H380.49V197a15,15,0,1,1,30,0V435A15,15,0,0,1,395.49,450Z"/><path fill="currentColor" d="M445.11,261.65a15,15,0,0,1-10.61-4.39L260.64,83.4,86.78,257.26a15,15,0,0,1-21.21-21.21L250,51.58a15,15,0,0,1,21.21,0L455.72,236.05a15,15,0,0,1-10.61,25.6Z"/><path fill="currentColor" d="M304.15,450h-87a15,15,0,0,1-15-15V305.48a15,15,0,0,1,15-15h87a15,15,0,0,1,15,15V435A15,15,0,0,1,304.15,450Zm-72-30h57V320.48h-57Z"/></g></svg>
                              Home </Link></li>
                        <li className={path == "/youtube" ? "font-bold border-l-2 border-blue-600" : "text-gray-500 hover:border-l-2 hover:bg-gray-200 transition-all"}><Link className='flex pl-3 items-center ' href="/youtube">
                              <svg className='h-7 w-7 pr-1' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path fill="currentColor" d="M395.49,450H125.8a15,15,0,0,1-15-15V197a15,15,0,0,1,30,0V420H380.49V197a15,15,0,1,1,30,0V435A15,15,0,0,1,395.49,450Z"/><path fill="currentColor" d="M445.11,261.65a15,15,0,0,1-10.61-4.39L260.64,83.4,86.78,257.26a15,15,0,0,1-21.21-21.21L250,51.58a15,15,0,0,1,21.21,0L455.72,236.05a15,15,0,0,1-10.61,25.6Z"/><path fill="currentColor" d="M304.15,450h-87a15,15,0,0,1-15-15V305.48a15,15,0,0,1,15-15h87a15,15,0,0,1,15,15V435A15,15,0,0,1,304.15,450Zm-72-30h57V320.48h-57Z"/></g></svg>
                              youtube </Link></li>
                        <li className={path == "/home1" ? "font-bold border-l-2 border-blue-600" : "text-gray-500 hover:border-l-2 hover:bg-gray-200 transition-all"}><Link className='flex pl-3 items-center ' href="/home1">
                              <svg className='h-7 w-7 pr-1' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path fill="currentColor" d="M395.49,450H125.8a15,15,0,0,1-15-15V197a15,15,0,0,1,30,0V420H380.49V197a15,15,0,1,1,30,0V435A15,15,0,0,1,395.49,450Z"/><path fill="currentColor" d="M445.11,261.65a15,15,0,0,1-10.61-4.39L260.64,83.4,86.78,257.26a15,15,0,0,1-21.21-21.21L250,51.58a15,15,0,0,1,21.21,0L455.72,236.05a15,15,0,0,1-10.61,25.6Z"/><path fill="currentColor" d="M304.15,450h-87a15,15,0,0,1-15-15V305.48a15,15,0,0,1,15-15h87a15,15,0,0,1,15,15V435A15,15,0,0,1,304.15,450Zm-72-30h57V320.48h-57Z"/></g></svg>
                              Home1 </Link></li>
                        <li className={path == "/home1" ? "font-bold border-l-2 border-blue-600" : "text-gray-500 hover:border-l-2 hover:bg-gray-200 transition-all"}><Link className='flex pl-3 items-center ' href="/home1">
                              <svg className='h-7 w-7 pr-1' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path fill="currentColor" d="M395.49,450H125.8a15,15,0,0,1-15-15V197a15,15,0,0,1,30,0V420H380.49V197a15,15,0,1,1,30,0V435A15,15,0,0,1,395.49,450Z"/><path fill="currentColor" d="M445.11,261.65a15,15,0,0,1-10.61-4.39L260.64,83.4,86.78,257.26a15,15,0,0,1-21.21-21.21L250,51.58a15,15,0,0,1,21.21,0L455.72,236.05a15,15,0,0,1-10.61,25.6Z"/><path fill="currentColor" d="M304.15,450h-87a15,15,0,0,1-15-15V305.48a15,15,0,0,1,15-15h87a15,15,0,0,1,15,15V435A15,15,0,0,1,304.15,450Zm-72-30h57V320.48h-57Z"/></g></svg>
                              Home1 </Link></li>

                        {/* title */}
                        <p className='p-2 font-bold'>Discover</p>

                        <li className={path == "/home1" ? "font-bold border-l-2 border-blue-600" : "text-gray-500 hover:border-l-2 hover:bg-gray-200 transition-all"}><Link className='flex pl-3 items-center ' href="/home1">
                              <svg className='h-7 w-7 pr-1' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path fill="currentColor" d="M395.49,450H125.8a15,15,0,0,1-15-15V197a15,15,0,0,1,30,0V420H380.49V197a15,15,0,1,1,30,0V435A15,15,0,0,1,395.49,450Z"/><path fill="currentColor" d="M445.11,261.65a15,15,0,0,1-10.61-4.39L260.64,83.4,86.78,257.26a15,15,0,0,1-21.21-21.21L250,51.58a15,15,0,0,1,21.21,0L455.72,236.05a15,15,0,0,1-10.61,25.6Z"/><path fill="currentColor" d="M304.15,450h-87a15,15,0,0,1-15-15V305.48a15,15,0,0,1,15-15h87a15,15,0,0,1,15,15V435A15,15,0,0,1,304.15,450Zm-72-30h57V320.48h-57Z"/></g></svg>
                              Home1 </Link></li>
                        <li className={path == "/home1" ? "font-bold border-l-2 border-blue-600" : "text-gray-500 hover:border-l-2 hover:bg-gray-200 transition-all"}><Link className='flex pl-3 items-center ' href="/home1">
                              <svg className='h-7 w-7 pr-1' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path fill="currentColor" d="M395.49,450H125.8a15,15,0,0,1-15-15V197a15,15,0,0,1,30,0V420H380.49V197a15,15,0,1,1,30,0V435A15,15,0,0,1,395.49,450Z"/><path fill="currentColor" d="M445.11,261.65a15,15,0,0,1-10.61-4.39L260.64,83.4,86.78,257.26a15,15,0,0,1-21.21-21.21L250,51.58a15,15,0,0,1,21.21,0L455.72,236.05a15,15,0,0,1-10.61,25.6Z"/><path fill="currentColor" d="M304.15,450h-87a15,15,0,0,1-15-15V305.48a15,15,0,0,1,15-15h87a15,15,0,0,1,15,15V435A15,15,0,0,1,304.15,450Zm-72-30h57V320.48h-57Z"/></g></svg>
                              Home1 </Link></li>
                        <li className={path == "/home1" ? "font-bold border-l-2 border-blue-600" : "text-gray-500 hover:border-l-2 hover:bg-gray-200 transition-all"}><Link className='flex pl-3 items-center ' href="/home1">
                              <svg className='h-7 w-7 pr-1' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path fill="currentColor" d="M395.49,450H125.8a15,15,0,0,1-15-15V197a15,15,0,0,1,30,0V420H380.49V197a15,15,0,1,1,30,0V435A15,15,0,0,1,395.49,450Z"/><path fill="currentColor" d="M445.11,261.65a15,15,0,0,1-10.61-4.39L260.64,83.4,86.78,257.26a15,15,0,0,1-21.21-21.21L250,51.58a15,15,0,0,1,21.21,0L455.72,236.05a15,15,0,0,1-10.61,25.6Z"/><path fill="currentColor" d="M304.15,450h-87a15,15,0,0,1-15-15V305.48a15,15,0,0,1,15-15h87a15,15,0,0,1,15,15V435A15,15,0,0,1,304.15,450Zm-72-30h57V320.48h-57Z"/></g></svg>
                              Home1 </Link></li>
                        <li className={path == "/home1" ? "font-bold border-l-2 border-blue-600" : "text-gray-500 hover:border-l-2 hover:bg-gray-200 transition-all"}><Link className='flex pl-3 items-center ' href="/home1">
                              <svg className='h-7 w-7 pr-1' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path fill="currentColor" d="M395.49,450H125.8a15,15,0,0,1-15-15V197a15,15,0,0,1,30,0V420H380.49V197a15,15,0,1,1,30,0V435A15,15,0,0,1,395.49,450Z"/><path fill="currentColor" d="M445.11,261.65a15,15,0,0,1-10.61-4.39L260.64,83.4,86.78,257.26a15,15,0,0,1-21.21-21.21L250,51.58a15,15,0,0,1,21.21,0L455.72,236.05a15,15,0,0,1-10.61,25.6Z"/><path fill="currentColor" d="M304.15,450h-87a15,15,0,0,1-15-15V305.48a15,15,0,0,1,15-15h87a15,15,0,0,1,15,15V435A15,15,0,0,1,304.15,450Zm-72-30h57V320.48h-57Z"/></g></svg>
                              Home </Link></li>
                        <button className='bg-slate-400 pt-2 pb-2 rounded' onClick={() => signOut()}>Sign out</button>

                  </ul>
            </div>
            </>
      );
};

export default Navbar;