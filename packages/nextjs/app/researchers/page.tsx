"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NextPage } from "next";
import { ArrowPathIcon, ClockIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";

// Mock genetics data
const geneticsData = [
  {
    id: "1",
    title: "Encrypted Genome #1",
    description: "Human genome, encrypted, 2024-06-01",
    owner: "0x1234...abcd",
    totalChromosomes: 46,
    heterozygosity: true,
    invalidData: false,
    subsets: ["diabetes"],
  },
  {
    id: "2",
    title: "Encrypted Genome #2",
    description: "Mouse genome, encrypted, 2024-05-20",
    owner: "0xabcd...5678",
    totalChromosomes: 40,
    heterozygosity: false,
    invalidData: true,
    subsets: ["cancer"],
  },
  {
    id: "3",
    title: "Encrypted Genome #3",
    description: "Plant genome, encrypted, 2024-04-15",
    owner: "0x9876...4321",
    totalChromosomes: 20,
    heterozygosity: true,
    invalidData: false,
    subsets: ["diabetes", "cancer"],
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
    progress: 100,
    status: "Completed",
  },
  {
    id: "t3",
    name: "Genome Analysis",
    genomes: [geneticsData[0], geneticsData[1], geneticsData[2]],
    progress: 20,
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
    approvals: 0,
    rejections: 0,
  },
  {
    id: "p2",
    name: "Trait Inheritance Test",
    genomes: [geneticsData[0], geneticsData[2]],
    requestedAt: "2024-06-09",
    owner: geneticsData[0].owner,
    approvals: 1,
    rejections: 1,
  },
];

const TAB_ONGOING = "Ongoing Tests";
const TAB_PENDING = "Pending";
const TAB_CREATE = "Create Test";
const TABS = [TAB_CREATE, TAB_ONGOING, TAB_PENDING];

const FILTER_TAGS = [
  { label: "Total Chromosomes", value: "totalChromosomes" },
  { label: "Heterozygosity", value: "heterozygosity" },
  { label: "Invalid Data", value: "invalidData" },
  { label: "Certain Subset", value: "subset" },
];

const SUBSET_OPTIONS = ["diabetes", "cancer", "etc"];

const ConsumersPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string>(TAB_CREATE);
  const [selectedGenomes, setSelectedGenomes] = useState<string[]>([]);
  const [testName, setTestName] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [subsetValue, setSubsetValue] = useState<string>("");
  const [chromosomeValue, setChromosomeValue] = useState<string>("");
  const [researchType, setResearchType] = useState<string>("");
  const [snpInput, setSnpInput] = useState<string>("");
  const [snps, setSnps] = useState<string[]>([]);
  const [offerAmount, setOfferAmount] = useState<string>("");

  const handleGenomeSelect = (id: string) => {
    setSelectedGenomes(prev => (prev.includes(id) ? prev.filter(gid => gid !== id) : [...prev, id]));
  };

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Test created!\nName: ${testName}\nDescription: ${testDescription}\nResearch Type: ${researchType}\nOffer Amount: ${offerAmount} ETH\nSNPs: ${snps.join(", ")}\nGenomes: ${selectedGenomes.join(", ")}`,
    );
    setSelectedGenomes([]);
    setTestName("");
    setTestDescription("");
    setSelectedFilters([]);
    setSubsetValue("");
    setChromosomeValue("");
    setResearchType("");
    setSnps([]);
    setSnpInput("");
    setOfferAmount("");
  };

  const handleAddSnp = () => {
    if (snpInput.trim() && !snps.includes(snpInput.trim())) {
      setSnps([...snps, snpInput.trim()]);
      setSnpInput("");
    }
  };

  const handleRemoveSnp = (snp: string) => {
    setSnps(snps.filter(s => s !== snp));
  };

  // Filtering logic
  let filteredGenomes = geneticsData;
  if (selectedFilters.length > 0) {
    filteredGenomes = filteredGenomes.filter(g => {
      let match = true;
      if (selectedFilters.includes("totalChromosomes") && chromosomeValue) {
        match = match && g.totalChromosomes === Number(chromosomeValue);
      }
      if (selectedFilters.includes("heterozygosity")) {
        match = match && g.heterozygosity === true;
      }
      if (selectedFilters.includes("invalidData")) {
        match = match && g.invalidData === true;
      }
      if (selectedFilters.includes("subset") && subsetValue) {
        match = match && g.subsets.includes(subsetValue);
      }
      return match;
    });
  }

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
                : "border-transparent text-base-content/60 hover:text-primary hover:cursor-pointer"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="bg-base-100 rounded-b-xl shadow-md p-6 min-h-[300px]">
        {activeTab === TAB_CREATE && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Create New Test</h2>
            <form onSubmit={handleCreateTest}>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Test Name:</label>
                <input
                  className="input input-bordered w-full"
                  value={testName}
                  onChange={e => setTestName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Description:</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={testDescription}
                  onChange={e => setTestDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Research Type:</label>
                <select
                  className="select select-bordered w-full"
                  value={researchType}
                  onChange={e => setResearchType(e.target.value)}
                  required
                >
                  <option value="">Select Research Type</option>
                  <option value="Linear Regression">Linear Regression</option>
                  <option value="Average">Average</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Filter Genome Data:</label>
                <div className="flex flex-wrap gap-4 mb-2">
                  {FILTER_TAGS.map(tag => (
                    <label key={tag.value} className="flex items-center gap-2">
                      {tag.value === "heterozygosity" || tag.value === "invalidData" ? (
                        <input
                          type="checkbox"
                          checked={selectedFilters.includes(tag.value)}
                          onChange={e => {
                            if (e.target.checked) {
                              setSelectedFilters([...selectedFilters, tag.value]);
                            } else {
                              setSelectedFilters(selectedFilters.filter(f => f !== tag.value));
                            }
                          }}
                        />
                      ) : tag.value === "totalChromosomes" ? (
                        <>
                          <input
                            type="checkbox"
                            checked={selectedFilters.includes(tag.value)}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectedFilters([...selectedFilters, tag.value]);
                              } else {
                                setSelectedFilters(selectedFilters.filter(f => f !== tag.value));
                                setChromosomeValue("");
                              }
                            }}
                          />
                        </>
                      ) : tag.value === "subset" ? (
                        <input
                          type="checkbox"
                          checked={selectedFilters.includes(tag.value)}
                          onChange={e => {
                            if (e.target.checked) {
                              setSelectedFilters([...selectedFilters, tag.value]);
                            } else {
                              setSelectedFilters(selectedFilters.filter(f => f !== tag.value));
                              setSubsetValue("");
                            }
                          }}
                        />
                      ) : null}
                      {tag.label}
                    </label>
                  ))}
                </div>
                {/* Filter Inputs */}
                <div className="flex flex-wrap gap-4">
                  {selectedFilters.includes("totalChromosomes") && (
                    <input
                      type="number"
                      className="input input-bordered"
                      placeholder="Total Chromosomes"
                      value={chromosomeValue}
                      onChange={e => setChromosomeValue(e.target.value)}
                    />
                  )}
                  {selectedFilters.includes("subset") && (
                    <select
                      className="select select-bordered"
                      value={subsetValue}
                      onChange={e => setSubsetValue(e.target.value)}
                    >
                      <option value="">Select Subset</option>
                      {SUBSET_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">SNPs:</label>
                <div className="flex gap-2 mb-2">
                  <input
                    className="input input-bordered flex-1"
                    value={snpInput}
                    onChange={e => setSnpInput(e.target.value)}
                    placeholder="Enter SNP"
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSnp();
                      }
                    }}
                  />
                  <button type="button" className="btn btn-primary" onClick={handleAddSnp} disabled={!snpInput.trim()}>
                    +
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {snps.map(snp => (
                    <span key={snp} className="badge badge-outline flex items-center gap-1">
                      {snp}
                      <button
                        type="button"
                        className="ml-1 btn btn-xs btn-circle btn-ghost"
                        onClick={() => handleRemoveSnp(snp)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Offer Amount:</label>
                <input
                  className="input input-bordered w-full"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="ETH"
                  value={offerAmount}
                  onChange={e => setOfferAmount(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Select Genome Data:</label>
                {selectedFilters.length === 0 ? (
                  <div className="text-base-content/60">Select at least one filter to view genome data.</div>
                ) : filteredGenomes.length === 0 ? (
                  <div className="text-base-content/60">No genome data matches the selected filters.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredGenomes.map(data => (
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
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  selectedGenomes.length === 0 || !testName || !testDescription || !researchType || !offerAmount
                }
              >
                Create Test
              </button>
            </form>
          </div>
        )}
        {activeTab === TAB_ONGOING && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Ongoing Tests</h2>
            {ongoingTests.length === 0 ? (
              <p className="text-base-content/80">No ongoing tests at the moment.</p>
            ) : (
              <div className="space-y-6">
                {ongoingTests.map(test => (
                  <Link
                    key={test.id}
                    href={`/researchers/${test.id}`}
                    className="block border border-base-300 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold text-lg">{test.name}</div>
                      <span className={`badge ${test.status === "Completed" ? "badge-success" : "badge-info"}`}>
                        {test.status === "Completed" ? (
                          <>
                            <span className="mr-1">
                              <DocumentCheckIcon className="h-4 w-4" />
                            </span>
                            {test.status}
                          </>
                        ) : (
                          <>
                            <span className="mr-1 animate-spin inline-block">
                              <ArrowPathIcon className="h-4 w-4" />
                            </span>
                            {test.status}
                          </>
                        )}
                      </span>
                    </div>
                    <div className="mb-2 text-sm text-base-content/70">
                      Genomes: {test.genomes.map(g => g.title).join(", ")}
                    </div>
                    <div className="w-full bg-base-200 rounded-full h-3 mb-2">
                      <div
                        className={`h-3 rounded-full transition-all ${test.status === "Completed" ? "bg-success" : "bg-primary"}`}
                        style={{ width: `${test.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-base-content/60">
                      {test.status === "Completed" ? "Completed" : `Progress: ${test.progress}%`}
                    </div>
                  </Link>
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
                      <span className="badge badge-warning flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        Pending
                      </span>
                    </div>
                    <div className="mb-2 text-sm text-base-content/70">
                      Genomes: {test.genomes.map(g => g.title).join(", ")}
                    </div>
                    <div className="flex gap-4 mb-2 text-xs">
                      <span className="text-success">Approved: {test.approvals}</span>
                      <span className="text-error">Rejected: {test.rejections}</span>
                    </div>
                    <div className="text-xs text-base-content/60 mb-1">Requested At: {test.requestedAt}</div>
                    <div className="text-xs text-base-content/60">Owner: {test.owner}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsumersPage;
