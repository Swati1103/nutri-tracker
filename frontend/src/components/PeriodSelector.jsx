import React from "react";

const PeriodSelector = ({ selectedPeriod, onPeriodChange }) => {
  const periods = [
    { value: "weekly", label: "📅 Weekly", icon: "📅" },
    { value: "monthly", label: "📊 Monthly", icon: "📊" },
    { value: "yearly", label: "📈 Yearly", icon: "📈" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
      <span className="text-sm font-semibold text-gray-600">View:</span>
      <div className="flex gap-2">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => onPeriodChange(period.value)}
            className={`btn btn-sm sm:btn-md transition-all duration-300 ${
              selectedPeriod === period.value
                ? "btn-primary shadow-lg scale-105"
                : "btn-outline"
            }`}
          >
            {period.icon} {period.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PeriodSelector;