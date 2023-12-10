import { useEffect, useState } from "react"

export default function UseResetPassword () {
      const [email,setEmail]=useState("")
      const [focusedEmail,setFocusedEmail]= useState(false)
      const isSubmitDisabled = !email
      return {email,setEmail,focusedEmail,setFocusedEmail,isSubmitDisabled}
}