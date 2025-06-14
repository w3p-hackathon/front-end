"use client";

import React, { useState } from "react";
import { FileDropInput } from "../../components/scaffold-eth/Input";
import { NextPage } from "next";

const mockOffers = [
  {
    id: "o1",
    researcher: "0x1234...abcd",
    testName: "Cancer Marker Analysis",
    offerAmount: "0.5",
    status: "Pending",
  },
  {
    id: "o2",
    researcher: "0xabcd...5678",
    testName: "Gene Expression Study",
    offerAmount: "1.2",
    status: "Pending",
  },
];

const TAB_UPLOAD = "Upload";
const TAB_OFFERS = "Offers";
const TABS = [TAB_UPLOAD, TAB_OFFERS];

const ProducersPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string>(TAB_UPLOAD);
  const [offers, setOffers] = useState(mockOffers);

  const handleOfferAction = (id: string, action: "Approved" | "Rejected") => {
    setOffers(prev => prev.map(offer => (offer.id === id ? { ...offer, status: action } : offer)));
  };

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
            <h2 className="text-xl font-semibold mb-6">Encrypt Genome Data</h2>
            <FileDropInput />
          </div>
        )}
        {activeTab === TAB_OFFERS && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Offers from Researchers</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Researcher</th>
                    <th>Test Name</th>
                    <th>Offer Amount (ETH)</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map(offer => (
                    <tr key={offer.id}>
                      <td>{offer.researcher}</td>
                      <td>{offer.testName}</td>
                      <td>{offer.offerAmount}</td>
                      <td>
                        <span
                          className={`badge ${
                            offer.status === "Pending"
                              ? "badge-warning"
                              : offer.status === "Approved"
                                ? "badge-success"
                                : "badge-error"
                          }`}
                        >
                          {offer.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-xs mr-2"
                          disabled={offer.status !== "Pending"}
                          onClick={() => handleOfferAction(offer.id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-error btn-xs"
                          disabled={offer.status !== "Pending"}
                          onClick={() => handleOfferAction(offer.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProducersPage;
