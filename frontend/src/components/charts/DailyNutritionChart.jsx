import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DailyNutritionChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card bg-base-100 shadow-lg p-8 text-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Daily Macro Breakdown</h3>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
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
              formatter={(value) => `${value}g`}
            />
            <Legend />
            <Bar
              dataKey="protein"
              stackId="a"
              fill="#10B981"
              name="Protein"
              isAnimationActive={true}
              animationDuration={800}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="carbohydrates"
              stackId="a"
              fill="#FBBF24"
              name="Carbs"
              isAnimationActive={true}
              animationDuration={800}
            />
            <Bar
              dataKey="fat"
              stackId="a"
              fill="#F97316"
              name="Fat"
              isAnimationActive={true}
              animationDuration={800}
              radius={[0, 0, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyNutritionChart;