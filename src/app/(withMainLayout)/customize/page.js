"use client"
import { UNAUTHENTICATED } from "@/helper/ImportantStrings";
import {  useGetTagsQuery, useUpdateTagsMutation } from "@/redux/features/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Customize(){
    const router = useRouter()


    const [newTagName,setNewTagName] = useState()
    const {
        data:UserPreference,
        error:gettingTagsError,
        isError: isErrorGettingTags,
        isLoading:isLoadingGettingTags ,
        isFetching:isFetchingGettingTags,
        
    } = useGetTagsQuery()
    const DisplayTagsCondition = !isLoadingGettingTags && !isFetchingGettingTags && !isErrorGettingTags 
    const [
        UpdataTagsMutation,{
        isLoading: isTagUpdateLoading,
        isSuccess:hasTagAdded,
        isError:isErrorAddingTag,
        error:TagAddingError,
        }] = useUpdateTagsMutation()

    const [TagsData,setTagsData] = useState([])

    useEffect(()=>{
        if(!(isLoadingGettingTags || isFetchingGettingTags || isErrorGettingTags)){
            console.log(!(isLoadingGettingTags || isFetchingGettingTags || isErrorGettingTags),UserPreference)
            setTagsData(UserPreference.tags)
        }
    },[isLoadingGettingTags,isFetchingGettingTags])

    useEffect(()=>{
        if(isErrorAddingTag || isErrorGettingTags){

            // 
            const condition1 = gettingTagsError?.data?.error === UNAUTHENTICATED
            
            const condition2 = TagAddingError?.data?.error === UNAUTHENTICATED
            if( condition1 || condition2){
                router.replace("/login")
            }
        }

    },[isErrorAddingTag , isErrorGettingTags])
    useEffect(()=>{
        if (hasTagAdded ){
            toast.success("Tags are updated")
        }
    },[hasTagAdded])
    // useEffect(()=>{
    //     if (isErrorGettingTags ){
    //         toast.error("Tags are not updated")
    //     }
    // },[isErrorGettingTags])

    function OnHandleApplyChanges() {
        const obj ={ preferenceId:UserPreference.preferenceId, updatedTags:TagsData }
        UpdataTagsMutation(obj)
        
    }
    function onHandleInputChange(index,val) {
        const newTags = [...TagsData]; // Create a copy of the current tags array
        newTags[index] = val; // Update the value at the specified index
        if (!val) {
            newTags.splice(index, 1);
        }
        
        setTagsData(newTags)
    }
    function  handleCreateTag() {
        if(newTagName){
            setTagsData((prevState)=>([...prevState,newTagName]))
        }
        setNewTagName("")
    }

    return (
        <div className="p-3">
            {}
        <Toaster/>
        <h1 className='mb-4 font-bold'>Customize</h1>
        <div className=" p-3">
            <h2 className='mb-4 '>Custom Tags</h2>
        {!DisplayTagsCondition && <p>Loading ...</p>}

        {DisplayTagsCondition && TagsData.map((tag,index)=>(tag.trim() && <input 
            key={index}
            type="text" 
            placeholder="Enter tags" 
            value={tag.trim()} 
            onChange={(e)=>{onHandleInputChange(index,e.target.value)}} 
            className="mr-2 m-2 px-2 py-1 border border-gray-300 rounded-md" 
        />))
        }
        <div className="flex flex-col gap-2 md:flex-row items-stretch m-2 mt-4 mb-4">
            <input 
                type="text" 
                placeholder="Enter New Tag" 
                value={newTagName} 
                onChange={(e) => setNewTagName(e.target.value.trim())} 
                className="mr-2  px-2 py-1 max-w-[240px]  border border-gray-300 rounded-md" 
            />
            <button type="button" className="bg-blue-500  text-white max-w-[240px] px-4 py-2 rounded-md" onClick={handleCreateTag}>Create A New Tag</button>
        </div>
        <div className="m-2 ">
        <button type="button" className="bg-green-500 text-white p-2 rounded" onClick={OnHandleApplyChanges}>Apply Changes</button>
                        
        </div>



        </div>
        </div>
    );
  };
  
  export default Customize;