import Header from '@/components/Header';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from './api/auth/[...nextauth]/route';
import UserComp from '@/components/UserComp';
import prisma from '@/db/dbConfig';
import Link from 'next/link';
async function fetchUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id:true,
        email: true,
        username: true,
      }})
    return {data:users,isError:false}
  } catch (error) {
    return {error:"Error in finding users",isError:true}
  }
}
const  Home =async () => {
  const session = await getServerSession(authOptions)
  console.log("session in home",session)
  const {data:users,isError,error} = await fetchUsers()
  if(isError){
    return <h1 className='text-center text-red-600'>{error}</h1>
  }
  
  return (
    <div >
      <Header {...session}/>
      <h1 className='text-center'>Home</h1>
      {/* TODO remove users code and go to admin link */}
      <p className='text-center'>Go to :<Link className="text-lg underline text-blue-600" href="/admin">Admin</Link></p>
      {users?.map((user)=>{
        return(
        <div key={user.id}>
          <h1 className='text-center'>UserName:<span className='bg-orange-500'>{user.username}</span></h1>
        </div>
        )
      })}
      {session?<UserComp {...session}/>:null}
    </div>
  );
};

export default Home;