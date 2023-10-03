import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Header from "@/components/Header";
const notFound =async () => {
      const session = await getServerSession(authOptions)
      return (
            <div>
                  <Header {...session}/>
                  <p className="text-center text-3xl">Not found</p>
            </div>
      );
};

export default notFound;