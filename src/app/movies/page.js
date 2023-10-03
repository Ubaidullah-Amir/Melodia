import { getServerSession } from "next-auth/next"
import Header from '@/components/Header'
import { authOptions } from "../api/auth/[...nextauth]/route"
import UserComp from "@/components/UserComp"

export default async function Movies() {
      const session = await getServerSession(authOptions)
      console.log("session",session)
      if (!session) {
            return (
                  <h1>Can't access this page.</h1>
            )
      }

      return (
            <div>
                  <Header {...session}/>
                  <h1>This is  Movies Page.</h1>
                  <UserComp {...session}/>
            </div>
      )
  
}