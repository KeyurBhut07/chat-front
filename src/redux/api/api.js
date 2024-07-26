import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Ensure you import from /react

import { server } from '../../components/constants/config';

const api = createApi({
  reducerPath: 'api',
  // baseQuery
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}api/v1/`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `jwt ${token}`);
      }
      return headers;
    },
  }),
  // cashing
  tagTypes: ['Chat', 'User'],
  // define API endpoints
  endpoints: (builder) => ({
    // chat endpoint
    myChats: builder.query({
      query: () => 'chats/my',
      providesTags: ['Chat'],
    }),

    // search user
    searchUser: builder.query({
      query: (name) => ({
        url: 'user/search',
        method: 'POST',
        body: { name },
      }),

      providesTags: ['User'],
    }),
  }),
});

export const { useMyChatsQuery, useLazySearchUserQuery } = api;
export default api;
