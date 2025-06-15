"use client";

import { NextPage } from "next";
import { notification } from "~~/utils/scaffold-eth/notification";

const rewards = [
  {
    id: 1,
    researcher: "John Doe",
    researchTechnology: "Client ZK Proofs",
    description: "Diabetes genotype correllation linear regression test",
    amount: "0.05 SNP",
    status: "Available",
    proof: [
      "0x159e5d10afb772cbcf3bb32dc8234b682a69c0491ddc6c3a60091ffa36e23168",
      "0xbe8854cfd3e8067abdead833ecba47662a6094a1536abb9205f719cd72fe7901",
      "0x24beb58f3396b2c45ef607160a37b097e08ad7917d158c64c2b633bba9520463",
      "0x8012496c1084a15e3a1fea947ddeec64756cf2413302506a12f2a910453fce9d",
      "0xcc71e6368cddcbd8660fb734e51ccb0ae402b6b8bdbf06f026bda2f9bb8f645b",
    ],
    commitment: "0xa753c020dc2d755b64fcf590f22c87088c8bd0c04b53c8386dab7f8c34e8e796",
    secret: "0x0000000000000000000000000000000000000000000000000000000000000002",
    rewardId: 0,
  },
  {
    id: 2,
    researcher: "Jane Doe",
    researchTechnology: "Interactive FHE computation with Concrete ML",
    description: "Are Caucasian males more prone to go bald?",
    amount: "0.10 SNP",
    status: "Available",
    proof: ["0x1234567890", "0x1234567890", "0x1234567890"],
    commitment: "0x1234567890",
    secret: "0x1234567890",
    rewardId: 2,
  },
  {
    id: 3,
    researcher: "Mike Doe",
    researchTechnology: "Nillion TEE ML",
    description: "Secure ancestry history lookup",
    amount: "0.02 SNP",
    status: "Claimed",
    proof: ["0x1234567890", "0x1234567890", "0x1234567890"],
    commitment: "0x1234567890",
    secret: "0x1234567890",
    rewardId: 3,
  },
];

const RewardsPage: NextPage = () => {
  const handleClaim = async () => {
    const toastId = notification.loading("Claiming reward...");
    await new Promise(res => setTimeout(res, 1500));
    notification.remove(toastId);
    notification.success("Reward claimed successfully!");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Available Rewards</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-base-200 rounded-lg shadow">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left">Researcher</th>
              <th className="py-3 px-4 text-left">Research Technology</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {rewards.map(reward => (
              <tr key={reward.id} className="border-t border-base-300">
                <td className="py-3 px-4 font-semibold">{reward.researcher}</td>
                <td className="py-3 px-4">{reward.researchTechnology}</td>
                <td className="py-3 px-4">{reward.description}</td>
                <td className="py-3 px-4">{reward.amount}</td>
                <td className="py-3 px-4">
                  {reward.status === "Available" ? (
                    <span className="badge badge-success">Available</span>
                  ) : (
                    <span className="badge badge-ghost">Claimed</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {reward.status === "Available" ? (
                    <button className="btn btn-primary btn-sm" onClick={() => handleClaim()}>
                      Claim
                    </button>
                  ) : (
                    <button className="btn btn-disabled btn-sm" disabled>
                      Claimed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RewardsPage;
