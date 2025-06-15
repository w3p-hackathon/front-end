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
    technology: "Client ZK Proofs",
    pseudocode: `X = np.array(df_binary['genome_code']).reshape(-1, 1)
y = np.array(df_binary['chromosome']).reshape(-1, 1)
df_binary.dropna(inplace = True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25)
regr = LinearRegression()
regr.fit(X_train, y_train)
return regr.score(X_test, y_test)`,
  },
  {
    id: "o2",
    researcher: "Jane Doe",
    testName: "Gene Expression Study",
    offerAmount: "1.2",
    status: "Pending",
    technology: "Interactive FHE computation with Concrete ML",
    pseudocode: `X = np.array(df_binary['genome_code']).reshape(-1, 1)
y = np.array(df_binary['chromosome']).reshape(-1, 1)
df_binary.dropna(inplace = True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25)
regr = LinearRegression()
regr.fit(X_train, y_train)
return regr.score(X_test, y_test)`,
  },
  {
    id: "o3",
    researcher: "Mike Doe",
    testName: "Genome Analysis",
    offerAmount: "0.8",
    status: "Pending",
    technology: "Nillion TEE ML",
    pseudocode: `X = np.array(df_binary['genome_code']).reshape(-1, 1)
y = np.array(df_binary['chromosome']).reshape(-1, 1)
df_binary.dropna(inplace = True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25)
regr = LinearRegression()
regr.fit(X_train, y_train)
return regr.score(X_test, y_test)`,
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
    <div className="container mx-auto py-10 max-w-3xl">
      <button className="btn btn-ghost mb-6" onClick={() => router.push("/producers")}>
        {"<- Back"}
      </button>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">{offer.testName}</h1>
        <div className="mb-4">
          <span
            className={`badge text-base ${
              status === "Pending" ? "badge-warning" : status === "Approved" ? "badge-success" : "badge-error"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
      <div className="mb-4 text-lg">
        <div className="mb-2">
          <span className="font-semibold">Researcher:</span> {offer.researcher}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Offered Amount:</span> {offer.offerAmount} SNP
        </div>
        <div className="mb-2">
          <span className="font-semibold">Technology:</span> {offer.technology}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Pseudocode:</span>
          <pre className="bg-pink-500/45 rounded p-3 mt-1 whitespace-pre-wrap text-sm">{offer.pseudocode}</pre>
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
