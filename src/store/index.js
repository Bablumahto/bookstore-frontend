import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./Auth";
const store = configureStore({
  reducer: {
    auth: authreducer,
  },
});
export default store;
