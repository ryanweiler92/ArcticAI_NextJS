import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  isAuthenticated: false,
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setIsAuthenticated, setEmail } = userSlice.actions;

export default userSlice.reducer;
