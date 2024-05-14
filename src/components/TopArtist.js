"use client"
import { useGetTopArtistQuery } from "@/redux/features/api"
import Image from "next/image"
import { useRouter } from "next/navigation"


function  TopArtist({styles}) {
    const {
        data:ArtistData,
        error,
        isError,
        isLoading ,
        isFetching,
        
    } = useGetTopArtistQuery()
console.log("top artist ",ArtistData)
    const router = useRouter()

    return (
        <div className='md:w-1/2  flex flex-col justify-evenly flex-shrink-[2]'>
            <h1 className='p-3 font-bold'>Top Artists</h1>
            <div  className={`${styles.scrollbarContainer} w-full snap-mandatory snap-x gap-2 flex min-h-[200px] overflow-x-scroll py-2`}>
              
              {ArtistData?.map((artist)=>{
                return (
                    <div className='snap-center shrink-0 hover:cursor-pointer'
                    onClick={()=>{router.push(artist.url)}}>
                    <Image
                        src={artist.image[2]["#text"]}
                        className="w-52 h-52 rounded object-cover shadow-lg dark:shadow-gray-600"
                        width={400}
                        height={400}
                        alt="Albumn picture"
                    />
                <p className='font-semibold pt-2'>{artist.name}</p>
              </div>
                )
              })}
              
            </div>
          </div>
    )
}

export default TopArtist