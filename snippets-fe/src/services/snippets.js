import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import buildUrl from "../utils/buildUrl";

const endpoints = (builder) => ({
  getSnippets: builder.query({
    query: (queries) => ({
      url: `snippets${buildUrl(queries)}`,
    }),
    providesTags: ["Snippets"],
  }),

  getFavouriteSnippets: builder.query({
    query: ({ page = 1 }) => `snippets?page=${page}&isFavourite=true`,
    providesTags: ["Favourites"],
  }),

  addSnippet: builder.mutation({
    query: (body) => ({
      url: `snippets`,
      method: "POST",
      body,
    }),
    invalidatesTags: ["Snippets"],
  }),

  removeSnippet: builder.mutation({
    query: (_id) => ({
      url: `snippets/${_id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Snippets"],
  }),

  updateSnippet: builder.mutation({
    query: ({ _id, ...patch }) => ({
      url: `snippets/${_id}`,
      method: "PATCH",
      body: patch,
    }),
    invalidatesTags: ["Snippets", "Favourites"],
  }),

  getLanguages: builder.query({
    query: () => "languages",
    transformResponse: (data) => data.map(({ language }) => language),
    providesTags: ["Languages"],
  }),

  getTags: builder.query({
    query: () => "tags",
    providesTags: ["Tags"],
  }),

  createUser: builder.mutation({
    query: (body) => ({
      url: `users`,
      method: "POST",
      body,
    }),
    invalidatesTags: ["User"],
  }),

  confirmUser: builder.mutation({
    query: (id) => ({
      url: `users/confirm/${id}`,
      method: "PATCH",
    }),
    invalidatesTags: ["User"],
  }),

  login: builder.mutation({
    query: (userCredentials) => ({
      url: `users/login/`,
      method: "POST",
      body: userCredentials,
    }),
    invalidatesTags: ["User"],
  }),

  getProfile: builder.mutation({
    query: (token) => ({
      url: "/users/profile",
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }),

    providesTags: ["User"],
  }),
});

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "snippetsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    prepareHeaders(headers) {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Snippets", "Languages", "Favourites", "Tags", "User"],
  endpoints: endpoints,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSnippetsQuery,
  useAddSnippetMutation,
  useRemoveSnippetMutation,
  useGetLanguagesQuery,
  useUpdateSnippetMutation,
  useGetFavouriteSnippetsQuery,
  useGetTagsQuery,
  useCreateUserMutation,
  useConfirmUserMutation,
  useLoginMutation,
  useGetProfileMutation,
} = baseApi;
