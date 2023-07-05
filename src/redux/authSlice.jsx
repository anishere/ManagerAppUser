import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      return {token: response.data.token, email};
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = async () => {
  // Không gọi API ở đây vì đây chỉ là một ví dụ đơn giản
    await localStorage.removeItem('persist:root');
};

const initialState = {
  isAuthenticated: false,
  token: '',
  email: '',
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.email = action.payload.email;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  },
});

export const { authHandleLogin } = authSlice.actions

export default authSlice.reducer;
