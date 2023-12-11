/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { SET_GLOBAL_STORE } from './constants';

// The initial state of the App
export const initialState = {
  isSellerMode: import.meta.env.VITE_MODE === 'seller' || false,
  isProducerMode: import.meta.env.VITE_MODE === 'producer' || false,
  isAdminMode: import.meta.env.VITE_MODE === 'admin' || false,
  isLogin: false,
  isAdmin: false,
  isProducer: false,
  currentUser: {},
  products: [],
  systemConfigs: [],
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_GLOBAL_STORE:
        Object.keys(action.payload).forEach(key => {
          draft[key] = action.payload[key];
        })
        break;
    }
  });

export default appReducer;
