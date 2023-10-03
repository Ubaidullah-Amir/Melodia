
import Image from "next/image";
import LoginForm from "./loginForm";
const page = () => {

      return (
            <div className=' p-4  text-gray-600 bg-gray-50'>
                  <div className='w-11/12 relative  min-h-[96vh]  md:grid-cols-2 bg-gray-200 m-auto outline-2 gap-2 grid grid-cols-1 shadow-lg  shadow-indigo-500/50  border-8 border-white rounded-3xl  overflow-hidden'>
                        <div className=' hidden md:flex justify-center items-center bg-gradient-to-r from-purple-400  to-purple-300  hover:from-red-400 transition duration-1000 ease-out hover:to-red-300 rounded-r-2xl '>
                              <Image
                                    src="/loginImage.png"
                                    className="w-3/5 aspect-square max-w-sm min-w-[300px]"
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