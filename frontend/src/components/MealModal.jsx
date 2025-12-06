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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const MealModal = ({ meal }) => {
  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getPieChartData = (meal) => {
    return [
      { name: "Protein", value: meal.protein || 0 },
      { name: "Carbs", value: meal.carbohydrates || 0 },
      { name: "Fat", value: meal.fat || 0 },
    ];
  };

  const COLORS = ["#10B981", "#F59E0B", "#F97316"];

  return (
    <div className="collapse-content space-y-2 pt-2 flex">
      <div className="flex flex-col justify-center w-[50%]">
        <div>
          <div>
            {meal.detected && meal.detected.length > 0 && (
              <div className="bg-base-200  px-3 py-1 ">
                <p className="text-lg font-bold text-gray-700">Foods Items:</p>
                <div className="flex flex-wrap gap-2">
                  {meal.detected.map((food, idx) => (
                    <span
                      key={idx}
                      className="badge badge-lg badge-primary badge-outline"
                    >
                      {capitalize(food)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          {/* Calories Tab */}
          <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
            <p className="text-xs font-semibold text-blue-600 mb-1">Calories</p>
            <p className="text-3xl font-bold text-blue-700">{meal.calories}</p>
            <p className="text-xs text-blue-600">kcal</p>
          </div>
        </div>
      </div>
      <div className="w-[50%] ">
        {/* Pie chart */}
        <div className="">
          <div className="bg-base-200 rounded-lg p-4">
            <h3 className="text-base sm:text-lg font-bold mb-4">
              Macronutrient Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={getPieChartData(meal)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}g`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={true}
                  animationDuration={100}
                >
                  {getPieChartData(meal).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealModal;