// store.js
import { configureStore } from "@reduxjs/toolkit";
import api from "../services/api";
import jobApi from "../services/jobs";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, jobApi.middleware),
});

export default store;
