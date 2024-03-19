import { UNAUTHENTICATED } from "@/helper/ImportantStrings";
import { useAddSongToPlaylistMutation, useGetPlaylistQuery } from "@/redux/features/api";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function PlaylistModal({ songDetails,isModalOpen, closeModal }) {

    const router = useRouter()


    const modalRef = useRef(null);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    const {
        data:playlistArr,
        error:gettingPlaylistError,
        isError: isErrorGettingPlaylist,
        isLoading:isLoadingGettingPlaylist ,
        isFetching:isFetchingGettingPlaylist,
        
    } = useGetPlaylistQuery()

    const [
        addSongToPlaylistMutation,{
        isLoading: isSongAdding,
        isSuccess:hasSongAdded,
        isError:isErrorAddingSongToPlaylist,
        error:songAddingError,
        }] = useAddSongToPlaylistMutation()

    useEffect(()=>{
        if(isLoadingGettingPlaylist || isFetchingGettingPlaylist) return

        const playlistObjectArray = playlistArr?.map(obj => {
            return { name:obj.playlistName, checked: false };
        });
        setPlaylists(playlistObjectArray)

    },[isLoadingGettingPlaylist,isFetchingGettingPlaylist])
    
    const [playlists, setPlaylists] = useState();

    const handleCheckboxChange = (index) => {
        // Toggle the checked state of the playlist
        const updatedPlaylists = [...playlists];
        updatedPlaylists[index].checked = !updatedPlaylists[index].checked;
        setPlaylists(updatedPlaylists);
    };

    const handleCreatePlaylist = () => {
        if (newPlaylistName.trim() !== '') {
            // Convert newPlaylistName to lowercase
            const lowercasePlaylistName = newPlaylistName.toLowerCase();
    
            // Check if the new playlist name already exists in the playlists array
            const playlistExists = playlists.some(playlist => playlist.name.toLowerCase() === lowercasePlaylistName);
            
            // If the playlist doesn't exist, add it to the playlists array
            if (!playlistExists) {
                setPlaylists([...playlists, { name: lowercasePlaylistName, checked: false }]);
            }
            
            // Reset the new playlist name input field
            setNewPlaylistName('');
        }
    };

    function handleAddToPlaylist() {

        const arr = playlists?.map(item => {
            return item.checked ? item.name : null;
        }).filter(name => name !== null);
        const playlistObj={
            playlist: arr,
            songObj:songDetails
        }
        console.log("playlistObj", playlistObj);
        
        addSongToPlaylistMutation(playlistObj)
        
    }

    useEffect(() =>{
        if(hasSongAdded){
            toast.success("Song successfully added")
        }
    },[hasSongAdded])




    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isModalOpen]);

    
    // if(errorGettingPlaylist){
    //     return
    // }


    // if(errorGettingPlaylist){
    //     return
    // }

    useEffect(()=>{
        if(isErrorAddingSongToPlaylist || isErrorGettingPlaylist){

            // letting the user use the app 
            // const condition1 = gettingPlaylistError?.data?.error === UNAUTHENTICATED
            const condition2 = songAddingError?.data?.error === UNAUTHENTICATED
            if( condition2){
                router.replace("/login")
            }
        }

    },[isErrorAddingSongToPlaylist , isErrorGettingPlaylist])

    
    

    return (
        <>
            {isModalOpen &&
                <dialog open={isModalOpen} className="modal fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
                
                <div ref={modalRef} className="bg-white relative m-auto p-4 md:p-8">
                    <svg
                        className="w-8 h-8 absolute top-0 right-0 cursor-pointer"
                        version="1.1"
                        viewBox="0 0 24 24"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        onClick={() => {
                            closeModal()
                        }}
                        style={{
                            transition: 'fill 0.3s ease',
                            fill: 'black', // Set the default fill color
                        }}
                        onMouseOver={(e) => e.currentTarget.style.fill = 'red'} // Change fill on hover
                        onMouseOut={(e) => e.currentTarget.style.fill = 'black'} // Reset fill on hover out
                    >
                        <g id="grid_system" />
                        <g id="_icons">
                            <path
                                d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z"
                            />
                        </g>
                    </svg>
                    {!isErrorGettingPlaylist && !isErrorAddingSongToPlaylist?
                    
                    <div className="flex flex-col items-center">
                        <p className="font-bold pb-3">Add to Playlists</p>
                        <ul>
                            {playlists?.map((playlistItem, index) => (
                                <li key={index} className="flex items-center mb-2">
                                    <input 
                                        type="checkbox" 
                                        id={`playlist-${index}`} 
                                        checked={playlistItem.checked} 
                                        onChange={() => handleCheckboxChange(index)}
                                        className="mr-2 cursor-pointer" 
                                    />
                                    <label htmlFor={`playlist-${index}`} className="cursor-pointer capitalize">{playlistItem.name}</label>
                                </li>
                            ))}
                        </ul>
                        <p className="text-gray-600 text-sm">Or</p>
                        <div className="flex flex-col md:flex-row items-center mb-4">
                            <input 
                                type="text" 
                                placeholder="Enter playlist name" 
                                value={newPlaylistName} 
                                onChange={(e) => setNewPlaylistName(e.target.value)} 
                                className="mr-2 px-2 py-1 border border-gray-300 rounded-md" 
                            />
                            <button type="button" className="bg-blue-500 mt-2 text-white px-4 py-2 rounded-md" onClick={handleCreatePlaylist}>Create Playlist</button>
                        </div>
                        <button type="button" className="bg-red-500 text-white p-2" onClick={handleAddToPlaylist}>Add to Playlist</button>
                        {isSongAdding && <p className="text-blue-800">Song is adding to Playlist please wait</p>}
                    </div>:
                    <p className="text-red-700 ">Error is getting the playlists.Please try again later.</p>
                    }
                </div>
            </dialog>
            }
        </>
    );
}

export default PlaylistModal;
