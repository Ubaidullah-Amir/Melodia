"use client"
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import HamburgerMenu from './Hamburger';
import { useRouter } from 'next/navigation';

const Topbar = ({toggleStyle}) => {
      const [showSettings,setShowSettings]=useState(false)
      const {theme, setTheme} = useTheme()
      const router = useRouter()
      function onSearchHandle(e) {
            e.preventDefault()
            const searchValue = e.target[0].value
            if(searchValue.trim()){
                  router.push(`/search?q=${searchValue}`);
            }
      }
      // console.log(theme)
      return (
            <div className='  flex h-14 justify-between  items-center p-3 gap-3'>
                  {/* <div className='flex items-center flex-shrink basis-full'> */}
                  <label className='hidden h-5 w-5 sm:block' htmlFor='search'>
                        <svg  className="h-full w-full " version="1.1" viewBox="0 0 512 512"  xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="currentColor" d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z"/></svg>
                  </label>
                  <form className='basis-full' onSubmit={onSearchHandle}>
                  <input id='search'  className="bg-transparent  shadow-md focus:shadow-lg dark:focus:border-b-2 dark:bg-gray-900 dark:rounded-none   rounded-full p-2 px-3  w-full  focus:outline-none "  placeholder='Search for any song,artist etc...'/>
                  </form>
                  {/* </div> */}
                  <div className='flex gap-2 items-center relative'>
                        {showSettings?
                        <div className='absolute z-10 bg-white w-32 bg-inherit top-full translate-y-3 right-0 p-3 dark:bg-blue-950 border-2 shadow-md'>
                              <div className='flex justify-between  border-b-2 py-2'>
                                    <p className='text-xs'>Dark Mode</p>
                                    <div className={toggleStyle}>
                                          <input type="checkbox" id="darkModeSwitch" checked={theme === "dark" ?true : false}
                                                onChange={(e) =>setTheme(e.target.checked? 'dark':'light'  )}/>
                                          <label htmlFor="darkModeSwitch">Toggle</label>
                                    </div>
                                    
                              </div>
                              <div className='flex justify-between border-b-2 py-2'>
                                    <p className='text-xs'>Other setting toggle</p>
                                    <div className={toggleStyle}>
                                          <input type="checkbox" id="changeThisID" onClick={() => {}}/>
                                          <label htmlFor="changeThisID">Toggle</label>
                                    </div>
                                    
                              </div>
                              
                        </div>
                        :null
                        }
                        {/* notification */}
                        <svg  className='h-5 w-5 ' version="1.1" viewBox="0 0 60 78" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><title/><g id="Layer_2"><g id="Layer_3"><path fill="currentColor" d="M54.2,54.4l-5.1-6.3c-0.5-0.7-0.8-1.5-0.8-2.4v-13c0-8.1-5.4-15.3-13.2-17.5v-5.1c0-2.8-2.3-5-5-5s-5,2.3-5,5v5    c-7.9,2.3-13.3,9.5-13.2,17.6v13c0,0.9-0.3,1.7-0.8,2.4l-5.1,6.3c-0.4,0.5-0.7,1.2-0.7,1.9v7.9h49.8v-7.9    C54.9,55.6,54.6,54.9,54.2,54.4z M28,10.1c0-1.1,0.9-2,2-2s2,0.9,2,2v4.5c-1.4-0.2-2.7-0.2-4.1,0V10.1z M51.9,61.1H8.1v-4.8    l5.1-6.3c1-1.2,1.5-2.7,1.5-4.3v-13c0-8.4,6.8-15.3,15.3-15.3s15.3,6.8,15.3,15.3v13c0,1.6,0.5,3.1,1.5,4.3l5.1,6.3V61.1z"/><path fill="currentColor" d="M28,20.8v3c6.1,0,11.1,5,11.1,11.1c0,0,0,0,0,0h3C42.1,27.1,35.8,20.8,28,20.8C28,20.8,28,20.8,28,20.8z"/><path fill="currentColor" d="M30,69.9c-2.9,0-5.2-2.3-5.2-5.2h-3c0,4.5,3.7,8.2,8.2,8.2c4.5,0,8.2-3.7,8.2-8.2h-3C35.2,67.6,32.9,69.9,30,69.9z"/></g></g></svg>
                        {/* settings */}
                        <svg onClick={()=>{setShowSettings((prevState)=>!prevState)}} className={(showSettings?"rotate-180":"")+' h-5 w-5  transition dark:text-gray-100 text-gray-700'} viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><title/><path fill="currentColor" d="M262.29,192.31a64,64,0,1,0,57.4,57.4A64.13,64.13,0,0,0,262.29,192.31ZM416.39,256a154.34,154.34,0,0,1-1.53,20.79l45.21,35.46A10.81,10.81,0,0,1,462.52,326l-42.77,74a10.81,10.81,0,0,1-13.14,4.59l-44.9-18.08a16.11,16.11,0,0,0-15.17,1.75A164.48,164.48,0,0,1,325,400.8a15.94,15.94,0,0,0-8.82,12.14l-6.73,47.89A11.08,11.08,0,0,1,298.77,470H213.23a11.11,11.11,0,0,1-10.69-8.87l-6.72-47.82a16.07,16.07,0,0,0-9-12.22,155.3,155.3,0,0,1-21.46-12.57,16,16,0,0,0-15.11-1.71l-44.89,18.07a10.81,10.81,0,0,1-13.14-4.58l-42.77-74a10.8,10.8,0,0,1,2.45-13.75l38.21-30a16.05,16.05,0,0,0,6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16,16,0,0,0-6.07-13.94l-38.19-30A10.81,10.81,0,0,1,49.48,186l42.77-74a10.81,10.81,0,0,1,13.14-4.59l44.9,18.08a16.11,16.11,0,0,0,15.17-1.75A164.48,164.48,0,0,1,187,111.2a15.94,15.94,0,0,0,8.82-12.14l6.73-47.89A11.08,11.08,0,0,1,213.23,42h85.54a11.11,11.11,0,0,1,10.69,8.87l6.72,47.82a16.07,16.07,0,0,0,9,12.22,155.3,155.3,0,0,1,21.46,12.57,16,16,0,0,0,15.11,1.71l44.89-18.07a10.81,10.81,0,0,1,13.14,4.58l42.77,74a10.8,10.8,0,0,1-2.45,13.75l-38.21,30a16.05,16.05,0,0,0-6.05,14.08C416.17,247.67,416.39,251.83,416.39,256Z" /></svg>
                        <HamburgerMenu/>
                        </div>
            
            </div>
      );
};

export default Topbar;