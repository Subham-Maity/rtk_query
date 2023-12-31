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

3. Define the base URL for the API endpoints

```ts
//this will be the base url for the endpoints
baseUrl: "https://jsonplaceholder.typicode.com"
```

```ts
//This will be the endpoint
query: () => `users`
```

`final`

```ts
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productsAPI = createApi({
    reducerPath: "productsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com",
    }),
    endpoints: (builder) => ({
        getProductByName: builder.query({
            query: () => `users`,
        }),
    }),
});

export const {useGetProductByNameQuery} = productsAPI;
```

4. Create store and use it in the provider then wrap the layout with the provider

```ts
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {},
});
```

``ReduxProvider.tsx``

```tsx
"use client";
import React from "react";

import {store} from "../store";
/* Core */
import {Provider} from "react-redux";

/* Instruments */

export const ReduxProvider = (props: React.PropsWithChildren) => {
    return <Provider store={store}>{props.children}</Provider>;
};

```

```Layout.tsx```

```tsx
import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import React from "react";
import {ReduxProvider} from "@/redux/Provider/ReduxProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <ReduxProvider>
            <body className={inter.className}>{children}</body>
        </ReduxProvider>
        </html>
    );
}
```

5. Inside the store reducer add the api reducer

```ts
//Generate the reducer as a specific top-level key in the store
[productsAPI.reducerPath]
:
productsAPI.reducer
```

`final`

```ts
//store.ts
import {configureStore} from "@reduxjs/toolkit";
import {productsAPI} from "@/redux/slice/api";

export const store = configureStore({
    reducer: {
        [productsAPI.reducerPath]: productsAPI.reducer,
    },
});
```

6. After the reducer use the middleware

```ts
// Adding the api middleware enables caching, invalidation, polling,and other useful features of `rtk-query`.
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsAPI.middleware)
```

```ts
setupListeners(store.dispatch);
```

```ts
// takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
```

`final`

```ts
//store.ts
import {configureStore} from "@reduxjs/toolkit";
import {productsAPI} from "@/redux/slice/api";

export const store = configureStore({
    reducer: {
        [productsAPI.reducerPath]: productsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsAPI.middleware),
});
setupListeners(store.dispatch);
```

7. Now we can use the hook in our component

Open `page.tsx`

```tsx
//Once a service has been defined, you can import the hooks to make a request.
const data = useGetProductByNameQuery("");
console.log(data);
```

Now destruct the data and use it in the component

```tsx
const {data} = useGetProductByNameQuery("");
console.log(data);
```

> You can see the data in the console of the browser
`page.tsx`

```tsx
"use client";

import {useGetProductByNameQuery} from "@/redux/slice/api";

export default function Home() {
    const {data} = useGetProductByNameQuery("");

    return (
        <main>
            <h1>Home</h1>
            <p>rtk-query data: {JSON.stringify(data)}</p>
        </main>
    );
}

```

8. Now you can iterate over the data and show it in the component

make a `type.ts`

```ts
// types.ts
export interface UserData {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}
```

```tsx
"use client";

import {useGetProductByNameQuery} from "@/redux/slice/api";
import {UserData} from "@/app/types";

export default function Home() {
    const {data} = useGetProductByNameQuery("");
    //usually happens when the API call hasn't finished fetching the data yet
    //To resolve this issue, you need to ensure that you're handling the loading state correctly. One way to do this is by checking whether the data is present before trying to map over it. 
    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {data.map((item: UserData) => (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <p>{item.email}</p>
                    <p>{item.company.catchPhrase}</p>
                    <p>{item.address.city}</p>
                </div>
            ))}
        </div>);
}
```

### Check out the preview [here](https://rtk-query-tutorial.vercel.app/)







