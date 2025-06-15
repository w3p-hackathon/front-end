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
      // Cluster 1 (red)
      { x: -4.5, y: 1.2, label: "YDR450W", cluster: 1 },
      { x: -4.2, y: 0.8, label: "", cluster: 1 },
      { x: -4.0, y: 1.5, label: "", cluster: 1 },
      { x: -3.8, y: 0.9, label: "", cluster: 1 },
      // Cluster 2 (yellow)
      { x: -1.5, y: -2.0, label: "YAL067C", cluster: 2 },
      { x: -1.2, y: -2.5, label: "", cluster: 2 },
      { x: -1.0, y: -3.0, label: "", cluster: 2 },
      { x: -1.8, y: -2.2, label: "", cluster: 2 },
      // Cluster 3 (green)
      { x: 0.5, y: 0.5, label: "YGL059W", cluster: 3 },
      { x: 0.8, y: 0.8, label: "", cluster: 3 },
      { x: 1.0, y: 0.2, label: "", cluster: 3 },
      { x: 0.7, y: 0.6, label: "", cluster: 3 },
      // Cluster 4 (cyan)
      { x: 2.0, y: 1.0, label: "YOLO30W", cluster: 4 },
      { x: 2.2, y: 1.2, label: "", cluster: 4 },
      { x: 2.5, y: 0.8, label: "", cluster: 4 },
      { x: 2.3, y: 1.1, label: "", cluster: 4 },
      // Cluster 5 (blue)
      { x: 3.0, y: 0.5, label: "", cluster: 5 },
      { x: 3.2, y: 0.7, label: "", cluster: 5 },
      { x: 3.5, y: 0.3, label: "", cluster: 5 },
      { x: 3.3, y: 0.6, label: "", cluster: 5 },
      // Cluster 6 (magenta)
      { x: 4.0, y: 1.5, label: "YMR141C", cluster: 6 },
      { x: 4.2, y: 1.7, label: "", cluster: 6 },
      { x: 4.5, y: 1.3, label: "", cluster: 6 },
      { x: 4.3, y: 1.6, label: "", cluster: 6 },
    ],
    ancestors: [
      { lat: 42.8746, lng: 74.5698, label: "Bishkek" },
      { lat: 43.222, lng: 76.8512, label: "Almaty" },
      { lat: 39.6542, lng: 66.9597, label: "Samarkand" },
      { lat: 38.5734, lng: 68.7801, label: "Dushanbe" },
      { lat: 37.9402, lng: 58.3794, label: "Ashgabat" },

      { lat: 47.8864, lng: 106.9057, label: "Ulaanbaatar" },

      { lat: 39.9208, lng: 32.8541, label: "Ankara" },
      { lat: 41.0082, lng: 28.9784, label: "Istanbul" },
      { lat: 38.4237, lng: 27.1428, label: "Izmir" },

      { lat: 47.0105, lng: 28.8638, label: "Chișinău" },
      { lat: 44.4268, lng: 26.1025, label: "Bucharest" },
      { lat: 42.6977, lng: 23.3219, label: "Sofia" },
      { lat: 45.815, lng: 15.9819, label: "Zagreb" },
      { lat: 47.4979, lng: 19.0402, label: "Budapest" },

      { lat: 48.8566, lng: 2.3522, label: "Paris" },
      { lat: 52.52, lng: 13.405, label: "Berlin" },
      { lat: 50.0755, lng: 14.4378, label: "Prague" },
      { lat: 51.5072, lng: -0.1276, label: "London" },
      { lat: 52.3676, lng: 4.9041, label: "Amsterdam" },
      { lat: 41.9028, lng: 12.4964, label: "Rome" },

      { lat: 6.5244, lng: 3.3792, label: "Lagos" },
      { lat: 6.4541, lng: 3.3841, label: "Abuja" },
      { lat: 4.8901, lng: 7.023, label: "Port Harcourt" },
      { lat: 10.4516, lng: 7.516, label: "Kano" },
      { lat: 12.8797, lng: 8.674, label: "Jos" },
      { lat: 11.0168, lng: 7.4962, label: "Zaria" },
      { lat: 10.3039, lng: 12.1162, label: "Yola" },
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

  // Group clusterData by cluster for chart.js datasets
  const clusterColors = ["#ef4444", "#facc15", "#22c55e", "#06b6d4", "#3b82f6", "#a21caf"];
  const clusterLabels = ["1", "2", "3", "4", "5", "6"];
  const grouped = [1, 2, 3, 4, 5, 6].map(clusterNum => {
    return {
      label: clusterLabels[clusterNum - 1],
      data: result.clusterData.filter(p => p.cluster === clusterNum),
      backgroundColor: clusterColors[clusterNum - 1],
      pointRadius: 6,
      pointHoverRadius: 10,
    };
  });
  const clusterData = {
    datasets: grouped,
  };

  const clusterOptions = {
    plugins: {
      legend: { display: true, position: "right" as const },
      title: {
        display: true,
        text: "Principal Component Scatter Plot",
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.raw.label;
            return label
              ? `${label}: (${context.parsed.x}, ${context.parsed.y})`
              : `(${context.parsed.x}, ${context.parsed.y})`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "First Principal Component" },
        grid: { display: false },
      },
      y: {
        title: { display: true, text: "Second Principal Component" },
        grid: { display: false },
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
        {/* <div className="mb-4 text-xs text-base-content/60">Owner: {result.owner}</div> */}
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
