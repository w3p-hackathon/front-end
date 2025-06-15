"use client";

import { NextPage } from "next";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const rewards = [
  {
    id: 1,
    researcher: "John Doe",
    researchTechnology: "Client ZK Proofs",
    description: "Diabetes genotype correllation linear regression test",
    amount: "0.05 SNP",
    status: "Available",
    proof: ["0x1234567890", "0x1234567890", "0x1234567890"],
    commitment: "0x1234567890",
    secret: "0x1234567890",
    rewardId: 1,
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
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract({
    contractName: "RewardDistributor",
  });

  const handleClaim = async (reward: any) => {
    await writeYourContractAsync({
      functionName: "verify",
      args: [reward.proof, reward.commitment, reward.secret, reward.rewardId],
    });
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
                    <button className="btn btn-primary btn-sm" onClick={() => handleClaim(reward)}>
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
