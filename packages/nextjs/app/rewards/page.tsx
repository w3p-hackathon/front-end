import { NextPage } from "next";

const rewards = [
  {
    id: 1,
    name: "Early Adopter Badge",
    description: "Awarded to the first 100 users.",
    amount: "0.05 SNP",
    status: "Available",
  },
  { id: 2, name: "Referral Bonus", description: "Invite 5 friends to claim.", amount: "0.10 SNP", status: "Available" },
  { id: 3, name: "Beta Tester", description: "Participate in beta testing.", amount: "0.02 SNP", status: "Claimed" },
];

const RewardsPage: NextPage = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Available Rewards</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-base-200 rounded-lg shadow">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left">Reward</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {rewards.map(reward => (
              <tr key={reward.id} className="border-t border-base-300">
                <td className="py-3 px-4 font-semibold">{reward.name}</td>
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
                    <button className="btn btn-primary btn-sm">Claim</button>
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
