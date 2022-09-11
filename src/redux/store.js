import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
/* import logger from 'redux-logger'; */
import { setupListeners } from '@reduxjs/toolkit/query';
import phoneReducer from '../redux/contacts/phone-reducer';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import authSlice from './auth/authSlice';
import storage from 'redux-persist/lib/storage';

const middlewareForLogger = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
/* const persistConfig = {
  key: 'contacts',
  storage,
}; */
export const store = configureStore({
  reducer: {
    contacts: phoneReducer,

    auth: persistReducer(authPersistConfig, authSlice),
  },
  middlewareForLogger,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({ serializableCheck: false }),
    /* logger, */
  ],

  //когда продакшн, дев тулзы не нужны
  devTools: process.env.NODE_ENV === 'development',
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
