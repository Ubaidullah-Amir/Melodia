// import { useSession } from 'next-auth/react';
import styles from '@/app/(withMainLayout)/styles.module.css'
import TopAlbums from '@/components/TopAlbums';
import Topbar from '@/components/Topbar';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import PlayListRender from '@/components/PlayListRender';
import BaseURL from '../../../../BaseURL';
import { headers } from "next/headers"
import { QUOTA_EXCEEDED } from '@/helper/ImportantStrings';
import TopArtist from '@/components/TopArtist';

async function getPopularSongs(){
  try {
    const response = await fetch(`${BaseURL}/googleApi`, { cache: 'no-store',headers: new Headers(headers()) })
    const data  = await response.json()
    if (!response.ok) {
      throw new Error(QUOTA_EXCEEDED);
    }
    return data
  } catch (error) {
    return error.message
    
  }
  
}


async function Home(){
  const popularSongs = await getPopularSongs()
  
  return (
    // <Layout >
    <>
      <Toaster/>
      <div className='  rounded-md p-3'>
        <Topbar toggleStyle={styles.toggleStyle}/>
        {popularSongs != QUOTA_EXCEEDED ?
        <TopAlbums styles={styles} popularSongs={popularSongs}/>:
        <p className='text-red-600'>Youtube API Error :{QUOTA_EXCEEDED}</p>
        }

        
        <div className='  flex flex-col-reverse  md:flex md:flex-row  md:gap-3 mt-3 shadow-lg p-3 pb-10 rounded-md'>
          
          <PlayListRender styles={styles}/>
          <TopArtist styles={styles}/>
          
        </div>
        
      </div>
    </>
  );
};

export default Home;