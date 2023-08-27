import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const productsAPI = createApi({
  reducerPath: "productsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  endpoints: (builder) => ({}),
});

export const {} = productsAPI;
