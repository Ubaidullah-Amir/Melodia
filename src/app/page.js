"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";


function Default(){
  const router = useRouter()
  useEffect(()=>router.replace("/home"),[])
  return (
    <>
      <p>Default page</p>
    </>
  );
};

export default Default;