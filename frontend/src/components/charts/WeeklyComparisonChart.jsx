import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeeklyComparisonChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card bg-base-100 shadow-lg p-8 text-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  // Normalize data for radar chart (0-100 scale)
  const maxCalories = Math.max(...data.map((d) => d.calories || 0)) || 2000;
  const maxProtein = Math.max(...data.map((d) => d.protein || 0)) || 100;
  const maxCarbs = Math.max(...data.map((d) => d.carbohydrates || 0)) || 300;
  const maxFat = Math.max(...data.map((d) => d.fat || 0)) || 100;

  const normalizedData = data.map((d) => ({
    day: d.day,
    Calories: Math.round((d.calories / maxCalories) * 100),
    Protein: Math.round((d.protein / maxProtein) * 100),
    Carbs: Math.round((d.carbohydrates / maxCarbs) * 100),
    Fat: Math.round((d.fat / maxFat) * 100),
  }));

  return (
    <div className="card bg-base-100 shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎯 Weekly Comparison (Normalized)</h3>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <RadarChart data={normalizedData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="day"
              tick={{ fontSize: 11 }}
              stroke="#9ca3af"
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
              stroke="#9ca3af"
            />
            <Radar
              name="Calories"
              dataKey="Calories"
              stroke="#3b82f6"
              fill="rgba(59, 130, 246, 0.25)"
              isAnimationActive={true}
              animationDuration={800}
            />
            <Radar
              name="Protein"
              dataKey="Protein"
              stroke="#10B981"
              fill="rgba(16, 185, 129, 0.1)"
              isAnimationActive={true}
              animationDuration={800}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #3b82f6",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyComparisonChart;