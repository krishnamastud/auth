import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    initialized: false,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.initialized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("auth/register/pending", (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/register/fulfilled", (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase("auth/register/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
      })
      .addCase("auth/login/pending", (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/login/fulfilled", (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase("auth/login/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
      })
      .addCase("auth/initialize/pending", (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/initialize/fulfilled", (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.initialized = true;
      })
      .addCase("auth/initialize/rejected", (state, action) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.initialized = true;
      });
  },
});

export const { setAccessToken, setInitialized, logout } = authSlice.actions;
export default authSlice.reducer;
