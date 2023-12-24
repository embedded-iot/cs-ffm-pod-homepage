import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deviceType: 'desktop',
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  products: [],
  systemConfigs: [],
  categories: [],
  collections: [],
};

export const storeSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setGlobalStore(state, action) {
      Object.keys(action.payload).forEach(key => {
        state[key] = action.payload[key];
      })
    },
  }
});
export const { setGlobalStore } = storeSlice.actions;

export default storeSlice;

