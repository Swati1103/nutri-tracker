import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const ProteinTrendChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card bg-base-100 shadow-lg p-8 text-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const avgProtein = Math.round(
    data.reduce((sum, d) => sum + (d.protein || 0), 0) / data.length
  );

  return (
    <div className="card bg-base-100 shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💪 Protein Intake Trend</h3>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #10B981",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value) => [`${value}g`, "Protein"]}
            />
            <Legend />
            <ReferenceLine
              y={avgProtein}
              stroke="#10B981"
              strokeDasharray="5 5"
              label={{
                value: `Avg: ${avgProtein}g`,
                position: "right",
                fill: "#10B981",
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="protein"
              fill="rgba(16, 185, 129, 0.2)"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: "#10B981", r: 5 }}
              activeDot={{ r: 7 }}
              isAnimationActive={true}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-bold">Daily Average: </span>
          {avgProtein}g
        </p>
      </div>
    </div>
  );
};

export default ProteinTrendChart;