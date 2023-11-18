import { createSlice } from "@reduxjs/toolkit";

const initialState={
      value:{
            isAuth: false,
            username: 'abc',
            email: 'acb'
      }
}
export const authReducer = createSlice({
      name:"auth",
      initialState,
      reducers:{
            logOut: ()=>{
                  return initialState
            },
            logIn:(state,action)=>{
                  console.log("action",action)
                  return {
                        value:{
                              isAuth: true,
                              username: action.payload.username,
                              email: action.payload.email
                        }
                        
                  }
            }
      }
})
// reducers are the functionality of the slice of data
export const {logIn,logOut} = authReducer.actions
export default authReducer
