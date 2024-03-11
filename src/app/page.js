
// import { useSession } from 'next-auth/react';
import styles from '@/app/styles.module.css'
import TopAlbums from '@/components/TopAlbums';
import Topbar from '@/components/Topbar';
import Image from 'next/image';
import googleApiURL from '@/lib/youtubeDataApi';
import { Toaster } from 'react-hot-toast';
import PlayListRender from '@/components/PlayListRender';


async function getPopularSongs(){
  const response = await fetch(googleApiURL)
  const data  = await response.json()
  return data
}

async function Home(){
  const popularSongs = await getPopularSongs()
  return (
    // <Layout >
    <>
      <Toaster/>
      <div className='  rounded-md p-3'>
        <Topbar toggleStyle={styles.toggleStyle}/>
        <TopAlbums styles={styles} popularSongs={popularSongs}/>

        
        <div className='  flex flex-col-reverse  md:flex md:flex-row  md:gap-3 mt-3 shadow-lg p-3 pb-10 rounded-md'>
          
          <PlayListRender styles={styles}/>
          <div className='md:w-1/2  flex flex-col justify-evenly flex-shrink-[2]'>
            <h1 className='p-3 font-bold'>Top Artists</h1>
            <div  className={`${styles.scrollbarContainer} w-full snap-mandatory snap-x gap-2 flex min-h-[200px] overflow-x-scroll py-2`}>
              <div className='snap-center shrink-0'>
                <Image
                      src="/loginImage.jpg"
                      className="w-52 h-52 rounded object-cover shadow-lg dark:shadow-gray-600"
                      width={400}
                      height={400}
                      alt="Albumn picture"
                />
                <p className='font-semibold pt-2'>Albumn Name</p>
                <p className='text-gray-400 text-sm'>Albumn Name Information</p>
              </div>
              <div className='snap-center shrink-0'>
                <Image
                      src="/loginImage.jpg"
                      className="w-52 h-52 rounded object-cover shadow-lg dark:shadow-gray-600 "
                      width={400}
                      height={400}
                      alt="Albumn picture"
                />
                <p className='font-semibold pt-2'>Albumn Name</p>
                <p className='text-gray-400 text-sm'>Albumn Name Information</p>
              </div>
              <div className='snap-center shrink-0'>
                <Image
                      src="/loginImage.jpg"
                      className="w-52 h-52 rounded object-cover shadow-lg dark:shadow-gray-600 "
                      width={400}
                      height={400}
                      alt="Albumn picture"
                />
                <p className='font-semibold pt-2'>Albumn Name</p>
                <p className='text-gray-400 text-sm'>Albumn Name Information</p>
              </div>
              <div className='snap-center shrink-0'>
                <Image
                      src="/loginImage.jpg"
                      className="w-52 h-52 rounded object-cover shadow-lg dark:shadow-gray-600 "
                      width={400}
                      height={400}
                      alt="Albumn picture"
                />
                <p className='font-semibold pt-2'>Albumn Name</p>
                <p className='text-gray-400 text-sm'>Albumn Name Information</p>
              </div>
              <div className='snap-center shrink-0'>
                <Image
                      src="/loginImage.jpg"
                      className="w-52 h-52 rounded object-cover shadow-lg dark:shadow-gray-600 "
                      width={400}
                      height={400}
                      alt="Albumn picture"
                />
                <p className='font-semibold pt-2'>Albumn Name</p>
                <p className='text-gray-400 text-sm'>Albumn Name Information</p>
              </div>
              <div className='snap-center shrink-0'>
                <Image
                      src="/loginImage.jpg"
                      className="w-52 h-52 rounded object-cover shadow-lg dark:shadow-gray-600 "
                      width={400}
                      height={400}
                      alt="Albumn picture"
                />
                <p className='font-semibold pt-2'>Albumn Name</p>
                <p className='text-gray-400 text-sm'>Albumn Name Information</p>
              </div>
              
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Home;