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
  tagTypes: ['Chats'],
  // define API endpoints
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => 'chats/my',
      providesTags: ['Chats'],
    }),
  }),
});

export const { useMyChatsQuery } = api;
export default api;
