
import Image from "next/image";
import LoginForm from "./loginForm";
const page = () => {

      return (
            <div className=' p-4  text-gray-600 bg-gray-50'>
                  <div className='w-11/12 relative  min-h-[95vh]  md:grid-cols-2 bg-gray-200 m-auto outline-2 gap-2 grid grid-cols-1 shadow-lg  shadow-indigo-500/50  border-8 border-white rounded-3xl  overflow-hidden'>
                        <div className=' hidden md:block  h-full '>
                              <Image
                                    src="/loginImage.jpg"
                                    className="w-full object-cover  h-full min-w-[300px]"
                                    width={400}
                                    height={400}
                                    alt="Icon"
                              />
                        </div>
                        <LoginForm/>
                  </div>
            </div>
      );
};
export default page;