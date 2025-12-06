import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const CaloriesTrendChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card bg-base-100 shadow-lg p-8 text-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const avgCalories = Math.round(
    data.reduce((sum, d) => sum + (d.calories || 0), 0) / data.length
  );

  return (
    <div className="card bg-base-100 shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔥 Calories Trend</h3>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
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
                border: "1px solid #3b82f6",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value) => [`${value} kcal`, "Calories"]}
            />
            <Legend />
            <ReferenceLine
              y={avgCalories}
              stroke="#3b82f6"
              strokeDasharray="5 5"
              label={{
                value: `Avg: ${avgCalories} kcal`,
                position: "right",
                fill: "#3b82f6",
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="calories"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", r: 5 }}
              activeDot={{ r: 7 }}
              isAnimationActive={true}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-bold">Daily Average: </span>
          {avgCalories} kcal
        </p>
      </div>
    </div>
  );
};

export default CaloriesTrendChart;