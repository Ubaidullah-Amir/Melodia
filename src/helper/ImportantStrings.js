// email types
export const EMAIL_TYPE_VERIFY = "EMAIL_TYPE_VERIFY"
export const EMAIL_TYPE_FORGETPASSWORD = "EMAIL_TYPE_FORGETPASSWORD"

// errors
export const ERROR_IN_SENDEMAIL = "ERROR_IN_SENDEMAIL" // error in sendEmail function
export const USER_NOT_EXIST     =   "USER_NOT_EXIST"  // in resetpassword route and clientside handling
export const EMAIL_NOT_SENT     =   "EMAIL_NOT_SENT"  // in resetpassword route and clientside handling
export const RESET_PASSWORD_TOKEN_EXPIRED = "RESET_PASSWORD_TOKEN_EXPIRED" // reset password token verify route and clientside handling

// resource not found on server
export const NOT_FOUND = "NOT_FOUND" // error in finding the playlist etc



//user logged in status
export const UNAUTHENTICATED = "unauthenticated"

// Invalid stucture of request
export const INVALIDREQUEST = "INVALID_REQUEST"