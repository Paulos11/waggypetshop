import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import userService from './userService';
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await userService.getUsers();
  return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (userData) => {
  const response = await userService.addUser(userData);
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userData }) => {
  const response = await userService.updateUser(id, userData);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await userService.deleteUser(id);
  return id;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.list.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(user => user._id !== action.payload);
      });
  },
});

export const selectUsers = (state) => state.users.list;
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;

export default userSlice.reducer;
