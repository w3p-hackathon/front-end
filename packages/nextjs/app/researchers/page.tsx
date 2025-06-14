"use client";

import React, { useState } from "react";
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

// Mock ongoing tests
const ongoingTests = [
  {
    id: "t1",
    name: "Cancer Marker Analysis",
    genomes: [geneticsData[0], geneticsData[1]],
    progress: 65,
    status: "Running",
  },
  {
    id: "t2",
    name: "Gene Expression Study",
    genomes: [geneticsData[2]],
    progress: 30,
    status: "Running",
  },
];

// Mock pending tests
const pendingTests = [
  {
    id: "p1",
    name: "Rare Disease Screening",
    genomes: [geneticsData[1]],
    requestedAt: "2024-06-10",
    owner: geneticsData[1].owner,
  },
  {
    id: "p2",
    name: "Trait Inheritance Test",
    genomes: [geneticsData[0], geneticsData[2]],
    requestedAt: "2024-06-09",
    owner: geneticsData[0].owner,
  },
];

const TAB_ONGOING = "Ongoing Test";
const TAB_PENDING = "Pending";
const TAB_CREATE = "Create Test";
const TAB_GENOME = "Genome Data";
const TABS = [TAB_ONGOING, TAB_PENDING, TAB_CREATE, TAB_GENOME];

const ConsumersPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string>(TAB_ONGOING);
  const [selectedGenomes, setSelectedGenomes] = useState<string[]>([]);

  const handleGenomeSelect = (id: string) => {
    setSelectedGenomes(prev => (prev.includes(id) ? prev.filter(gid => gid !== id) : [...prev, id]));
  };

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement test creation logic
    alert(`Test created with genomes: ${selectedGenomes.join(", ")}`);
    setSelectedGenomes([]);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Researcher Dashboard</h1>
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 mx-1 rounded-t-lg font-semibold border-b-2 transition-colors ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-base-content/60 hover:text-primary"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="bg-base-100 rounded-b-xl shadow-md p-6 min-h-[300px]">
        {activeTab === TAB_ONGOING && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Ongoing Tests</h2>
            {ongoingTests.length === 0 ? (
              <p className="text-base-content/80">No ongoing tests at the moment.</p>
            ) : (
              <div className="space-y-6">
                {ongoingTests.map(test => (
                  <div key={test.id} className="border border-base-300 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold text-lg">{test.name}</div>
                      <span className="badge badge-info">{test.status}</span>
                    </div>
                    <div className="mb-2 text-sm text-base-content/70">
                      Genomes: {test.genomes.map(g => g.title).join(", ")}
                    </div>
                    <div className="w-full bg-base-200 rounded-full h-3 mb-2">
                      <div
                        className="bg-primary h-3 rounded-full transition-all"
                        style={{ width: `${test.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-base-content/60">Progress: {test.progress}%</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === TAB_PENDING && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Pending Tests</h2>
            {pendingTests.length === 0 ? (
              <p className="text-base-content/80">No pending tests. Waiting for genome data owner approval.</p>
            ) : (
              <div className="space-y-6">
                {pendingTests.map(test => (
                  <div key={test.id} className="border border-base-300 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold text-lg">{test.name}</div>
                      <span className="badge badge-warning">Pending Approval</span>
                    </div>
                    <div className="mb-2 text-sm text-base-content/70">
                      Genomes: {test.genomes.map(g => g.title).join(", ")}
                    </div>
                    <div className="text-xs text-base-content/60 mb-1">Requested At: {test.requestedAt}</div>
                    <div className="text-xs text-base-content/60">Owner: {test.owner}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === TAB_CREATE && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Create New Test</h2>
            <form onSubmit={handleCreateTest}>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Select Genome Data:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {geneticsData.map(data => (
                    <label
                      key={data.id}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-shadow ${
                        selectedGenomes.includes(data.id)
                          ? "border-primary bg-primary/10"
                          : "border-base-300 bg-base-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="mr-3"
                        checked={selectedGenomes.includes(data.id)}
                        onChange={() => handleGenomeSelect(data.id)}
                      />
                      <div>
                        <div className="font-semibold">{data.title}</div>
                        <div className="text-xs text-base-content/60">{data.description}</div>
                        <div className="text-xs text-base-content/60">Owner: {data.owner}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn btn-primary" disabled={selectedGenomes.length === 0}>
                Create Test
              </button>
            </form>
          </div>
        )}
        {activeTab === TAB_GENOME && (
          <div>
            <h2 className="text-xl font-semibold mb-4">All Encrypted Genome Data</h2>
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
        )}
      </div>
    </div>
  );
};

export default ConsumersPage;
