"use client";

import Image from "next/image";
import Link from "next/link";
import { Chart as ChartJS, Legend, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

// Mock test results data
const testResults = [
  {
    id: "t2",
    name: "Gene Expression Study",
    summary:
      "This test analyzed gene expression patterns and found significant differences in expression levels associated with the trait of interest.",
    resultValues: [0.87, 0.42, 0.99],
    owner: "0x9876...4321",
    clusterData: [
      { x: 1.2, y: 2.3, label: "Sample 1" },
      { x: 2.1, y: 1.8, label: "Sample 2" },
      { x: 2.8, y: 3.1, label: "Sample 3" },
      { x: 3.5, y: 2.7, label: "Sample 4" },
      { x: 1.7, y: 2.9, label: "Sample 5" },
      { x: 2.4, y: 1.6, label: "Sample 6" },
      { x: 3.1, y: 3.0, label: "Sample 7" },
      { x: 2.9, y: 2.2, label: "Sample 8" },
      { x: 1.5, y: 1.7, label: "Sample 9" },
      { x: 2.0, y: 3.3, label: "Sample 10" },
      { x: 3.3, y: 2.5, label: "Sample 11" },
      { x: 2.6, y: 1.9, label: "Sample 12" },
      { x: 1.8, y: 2.4, label: "Sample 13" },
      { x: 2.2, y: 3.2, label: "Sample 14" },
      { x: 3.0, y: 2.0, label: "Sample 15" },
      { x: 1.9, y: 1.5, label: "Sample 16" },
      { x: 2.7, y: 2.6, label: "Sample 17" },
      { x: 3.4, y: 3.1, label: "Sample 18" },
      { x: 1.6, y: 2.1, label: "Sample 19" },
      { x: 2.3, y: 2.8, label: "Sample 20" },
    ],
    ancestors: [
      { lat: 51.5074, lng: -0.1278, label: "London" },
      { lat: 48.8566, lng: 2.3522, label: "Paris" },
      { lat: 40.7128, lng: -74.006, label: "New York" },
    ],
  },
  // Add more test results as needed
];

// Map image dimensions (px)
const MAP_WIDTH = 600;
const MAP_HEIGHT = 300;

// Helper: Convert lat/lng to x/y for equirectangular projection
function latLngToXY(lat: number, lng: number) {
  // Equirectangular projection
  const x = ((lng + 180) / 360) * MAP_WIDTH;
  const y = ((90 - lat) / 180) * MAP_HEIGHT;
  return { x, y };
}

const TestResultPage = ({ params }: { params: { slug: string } }) => {
  const id = params.slug;
  const result = testResults.find(r => r.id === id);

  if (!result) {
    return (
      <div className="container mx-auto py-10">
        <Link href="/researchers" className="btn btn-ghost mb-6">
          ← Back to list
        </Link>
        <div className="text-xl text-error">Test result not found.</div>
      </div>
    );
  }

  // Cluster plot data for react-chartjs-2
  const clusterData = {
    datasets: [
      {
        label: "Samples",
        data: result.clusterData,
        backgroundColor: ["#60a5fa", "#f472b6", "#34d399", "#f59e42"],
        pointRadius: 8,
        pointHoverRadius: 12,
      },
    ],
  };

  const clusterOptions = {
    plugins: {
      legend: { display: false },
      title: {
        display: false,
      },
      zoom: {
        enabled: true,
        mode: "xy",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = result.clusterData[context.dataIndex]?.label;
            return label
              ? `${label}: (${context.parsed.x}, ${context.parsed.y})`
              : `(${context.parsed.x}, ${context.parsed.y})`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "PC1" },
        grid: { color: "#e5e7eb" },
      },
      y: {
        title: { display: true, text: "PC2" },
        grid: { color: "#e5e7eb" },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <Link href="/researchers" className="btn btn-ghost mb-6">
        ← Back to list
      </Link>
      <div className="bg-base-100 border border-base-300 rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-2">{result.name}</h1>
        <div className="mb-4 text-base-content/80">{result.summary}</div>
        <div className="mb-4 text-xs text-base-content/60">Owner: {result.owner}</div>
        <h2 className="text-lg font-semibold mb-2 mt-6">Cluster Plot</h2>
        <div className="flex justify-center mb-6 h-64 bg-base-200 rounded-lg p-4">
          <Scatter data={clusterData} options={clusterOptions} />
        </div>
        <h2 className="text-lg font-semibold mb-2">Ancestral Origins</h2>
        <div className="flex justify-center mb-6">
          <div className="relative rounded-lg overflow-hidden shadow" style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}>
            <Image
              src="/map.png"
              alt="World Map"
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              className="object-cover"
              priority
            />
            {result.ancestors.map((a, i) => {
              const { x, y } = latLngToXY(a.lat, a.lng);
              return (
                <div key={i} className="absolute flex flex-col items-center" style={{ left: x - 10, top: y - 10 }}>
                  <div className="w-5 h-5 rounded-full bg-orange-400 border-2 border-white shadow-lg opacity-80" />
                </div>
              );
            })}
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-2">Result Values</h2>
        <ul className="list-disc list-inside text-base-content/80 mb-4">
          {result.resultValues.map((val, idx) => (
            <li key={idx}>
              Result {idx + 1}: {val}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestResultPage;
