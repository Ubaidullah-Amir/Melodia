
// import { useSession } from 'next-auth/react';
import styles from '@/app/styles.module.css'
import TopAlbums from '@/components/TopAlbums';
import Topbar from '@/components/Topbar';
import Image from 'next/image';
import googleApiURL from '@/lib/youtubeDataApi';


async function getPopularSongs(){
  const response = await fetch(googleApiURL)
  const data  = await response.json()
  return data
}

async function Home(){
  const popularSongs = await getPopularSongs()
  return (
    // <Layout >
      <div className='  rounded-md p-3'>
        <Topbar toggleStyle={styles.toggleStyle}/>
        <TopAlbums styles={styles} popularSongs={popularSongs}/>

        
        <div className='flex gap-3 mt-3 shadow-lg p-3 pb-10 rounded-md'>
          
          <div className= 'w-1/2 h-96 overflow-y-hidden'>
            <h2 className='p-3 font-bold'>Songs in queue</h2>
            <div className={`${styles.scrollbarContainer}  flex flex-col gap-2 snap-mandatory snap-x h-96  overflow-y-scroll pb-20`}>
            {/* song card */}
            <div className='flex py-2 px-4  rounded-full items-center bg-white dark:bg-blue-950'>
              {/* play/pause svg */}
              <svg className='w-9 '  fill="none"  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <Image
                className='rounded-[50%] border-2 ml-2'
                      src={"/NoUserImage.jpeg"}
                      width={50}
                      height={50}
                      alt="Picture of the author"
                />
                <div className='flex flex-col basis-full text-sm ml-2'><p >Popular song</p><p className='text-gray-400'>Popular song</p></div>
                <p className='text-gray-500 text-xs'>4.25</p>
                <svg className='w-9' version="1.1" viewBox="0 0 512 512"  xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="currentColor" d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"/></svg>
            </div>
            {/* song card */}
            {/* song card */}
            <div className='flex py-2 px-4  rounded-full items-center bg-white dark:bg-blue-950'>
              {/* play/pause svg */}
              <svg className='w-9 '  fill="none"  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <Image
                className='rounded-[50%] border-2 ml-2'
                      src={"/NoUserImage.jpeg"}
                      width={50}
                      height={50}
                      alt="Picture of the author"
                />
                <div className='flex flex-col basis-full text-sm ml-2'><p >Popular song</p><p className='text-gray-400'>Popular song</p></div>
                <p className='text-gray-500 text-xs'>4.25</p>
                <svg className='w-9' version="1.1" viewBox="0 0 512 512"  xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="currentColor" d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"/></svg>
            </div>
            {/* song card */}
            {/* song card */}
            <div className='flex py-2 px-4  rounded-full items-center bg-white dark:bg-blue-950'>
              {/* play/pause svg */}
              <svg className='w-9 '  fill="none"  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <Image
                className='rounded-[50%] border-2 ml-2'
                      src={"/NoUserImage.jpeg"}
                      width={50}
                      height={50}
                      alt="Picture of the author"
                />
                <div className='flex flex-col basis-full text-sm ml-2'><p >Popular song</p><p className='text-gray-400'>Popular song</p></div>
                <p className='text-gray-500 text-xs'>4.25</p>
                <svg className='w-9' version="1.1" viewBox="0 0 512 512"  xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="currentColor" d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"/></svg>
            </div>
            {/* song card */}
            {/* song card */}
            <div className='flex py-2 px-4  rounded-full items-center bg-white dark:bg-blue-950'>
              {/* play/pause svg */}
              <svg className='w-9 '  fill="none"  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <Image
                className='rounded-[50%] border-2 ml-2'
                      src={"/NoUserImage.jpeg"}
                      width={50}
                      height={50}
                      alt="Picture of the author"
                />
                <div className='flex flex-col basis-full text-sm ml-2'><p >Popular song</p><p className='text-gray-400'>Popular song</p></div>
                <p className='text-gray-500 text-xs'>4.25</p>
                <svg className='w-9' version="1.1" viewBox="0 0 512 512"  xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="currentColor" d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"/></svg>
            </div>
            {/* song card */}
            {/* song card */}
            <div className='flex py-2 px-4  rounded-full items-center bg-white dark:bg-blue-950'>
              {/* play/pause svg */}
              <svg className='w-9 '  fill="none"  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <Image
                className='rounded-[50%] border-2 ml-2'
                      src={"/NoUserImage.jpeg"}
                      width={50}
                      height={50}
                      alt="Picture of the author"
                />
                <div className='flex flex-col basis-full text-sm ml-2'><p >Popular song</p><p className='text-gray-400'>Popular song</p></div>
                <p className='text-gray-500 text-xs'>4.25</p>
                <svg className='w-9' version="1.1" viewBox="0 0 512 512"  xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="currentColor" d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"/></svg>
            </div>
            {/* song card */}
            {/* song card */}
            <div className='flex py-2 px-4  rounded-full items-center bg-white dark:bg-blue-950'>
              {/* play/pause svg */}
              <svg className='w-9 '  fill="none"  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <Image
                className='rounded-[50%] border-2 ml-2'
                      src={"/NoUserImage.jpeg"}
                      width={50}
                      height={50}
                      alt="Picture of the author"
                />
                <div className='flex flex-col basis-full text-sm ml-2'><p >Popular song</p><p className='text-gray-400'>Popular song</p></div>
                <p className='text-gray-500 text-xs'>4.25</p>
                <svg className='w-9' version="1.1" viewBox="0 0 512 512"  xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="currentColor" d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"/></svg>
            </div>
            {/* song card */}

            
            
            </div>
          </div>
          <div className='w-1/2  flex flex-col justify-evenly flex-shrink-[2]'>
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
    // </Layout>
  );
};

export default Home;