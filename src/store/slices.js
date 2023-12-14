import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  systemConfigs: [],
};

export const storeSlice = createSlice({
  name: "store",
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

export default storeSlice.reducer;

export default storeSlice;
