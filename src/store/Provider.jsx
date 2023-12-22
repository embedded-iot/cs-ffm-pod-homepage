'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from './store'
import {setGlobalStore} from "store/slices";

export default function StoreProvider({ children, value }) {
  const storeRef = useRef()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    storeRef.current.dispatch(setGlobalStore(value))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
