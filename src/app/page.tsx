"use client";

import { useGetProductByNameQuery } from "@/redux/slice/api";

export default function Home() {
  const { data } = useGetProductByNameQuery("");

  return (
    <main>
      <h1>Home</h1>
      <p>rtk-query data: {JSON.stringify(data)}</p>
    </main>
  );
}
