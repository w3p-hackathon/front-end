"use client";

import React, { useState } from "react";
import { FileDropInput } from "../../components/scaffold-eth/Input";
import { NextPage } from "next";

const mockOffers = [
  {
    id: "o1",
    researcher: "John Doe",
    testName: "Cancer Marker Analysis",
    offerAmount: "0.5",
    status: "Pending",
    technology: "Client ZK Proofs",
  },
  {
    id: "o2",
    researcher: "Jane Doe",
    testName: "Gene Expression Study",
    offerAmount: "1.2",
    status: "Pending",
    technology: "Interactive FHE computation with Concrete ML",
  },
  {
    id: "o3",
    researcher: "Mike Doe",
    testName: "Genome Analysis",
    offerAmount: "0.8",
    status: "Pending",
    technology: "Nillion TEE ML",
  },
];

const TAB_UPLOAD = "Upload";
const TAB_OFFERS = "Offers";
const TABS = [TAB_UPLOAD, TAB_OFFERS];

const ProducersPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string>(TAB_UPLOAD);
  const offers = mockOffers;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Producers Dashboard</h1>
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
      <div className="bg-base-100 rounded-b-xl shadow-md p-6 min-h-[300px]">
        {activeTab === TAB_UPLOAD && (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-6">Share Verifiable Metrics</h2>
            <FileDropInput />
          </div>
        )}
        {activeTab === TAB_OFFERS && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Offers from Researchers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map(offer => (
                <div
                  key={offer.id}
                  className="card bg-base-200 shadow-md cursor-pointer transition-transform hover:scale-105"
                  onClick={() => (window.location.href = `/producers/${offer.id}`)}
                >
                  <div className="card-body">
                    <h3 className="card-title text-lg font-bold mb-2">{offer.testName}</h3>
                    <p className="mb-1">
                      <span className="font-semibold">Researcher:</span> {offer.researcher}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">Technology:</span> {offer.technology}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">Offered Amount:</span> {offer.offerAmount} SNP
                    </p>
                    <span
                      className={`badge mt-2 ${
                        offer.status === "Pending"
                          ? "badge-warning"
                          : offer.status === "Approved"
                            ? "badge-success"
                            : "badge-error"
                      }`}
                    >
                      {offer.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProducersPage;
