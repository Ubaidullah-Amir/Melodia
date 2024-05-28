"use client"
import { UNAUTHENTICATED } from '@/helper/ImportantStrings';
import { useGetPlaylistQuery } from '@/redux/features/api';
import { toggleHamMenu } from '@/redux/features/ui-slice';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
      const {
            data:playlistArr,
            error:gettingPlaylistError,
            isError: isErrorGettingPlaylist,
            isLoading:isLoadingGettingPlaylist ,
            isFetching:isFetchingGettingPlaylist,
            
      } = useGetPlaylistQuery()

      const {status:loggedInStatus,data:UserData} = useSession()

      const isLoggedIn = loggedInStatus != UNAUTHENTICATED
      const router = useRouter()

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
                              src={UserData?.user.image? UserData.user.image:"/NoUserImage.jpeg"}
                              width={50}
                              height={50}
                              alt="Picture of the author"
                        />
                        <p className='text-sm font-bold'>{UserData?UserData.user.username:"Guest"}</p>
                        <p className='text-xs text-blue-400'>{UserData?.user.email}</p>
                  </div>
                  <ul className='flex flex-col text-sm gap-2 w-full'>
                        {/* title */}
                        <p className='p-2  font-bold'>Browse</p>

                        <li className={path == "/home" ? "font-bold border-l-2 border-blue-600" : "text-gray-500 hover:border-l-2 hover:bg-gray-200"}><Link className='flex pl-3 items-center ' href="/home">
                              <svg className='h-7 w-7 pr-1' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path fill="currentColor" d="M395.49,450H125.8a15,15,0,0,1-15-15V197a15,15,0,0,1,30,0V420H380.49V197a15,15,0,1,1,30,0V435A15,15,0,0,1,395.49,450Z"/><path fill="currentColor" d="M445.11,261.65a15,15,0,0,1-10.61-4.39L260.64,83.4,86.78,257.26a15,15,0,0,1-21.21-21.21L250,51.58a15,15,0,0,1,21.21,0L455.72,236.05a15,15,0,0,1-10.61,25.6Z"/><path fill="currentColor" d="M304.15,450h-87a15,15,0,0,1-15-15V305.48a15,15,0,0,1,15-15h87a15,15,0,0,1,15,15V435A15,15,0,0,1,304.15,450Zm-72-30h57V320.48h-57Z"/></g></svg>
                              Home </Link></li>
                        <li className={path == "/youtube" ? "font-bold border-l-2 border-blue-600" : "text-gray-500 hover:border-l-2 hover:bg-gray-200 transition-all"}><Link className='flex pl-3 items-center ' href="/youtube">
                        <svg className='h-7 w-7 pr-1' viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="currentColor" d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z" ></path> <path fill="currentColor" d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" ></path> </g></svg>
                              Youtube </Link></li>
                        <li className={path == "/customize" ? "font-bold border-l-2 border-blue-600" : "text-gray-500 hover:border-l-2 hover:bg-gray-200 transition-all"}><Link className='flex pl-3 items-center ' href="/customize">
                              <svg className='h-7 w-7 pr-1'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path  fill="currentColor" d="M79.2,32.8c-0.2-0.7-1.101-0.9-1.7-0.4L67.4,42.5c-0.801,0.8-2,0.8-2.801,0l-7.1-7.1c-0.8-0.8-0.8-2,0-2.8 l10.2-10.2c0.5-0.5,0.3-1.4-0.4-1.7C65.6,20.3,63.8,20,62,20c-10.6,0-19.1,9.2-17.9,20c0.2,1.7,0.6,3.2,1.2,4.7L22,68.1 c-2.7,2.7-2.7,7.2,0,9.9c1.4,1.4,3.2,2.1,5,2.1s3.6-0.699,5-2.1l23.3-23.3c1.5,0.6,3.101,1,4.7,1.2C70.9,57.1,80,48.6,80,38 C80,36.2,79.7,34.4,79.2,32.8z"></path> </g></svg>
                              Customize </Link></li>
                        

                        {/* playlist */}
                        {(!isErrorGettingPlaylist && !isLoadingGettingPlaylist && !isFetchingGettingPlaylist)&& <>
                        
                        <p className='p-2 font-bold'>Playlist</p>
                        {playlistArr?.map((playlistObject)=>(
                              <li key={playlistObject.playlistId} className={path == `/playlist/${playlistObject.playlistId}` ? "font-bold border-l-2 border-blue-600" : "text-gray-500 hover:border-l-2 hover:bg-gray-200 transition-all"}>
                                    <Link className='flex pl-3 items-center ' href={`/playlist/${playlistObject.playlistId}`}>

                                    <svg className='h-7 w-7 pr-1 ' viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 19C9 20.1046 7.65685 21 6 21C4.34315 21 3 20.1046 3 19C3 17.8954 4.34315 17 6 17C7.65685 17 9 17.8954 9 19ZM9 19V5L21 3V17M21 17C21 18.1046 19.6569 19 18 19C16.3431 19 15 18.1046 15 17C15 15.8954 16.3431 15 18 15C19.6569 15 21 15.8954 21 17ZM9 9L21 7"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                    {playlistObject.playlistName}
                                    </Link>
                              </li>
                        
                        ))}
                        
                        </>}



                        <button className='bg-slate-400 pt-2 pb-2 rounded' onClick={() => {
                              if(isLoggedIn){
                                    signOut()
                              }else{
                                    router.replace("/login")
                              }

                              }}>{isLoggedIn?"Sign Out":"Log In"}</button>

                  </ul>
            </div>
            </>
      );
};

export default Navbar;