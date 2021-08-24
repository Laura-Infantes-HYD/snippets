import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const endpoints = (builder) => ({
  getSnippets: builder.query({
    query: () => "snippets",
    providesTags: ["Snippets"],
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
    query: (id) => ({
      url: `snippets/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Snippets"],
  }),

  updateSnippet: builder.mutation({
    query: ({ id, ...patch }) => ({
      url: `snippets/${id}`,
      method: "PATCH",
      body: patch,
    }),
    invalidatesTags: ["Snippets"],
  }),

  getLanguages: builder.query({
    query: () => "languages",
    providesTags: ["Languages"],
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
  tagTypes: ["Snippets", "Languages"],

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
} = baseApi;
