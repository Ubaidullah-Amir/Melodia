import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth-slice";
import {MelodiaApi} from "./features/api" 
import UIReducer from "./features/ui-slice"

export const store  = configureStore({
      reducer:{
            [authReducer.name]:authReducer.reducer,
            [UIReducer.name]:UIReducer.reducer,
            [MelodiaApi.reducerPath]: MelodiaApi.reducer,
      },
      // Adding the api middleware enables caching, invalidation, polling,
      // and other useful features of `rtk-query`.
      middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(MelodiaApi.middleware),
})