import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8000/api/bookings";

export const makeBooking = createAsyncThunk(
  "booking/make-booking",
  async (data) => {
    const response = await axios.post(url, data);
    return response.data;
  }
);

export const viewBookings = createAsyncThunk(
  "booking/view-bookings",
  async () => {
    const response = await axios.get(url);
    return response.data;
  }
);

export const viewSingleBooking = createAsyncThunk(
  "booking/view-single-booking",
  async (data) => {
    const response = await axios.get(`${url}/${data}`);
    return response.data;
  }
);

export const deleteBooking = createAsyncThunk(
  "booking/delete-booking",
  async (data) => {
    const response = await axios.delete(`${url}/${data}`);
    return response.data;
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    values: [],
    value: {},
    currentPage: 1,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.values.unshift(action.payload);
      })
      .addCase(makeBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(viewBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.values = [...action.payload];
      })
      .addCase(viewBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.values = state.values.filter(
          (value) => value._id !== action.payload
        );
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default bookingSlice.reducer;

export const { setCurrentPage } = bookingSlice.actions;
