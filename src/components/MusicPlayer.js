import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from '@/app/styles.module.css'
const MusicPlayer = () => {
      const {data:session} = useSession()
      
      return (
            <div className=' bg-white dark:bg-gray-800 fixed bottom-0 w-full h-20 flex py-2  pr-6 pl-4 items-center gap-3 z-10 rounded-md '>
                  <Image
                  className='rounded-[50%]   border-2 '
                        src={"/NoUserImage.jpeg"}
                        width={50}
                        height={50}
                        alt="Picture of the author"
                  />
                  <div className='flex flex-col mr-3 text-sm '><p className='font-semibold'>Popular song</p><p className='text-gray-400'>Popular song</p></div>
                  <div className='flex gap-1 item-center text-sm'>
                        {/* backward svg */}
                        <svg className='w-7 rotate-180'   version="1.1" viewBox="0 0 512 512"  xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="currentColor"  d="M436.3,96h-8.1c-6.7,0-12.2,5-12.2,11.7v113.5L228.9,98.7c-2.5-1.7-5.1-2.3-8.1-2.3c-8.3,0-15.4,7-15.4,17v63.1  L86.9,98.3c-2.5-1.7-5.1-2.3-8.1-2.3c-8.3,0-14.9,7.4-14.9,17.4v286c0,10,6.7,16.5,15,16.5c3.1,0,5.4-1.2,8.2-2.9l118.3-77.6v64  c0,10,7.2,16.5,15.5,16.5c3.1,0,5.5-1.2,8.2-2.9L416,290.8v113c0,6.7,5.4,12.2,12.2,12.2h8.1c6.7,0,11.7-5.5,11.7-12.2V107.7  C448,101,443.1,96,436.3,96z"/></svg>
                        
                        {/* play svg */}
                        {/* <svg className='w-9 none'  fill="none"  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"/></svg> */}
                        
                        {/* pause song svg */}
                        <svg className='w-12' viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path fill="currentColor" d="M18 32h4V16h-4v16zm6-28C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm2-8h4V16h-4v16z"/></svg>
                        {/* forward svg */}
                        <svg className='w-7'   version="1.1" viewBox="0 0 512 512"  xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="currentColor"  d="M436.3,96h-8.1c-6.7,0-12.2,5-12.2,11.7v113.5L228.9,98.7c-2.5-1.7-5.1-2.3-8.1-2.3c-8.3,0-15.4,7-15.4,17v63.1  L86.9,98.3c-2.5-1.7-5.1-2.3-8.1-2.3c-8.3,0-14.9,7.4-14.9,17.4v286c0,10,6.7,16.5,15,16.5c3.1,0,5.4-1.2,8.2-2.9l118.3-77.6v64  c0,10,7.2,16.5,15.5,16.5c3.1,0,5.5-1.2,8.2-2.9L416,290.8v113c0,6.7,5.4,12.2,12.2,12.2h8.1c6.7,0,11.7-5.5,11.7-12.2V107.7  C448,101,443.1,96,436.3,96z"/></svg>
                  
                  </div>
                  <div className={`${styles.musicRangeInput} grow`} ><input className='w-full'  type='range'/></div>
                  <p className='text-gray-500 text-xs'>4.25</p>
                  <div><svg className='w-7' version="1.1" viewBox="0 0 512 512"  xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="currentColor" d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"/></svg></div>
            </div>
      );
};

export default MusicPlayer;