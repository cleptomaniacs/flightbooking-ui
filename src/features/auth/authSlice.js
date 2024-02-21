import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8000/api/auth";

export const registerUser = createAsyncThunk("auth/register", async (data) => {
  let regUrl = `${url}/register`;
  const response = await axios.post(regUrl, data);
  return response.data;
});

export const login = createAsyncThunk("auth/login", async (data) => {
  let loginUrl = `${url}/login`;
  const response = await axios.post(loginUrl, data);
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    error: "",
    success: false,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    clearToken: (state) => {
      state.user = {};
      localStorage.clear();
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        let payload = action.payload;
        state.loading = false;
        state.success = true;
        state.user = payload.user;
        localStorage.setItem("token", payload.token);
        localStorage.setItem("id", payload.user._id);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
export const { clearError, clearToken } = authSlice.actions;
