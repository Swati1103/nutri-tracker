import React from "react";

const MealCard = ({ meal }) => {
  const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full h-full">
      {/* Card with fixed min-height */}
      <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 h-full flex flex-col">
        
        {/* Card Header - Fixed Height */}
        <div className="px-5 pt-5 pb-3 border-b border-base-300 flex-shrink-0">
          <div className="flex justify-between items-start gap-3">
            <div>
              <h2 className="text-sm font-semibold capitalize text-base-content">
                {capitalize(meal.mealType)}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(meal.date)}
              </p>
            </div>
          </div>
        </div>

        {/* Card Body - Flex Grow to Fill */}
        <div className="px-5 py-4 flex-grow flex flex-col justify-between">
          
          {/* Food Name - Detected Items */}
          <div className="mb-4 flex-shrink-0">
            <div className="flex flex-wrap gap-2 font-bold text-lg font-serif">
              {meal.detected && meal.detected.slice(0, 3).map((food, idx) => (
                <span
                  key={idx}
                  className="badge badge-sm badge-primary badge-outline"
                >
                  {food.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          {/* Nutrition Stats - 2x2 Grid - Always at bottom */}
          <div className="grid grid-cols-2 gap-3 flex-shrink-0">
            
            {/* Calories */}
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-xs font-semibold text-blue-600 mb-1">
                Calories
              </p>
              <p className="text-lg font-bold text-blue-700">
                {meal.calories}
              </p>
              <p className="text-xs text-blue-600">kcal</p>
            </div>

            {/* Protein */}
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <p className="text-xs font-semibold text-green-600 mb-1">
                Protein
              </p>
              <p className="text-lg font-bold text-green-700">
                {meal.protein}
              </p>
              <p className="text-xs text-green-600">g</p>
            </div>

            {/* Carbs */}
            <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
              <p className="text-xs font-semibold text-yellow-600 mb-1">
                Carbs
              </p>
              <p className="text-lg font-bold text-yellow-700">
                {meal.carbohydrates}
              </p>
              <p className="text-xs text-yellow-600">g</p>
            </div>

            {/* Fat */}
            <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
              <p className="text-xs font-semibold text-orange-600 mb-1">
                Fat
              </p>
              <p className="text-lg font-bold text-orange-700">
                {meal.fat}
              </p>
              <p className="text-xs text-orange-600">g</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;