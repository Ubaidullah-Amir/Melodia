import { configureStore } from "@reduxjs/toolkit"
import {MelodiaApi} from "./features/api" 
import UIReducer from "./features/ui-slice"
import MusicReducer from "./features/music-slice";
import PlaylistReducer from "./features/playlist";
import QueueReducer from "./features/queueList-slice";

export const store  = configureStore({
      reducer:{
            [UIReducer.name]:UIReducer.reducer,
            [MusicReducer.name]:MusicReducer.reducer,
            [PlaylistReducer.name]:PlaylistReducer.reducer,
            [QueueReducer.name]:QueueReducer.reducer,
            [MelodiaApi.reducerPath]: MelodiaApi.reducer,
      },
      // Adding the api middleware enables caching, invalidation, polling,
      // and other useful features of `rtk-query`.
      middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(MelodiaApi.middleware),
})
