import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import Cookies from 'js-cookie';

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/profile'); 
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const token = response.data.token;
    Cookies.set('token', token, { expires: 30 });
    localStorage.setItem('token', token);
    Cookies.set('token', token, { expires: 7 });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (profileData, { rejectWithValue }) => {
  try {
    const response = await api.put('/profile', profileData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updatePassword = createAsyncThunk('auth/updatePassword', async (passwordData, { rejectWithValue }) => {
  try {
    const response = await api.put('/profile/password', passwordData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      Cookies.remove('token');
      localStorage.removeItem('token');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
