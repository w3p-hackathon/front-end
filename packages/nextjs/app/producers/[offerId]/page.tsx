"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const mockOffers = [
  {
    id: "o1",
    researcher: "John Doe",
    testName: "Cancer Marker Analysis",
    offerAmount: "0.5",
    status: "Pending",
  },
  {
    id: "o2",
    researcher: "Jane Doe",
    testName: "Gene Expression Study",
    offerAmount: "1.2",
    status: "Pending",
  },
];

const OfferDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const offerId = params.offerId as string;
  const offer = mockOffers.find(o => o.id === offerId);
  const [status, setStatus] = useState(offer?.status || "Pending");
  const [message, setMessage] = useState("");

  if (!offer) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Offer Not Found</h1>
        <button className="btn btn-primary" onClick={() => router.push("/producers")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleAction = (action: "Approved" | "Rejected") => {
    setStatus(action);
    setMessage(`Offer has been ${action.toLowerCase()}.`);
  };

  return (
    <div className="container mx-auto py-10 max-w-xl">
      <button className="btn btn-ghost mb-4" onClick={() => router.push("/producers")}>
        {"<- Back"}
      </button>
      <div className="card bg-base-100 shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Offer Details</h1>
        <div className="mb-2">
          <span className="font-semibold">Test Name:</span> {offer.testName}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Researcher:</span> {offer.researcher}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Offered Amount:</span> {offer.offerAmount} SNP
        </div>
        <div className="mb-4">
          <span
            className={`badge ${
              status === "Pending" ? "badge-warning" : status === "Approved" ? "badge-success" : "badge-error"
            }`}
          >
            {status}
          </span>
        </div>
        {status === "Pending" && (
          <div className="flex gap-4 mb-4">
            <button className="btn btn-success" onClick={() => handleAction("Approved")}>
              Consent
            </button>
            <button className="btn btn-error" onClick={() => handleAction("Rejected")}>
              Reject
            </button>
          </div>
        )}
        {message && <div className="alert alert-info mt-2">{message}</div>}
      </div>
    </div>
  );
};

export default OfferDetailsPage;
