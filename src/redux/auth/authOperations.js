import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk('auth/register', async credentials => {
  try {
    const { data } = await axios.post('/users/signup', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    // TODO: Добавить обработку ошибки error.message
  }
});

const logIn = createAsyncThunk('auth/login', async credentials => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    // TODO: Добавить обработку ошибки error.message
  }
});

const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch (error) {
    // TODO: Добавить обработку ошибки error.message
  }
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      /* console.log('Токена нет, уходим из fetchCurrentUser'); */
      return thunkAPI.rejectWithValue();
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      // TODO: Добавить обработку ошибки error.message
    }
  }
);

const operations = {
  register,
  logIn,
  logOut,
  fetchCurrentUser,
};
export default operations;
/* export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
  }),

  endpoints: builder => ({
    fetchCurrentUser: builder.query({
      query: () => `/users/current`,
    }),

    signUp: builder.mutation({
      query: newUser => ({
        url: `/users/signup`,
        method: 'POST',
        body: newUser,
      }),
    }),
    signIn: builder.mutation({
      query: registeredUseruser => ({
        url: `/users/login`,
        method: 'POST',
        body: registeredUseruser,
      }),
    }),

    logOut: builder.mutation({
      query: token => ({
        url: `/users/logout`,
        method: 'POST',
        body: token,
      }),
    }),
  }),
});
export const {
  useFetchCurrentUserQuery,
  useSignUpMutation,
  useSignInMutation,
  useLogOutMutation,
} = authApi;
 */
