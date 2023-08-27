import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsAPI = createApi({
  reducerPath: "productsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  endpoints: (builder) => ({
    getProductByName: builder.query({
      query: () => ``,
    }),
  }),
});

export const { useGetProductByNameQuery } = productsAPI;
