import Link from "next/link";

// Mock genetics data (same as in the list page)
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

const ConsumerDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const id = (await params).slug;
  console.log(id);

  const data = geneticsData.find(d => d.id === id);

  if (!data) {
    return (
      <div className="container mx-auto py-10">
        <Link href="/researchers" className="btn btn-ghost mb-6">
          ← Back to list
        </Link>
        <div className="text-xl text-error">Data not found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 max-w-xl">
      <Link href="/researchers" className="btn btn-ghost mb-6">
        ← Back to list
      </Link>
      <div className="bg-base-100 border border-base-300 rounded-xl shadow-md p-8">
        <div className="mb-6 h-24 flex items-center justify-center bg-base-200 rounded-lg text-base-content/60">
          <span className="text-lg">🔒 Encrypted Data</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
        <p className="mb-2 text-base-content/80">{data.description}</p>
        <div className="text-xs text-base-content/60 mb-4">Owner: {data.owner}</div>
        <div className="flex flex-col gap-4 mt-8">
          <button className="btn btn-primary w-full">Request Access to Use Data</button>
        </div>
      </div>
    </div>
  );
};

export default ConsumerDetailPage;
