import api from "@/config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// 🔹 Login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/login", formData);
  
      return response.data; // { token, user }

    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// 🔹 Register thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/register", formData);
      return response.data; // { token, user }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// 🔹 Check Auth thunk (restores user on reload)
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/check-auth");
      return response.data; // { user }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Auth check failed");
    }
  }
);
export const logoutAuth = createAsyncThunk(
  "auth/logoutAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/logout");
      return response.data; // { user }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Auth check failed");
    }
  }
);

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
  builder
    // 🔹 Login
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // 🔹 Register
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // 🔹 Check Auth
    .addCase(checkAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(checkAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    })
    .addCase(checkAuth.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    })

    // 🔹 Logout
    .addCase(logoutAuth.pending, (state) => {
      state.loading = true;
    })
    .addCase(logoutAuth.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    })
    .addCase(logoutAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
});

export const { logoutSuccess } = AuthSlice.actions;
export default AuthSlice.reducer;
