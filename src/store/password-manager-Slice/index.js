import api from "@/config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    passwordManager: null,
    error: null,
    search : []
};

export const deleteManager = createAsyncThunk(
  "passwordManager/deletePassword",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/password-manager/delete", {id});
      return response.data;
    } catch (error) {
      console.error("Error fetching passwords:", error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch passwords");
    }
  }
)
export const addManager = createAsyncThunk(
    "passwordManager/addpassword",
    async (formData) => {
        try {
            const res = await api.post('/api/password-manager/add', formData)
            return res.data
        } catch (error) {
            console.error("error", error.response.data.message)
            null
        }

    }
)

export const getManager = createAsyncThunk(
  "passwordManager/getPassword",
  async (search = "", { rejectWithValue }) => {
    try {
      //`/api/password-manager/get?search=${search}`
      const response = await api.get(`/api/password-manager/get?search=${search}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching passwords:", error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch passwords");
    }
  }
);

export const editManager = createAsyncThunk(
  "passwordManager/editPassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/password-manager/edit", formData);
      return response.data;
    } catch (error) {
      console.error("Error fetching passwords:", error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch passwords");
    }
  }
);



const passwordSlice = createSlice({
  name: "passwordManager",
  initialState,
  reducers: {
    getPassword: (state, action) => {
      state.passwordManager = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addManager.pending, (state) => {
        state.error = null; // clear error before new request
      })
      .addCase(addManager.fulfilled, (state, action) => {
        state.passwordManager = action.payload;
      })
      .addCase(addManager.rejected, (state, action) => {
        state.error = action.error.message;
      })
     .addCase(getManager.pending, (state) => {
        state.error = null; // clear error before new request
      })
      .addCase(getManager.fulfilled, (state, action) => {
        state.passwordManager = action.payload;
      })
      .addCase(getManager.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteManager.pending, (state) => {
        state.error = null; // clear error before new request
      })
      .addCase(deleteManager.fulfilled, (state, action) => {
        state.passwordManager = action.payload;
      })
      .addCase(deleteManager.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(editManager.pending, (state) => {
        state.error = null; // clear error before new request
      })
      .addCase(editManager.fulfilled, (state, action) => {
        state.passwordManager = action.payload;
      })
      .addCase(editManager.rejected, (state, action) => {
        state.error = action.error.message;
      })
      
  },
});


export const { getPassword } = passwordSlice.actions;
export default passwordSlice.reducer;
