import React from "react";
import Link from "next/link";
import { NextPage } from "next";

// Mock genetics data
const geneticsData = [
  {
    id: "1",
    title: "Encrypted Genome #1",
    description: "Human genome, encrypted, 2024-06-01",
    owner: "0x1234...abcd",
  },
  {
    id: "2",
    title: "Encrypted Genome #2",
    description: "Mouse genome, encrypted, 2024-05-20",
    owner: "0xabcd...5678",
  },
  {
    id: "3",
    title: "Encrypted Genome #3",
    description: "Plant genome, encrypted, 2024-04-15",
    owner: "0x9876...4321",
  },
];

const ConsumersPage: NextPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Select Encrypted Genetics Data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {geneticsData.map(data => (
          <Link
            key={data.id}
            href={`/researchers/${data.id}`}
            className="block bg-base-100 border border-base-300 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer"
          >
            <div className="mb-4 h-24 flex items-center justify-center bg-base-200 rounded-lg text-base-content/60">
              <span className="text-lg">🔒 Encrypted Data</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
            <p className="mb-2 text-base-content/80">{data.description}</p>
            <div className="text-xs text-base-content/60 mb-4">Owner: {data.owner}</div>
            <div className="flex justify-end">
              <span className="btn btn-primary btn-sm">View Details</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ConsumersPage;
