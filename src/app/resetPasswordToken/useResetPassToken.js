import {  useState } from "react"

export default function UseResetPassToken () {
      const [password,setPassword]=useState("")
      const [passShow,setPassShow]=useState(false)
      const [focusedPassword,setFocusedPassword]= useState(false)
      const isSubmitDisabled = !password
      return {password,setPassword,focusedPassword,setFocusedPassword,passShow,setPassShow,isSubmitDisabled}
}