// packages/nextjs/app/researchers/[slug]/WorldMap.tsx
"use client";

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

// packages/nextjs/app/researchers/[slug]/WorldMap.tsx

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json";

export default function WorldMap({ ancestors }: { ancestors: { lat: number; lng: number; label: string }[] }) {
  return (
    <ComposableMap projection="geoEqualEarth" width={320} height={220} style={{ width: "100%", height: "100%" }}>
      <Geographies geography={geoUrl}>
        {({ geographies }: { geographies: any[] }) =>
          geographies.map((geo: any) => <Geography key={geo.rsmKey} geography={geo} fill="#f3f4f6" stroke="#d1d5db" />)
        }
      </Geographies>
      {ancestors.map((a, i) => (
        <Marker key={i} coordinates={[a.lng, a.lat]}>
          <circle r={8} fill="#f59e42" fillOpacity={0.8} />
          <text textAnchor="start" y={-12} x={10} style={{ fontSize: 12, fill: "#374151" }}>
            {a.label}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
}
