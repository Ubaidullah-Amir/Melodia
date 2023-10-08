"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { signIn, signOut } from "next-auth/react"
const Header = ({user}) => {
      return (
            <div className='flex px-3 bg-fuchsia-800 py-1 justify-between w-full'>
                  <Link 
                  href="/"
                  className='flex items-center gap-2'>
                        <Image
                              className='rounded-full'
                              src="/cinemaLogo.jpg"
                              width={50}
                              height={50}
                              alt="Picture of the author"
                        />Cini-Plex
                  </Link>
                  <div className='flex items-center gap-3'>
                        <Link className='p-1 hover:underline underline-offset-1' href="/movies">Movies</Link>
                        <Link className='p-1 hover:underline underline-offset-1' href="/post">post</Link>
                        <Link className='p-1 hover:underline underline-offset-1 flex items-center gap-1 ' href="/profile">
                              <Image
                                    className='rounded-full'
                                    src="/cinemaLogo.jpg"
                                    width={30}
                                    height={30}
                                    alt="Picture of the author"
                              />Profile</Link>
                        {user?
                              <button onClick={()=>{signOut()}} className='p-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md'>Log Out</button>:
                              <button onClick={()=>{signIn()}} className='p-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md'>Log In</button>
                        }
                        
                  </div>
            </div>
      );
};

export default Header;