import { configureStore } from '@reduxjs/toolkit'
import slices from "store/slices";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [slices.name]: slices.reducer
    },
    devTools: true,
  })
}
