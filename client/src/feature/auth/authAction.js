import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/axios";
import { setAccessToken, setInitialized } from "./authSlice";

export const registerAction = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/auth/register", userData);
      console.log("Registration response:", response.data); // Log the response data for debugging
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Registration failed");
    }
  },
);

export const loginAction = createAsyncThunk(
  "auth/login",
  async (userData, thunApi) => {
    try {
        const res = await api.post("/auth/login", userData);
        return res.data;
    } catch (error) {
        return thunApi.rejectWithValue("login failed");
    }
  },
);

export const initializeAuth = createAsyncThunk( "auth/initialize", async (_, thunkAPI) => {
  try {
    const refrechRes = await api.get("/auth/refresh-token");
    const accessToken = refrechRes.data.accessToken;

    thunkAPI.dispatch(setAccessToken(accessToken));

    const meRes = await api.get("/auth/get-me" )

    return {
      accessToken,
      user: meRes.data.user
    };
  } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Authentication failed"
      );
    } 
})