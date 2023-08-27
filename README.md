1. `Syntax`
   [Check out the docs](https://redux-toolkit.js.org/tutorials/rtk-query#setting-up-your-store-and-api-service)

```ts
// Import the createApi and fetchBaseQuery functions from the RTK Query library
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// Create an API service using the createApi function
export const productsAPI = createApi({
    // Specify a unique name for the API slice in the Redux store
    reducerPath: "productsAPI",
    // Specify a base query function that will be used to make network requests
    // In this case, we use the fetchBaseQuery function that is a wrapper around the native fetch API
    baseQuery: fetchBaseQuery({
        // Specify the base URL for the API endpoints
        baseUrl: "",
    }),
    // Define the endpoints for the API service using a builder callback
    // The builder provides methods for defining query and mutation endpoints
    endpoints: (builder) => ({}),
});

// Export the auto-generated hooks for the defined endpoints
// The hooks allow us to easily perform queries and mutations in our React components
export const {} = productsAPI;

```

2. Inside the `endpoints` callback, we can define our endpoints using the `builder` object. The `builder` object
   provides methods for defining query and mutation endpoints.

```ts
//here getProductByName is the name of the endpoint and builder.query is the method to define query endpoints and query is the callback function that will be called when the endpoint is used.
getProductByName: builder.query({
    query: () => ``,
})
```

```ts
//here useGetProductByNameQuery is the name of the hook that will be used to call the endpoint 
// syntax: use + endpoint name(First letter capital) + Query
export const {useGetProductByNameQuery} = productsAPI;
```

`final`

```ts
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

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

export const {useGetProductByNameQuery} = productsAPI;

```

