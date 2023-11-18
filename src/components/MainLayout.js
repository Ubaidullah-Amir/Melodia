
import MusicPlayer from "@/components/MusicPlayer";
import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  const themeStyles =  "dark:bg-gray-700  bg-gray-100 relative"
  const largeStyles =" lg:grid lg:grid-cols-[250px__1fr] lg:grid-rows-[1fr]  lg:pl-4 lg:pt-4 lg:pb-24"
  const mediumStyles = "flex flex-col gap-3"
  return (
    <div className={`${themeStyles} ${mediumStyles} ${largeStyles}`}>
      <Navbar />
      {children}
      <MusicPlayer />
    </div>
  )
}