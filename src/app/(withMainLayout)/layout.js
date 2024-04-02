import Navbar from '@/components/Navbar'
import MusicPlayer from "@/components/MusicPlayer"
import styles from "./styles.module.css"


export default async function RootLayout({ children }) {
  const themeStyles =  "dark:bg-gray-700  bg-gray-100 relative"
  const largeStyles =" lg:grid lg:grid-cols-[250px__minmax(70%,100%)] lg:grid-rows-[1fr]  lg:pl-4 lg:pt-4 lg:pb-24"
  const mediumStyles = "flex flex-col gap-3"
  return (
    <div className={`${themeStyles} ${mediumStyles}  ${largeStyles}`}>
      <Navbar />
      <div className='min-h-screen'>
      {children}
      </div>
      <MusicPlayer styles={styles} />
    </div>
  )
}
