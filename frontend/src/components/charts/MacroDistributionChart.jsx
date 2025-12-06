import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MacroDistributionChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card bg-base-100 shadow-lg p-8 text-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const COLORS = ["#10B981", "#FBBF24", "#F97316"];

  const renderLabel = (entry) => {
    return `${entry.name} ${entry.value}%`;
  };

  return (
    <div className="card bg-base-100 shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🥧 Macro Distribution</h3>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              label={renderLabel}
              isAnimationActive={true}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [
                `${value}% (${props.payload.actual}g)`,
                props.payload.name,
              ]}
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #3b82f6",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {data.map((item, idx) => (
          <div key={idx} className="p-3 rounded-lg" style={{ backgroundColor: `${item.color}20` }}>
            <p className="text-xs font-semibold" style={{ color: item.color }}>
              {item.name}
            </p>
            <p className="text-lg font-bold">{item.actual}g</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MacroDistributionChart;