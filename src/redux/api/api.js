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

    // send friend request
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: 'user/send-request',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // getnotification user
    getNotifications: builder.query({
      query: () => ({
        url: 'user/notifications',
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),

    // acceptfriend request
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: 'user/accept-request',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Chat'],
    }),
  }),
});

export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
} = api;
export default api;
