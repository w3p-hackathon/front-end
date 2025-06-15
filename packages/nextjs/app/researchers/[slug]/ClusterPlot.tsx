// packages/nextjs/app/researchers/[slug]/ClusterPlot.tsx
"use client";

import { Chart as ChartJS, Legend, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { Scatter } from "react-chartjs-2";

// packages/nextjs/app/researchers/[slug]/ClusterPlot.tsx

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

export default function ClusterPlot({ data, options }: { data: any; options: any }) {
  return <Scatter data={data} options={options} />;
}
