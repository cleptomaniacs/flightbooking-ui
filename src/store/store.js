import { configureStore } from "@reduxjs/toolkit";
import bookingSlice from "../features/booking/bookingSlice";
import authSlice from "../features/auth/authSlice";

export default configureStore({
  reducer: {
    booking: bookingSlice,
    auth: authSlice,
  },
});
