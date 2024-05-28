import { PLAYLIST_FAVOURITE } from '@/helper/ImportantStrings';
import { useGetPlaylistByIdQuery, useGetPlaylistQuery } from '@/redux/features/api';
import { useEffect, useMemo, useState } from 'react';

export const useFavouriteInMusicPlayer = (videoId) => {
  const [error , setError] = useState(null)
  const [isError , setIsError ] = useState(false)
  // Fetch the list of playlists
  const {
    data: playlistArr,
    error: gettingPlaylistError,
    isError: isErrorGettingPlaylist,
    isLoading: isLoadingGettingPlaylist,
    isFetching: isFetchingGettingPlaylist,
  } = useGetPlaylistQuery({
    skip: true, // Skip query if ID is not available
  });

  // Extract the favourite playlist ID
  const favouritePlaylistId = useMemo(() => {
    if (playlistArr && playlistArr.length > 0) {
      const favouritePlaylist = playlistArr.find(playlist => playlist.playlistName === PLAYLIST_FAVOURITE);
      return favouritePlaylist ? favouritePlaylist.playlistId : null;
    }
    return null;
  }, [playlistArr]);
 
  // Fetch the favourite playlist by ID if the ID is available
  const {
    data: playlistData,
    error: getPlaylistError,
    isError: isErrorPlaylistData,
    isSuccess: getPlaylistisSuccess,
    isLoading: getPlaylistisLoading,
    isFetching: getPlaylisistFetching,
  } = useGetPlaylistByIdQuery(favouritePlaylistId, {
    skip: !favouritePlaylistId, // Skip query if ID is not available
  });
  
  useEffect(() => {
    if (isErrorGettingPlaylist ) {
      setIsError(true)
      setError(gettingPlaylistError?.data?.error)
    }
    
  }, [isErrorGettingPlaylist]);

  // Check if the videoId is in the favourite playlist
  const isFavourite = useMemo(() => {
    if (playlistData && playlistData.playlist.playlistName === PLAYLIST_FAVOURITE && playlistData.playlist.song.length > 0) {
      return playlistData.playlist.song.some(songObj => songObj.youtubeId === videoId);
    }
    return false;
  }, [playlistData, videoId]);

  return {data:isFavourite,isError,error};
};
