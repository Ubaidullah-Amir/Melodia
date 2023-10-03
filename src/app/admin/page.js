import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const page =async () => {
      const session = await getServerSession(authOptions)
      console.log("session in admin",session)
      return (
            <div>
                  <h1 className="text-center">I am Admin</h1>
            </div>
      );
};

export default page;