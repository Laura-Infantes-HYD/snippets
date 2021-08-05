import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/snippets";

export default configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
