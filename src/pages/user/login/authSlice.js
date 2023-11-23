// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  tokenExpiration: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokenData: (state) => {
      const tokenExpiration = sessionStorage.getItem('tokenExpiration');
      const accessToken = sessionStorage.getItem('accessToken');
        
      // Check if tokenExpiration and accessToken exist before updating the state
      if (tokenExpiration && accessToken) {
        state.accessToken = accessToken;
        state.tokenExpiration = tokenExpiration;
      }
    },
    clearTokenData: (state) => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('tokenExpiration');
      state.accessToken = null;
      state.tokenExpiration = null;
    },
  },
});

export const { setTokenData, clearTokenData } = authSlice.actions;
export default authSlice.reducer;
