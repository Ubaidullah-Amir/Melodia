"use client"
import Topbar from "@/components/Topbar"
import styles from '@/app/(withMainLayout)/styles.module.css'
import SearchResult from "@/components/SearchResult"
import { useEffect } from "react"
import { useGetGoogleApiSearchQuery } from "@/redux/features/api"

function Search({searchParams}) {
    
    const { q:search} = searchParams
    const { 
        data:searchSongs,
        error,
        isError,
        isSuccess,
        isLoading,
        isFetching,
  }  = useGetGoogleApiSearchQuery(search)
  console.log("error",error)
    return (
    <div className='  rounded-md p-3'>
        <Topbar toggleStyle={styles.toggleStyle}/>
        {isSuccess && <SearchResult styles={styles} searchSongs={searchSongs}/>}

    </div>
    )
}

export default Search