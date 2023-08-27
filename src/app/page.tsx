"use client";

import { useGetProductByNameQuery } from "@/redux/slice/api";
import { UserData } from "@/app/types";

export default function Home() {
  const { data } = useGetProductByNameQuery("");
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <div className="bg-gray-900 min-h-screen p-6">
        <div className="max-w-3xl mx-auto bg-gray-900  rounded-lg shadow-md p-6">
          <h1 className="text-neutral-300 font-bold text-4xl flex justify-center">
            RtK Query
          </h1>

          <div className="grid grid-cols-2 gap-4 mt-6 border-2 border-gray-700 m-2 p-2">
            {data.map((item: UserData) => (
              <div key={item.id} className="p-4 bg-gray-800 rounded shadow-md">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-500">{item.email}</p>
                <p className="mt-2">{item.company.catchPhrase}</p>
                <p className="mt-2">{item.address.city}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
