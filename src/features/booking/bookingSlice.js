import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8000/api/bookings";

const token = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const makeBooking = createAsyncThunk(
  "booking/make-booking",
  async (data) => {
    const response = await axios.post(url, data, config);
    return response.data;
  }
);

export const updateBooking = createAsyncThunk(
  "booking/update-booking",
  async (data) => {
    const response = await axios.put(`${url}/${data._id}`, data, config);
    return response.data;
  }
);

export const viewBookings = createAsyncThunk(
  "booking/view-bookings",
  async () => {
    const response = await axios.get(url, config);
    return response.data;
  }
);

export const viewSingleBooking = createAsyncThunk(
  "booking/view-single-booking",
  async (data) => {
    const response = await axios.get(`${url}/${data}`, config);
    return response.data;
  }
);

export const deleteBooking = createAsyncThunk(
  "booking/delete-booking",
  async (data) => {
    const response = await axios.delete(`${url}/${data}`, config);
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
    success: false,
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeBooking.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(makeBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.values.unshift(action.payload);
      })
      .addCase(makeBooking.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });

    builder
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        let booking = action.payload;
        state.loading = false;
        state.success = true;
        const index = state.values.findIndex(
          (data) => data._id === booking._id
        );
        if (index !== -1) {
          state.values[index] = booking;
        }
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });

    builder
      .addCase(viewBookings.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(viewBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.values = [...action.payload];
      })
      .addCase(viewBookings.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });

    builder
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        let payload = action.payload;
        state.loading = false;
        state.success = true;
        state.values = state.values.filter(
          (value) => value._id !== payload._id
        );
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });

    builder
      .addCase(viewSingleBooking.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(viewSingleBooking.fulfilled, (state, action) => {
        state.value = action.payload;
        state.success = true;
      })
      .addCase(viewSingleBooking.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});
export default bookingSlice.reducer;

export const { setCurrentPage, clearError } = bookingSlice.actions;
