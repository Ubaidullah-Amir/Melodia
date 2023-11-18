import { createSlice } from "@reduxjs/toolkit";

const initialState={
      isHamMenuOpen: false,
      theme: "light",
}
export const UIReducer = createSlice({
      name:"ui",
      initialState,
      reducers:{
            changeTheme: (state,action)=>{
                  state.theme=action.payload;
            },
            toggleHamMenu:(state)=>{
                  state.isHamMenuOpen=!state.isHamMenuOpen
            }
      }
})
// reducers are the functionality of the slice of data
export const {changeTheme,toggleHamMenu} = UIReducer.actions
export default UIReducer
