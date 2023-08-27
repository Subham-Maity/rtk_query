"use client";

import { useGetProductByNameQuery } from "@/redux/slice/api";

export default function Home() {
  const data = useGetProductByNameQuery("");
  console.log("rtk-query data", data);

  return <main></main>;
}
