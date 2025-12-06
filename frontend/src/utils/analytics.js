/**
 * Analytics utility to aggregate meal data by time period
 */

/**
 * Get start and end dates based on period
 */
export const getDateRange = (period) => {
  const now = new Date();
  let startDate;

  switch (period) {
    case "weekly":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "monthly":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case "yearly":
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  return { startDate, endDate: now };
};

/**
 * Format date for display
 */
export const formatDateLabel = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

/**
 * Group meals by day
 */
export const groupByDay = (meals) => {
  const grouped = {};

  meals.forEach((meal) => {
    const date = new Date(meal.date);
    const key = formatDateLabel(date);

    if (!grouped[key]) {
      grouped[key] = {
        day: key,
        date: date,
        meals: [],
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
      };
    }

    grouped[key].meals.push(meal);
    grouped[key].calories += meal.calories || 0;
    grouped[key].protein += meal.protein || 0;
    grouped[key].carbohydrates += meal.carbohydrates || 0;
    grouped[key].fat += meal.fat || 0;
  });

  // Sort by date
  return Object.values(grouped).sort((a, b) => a.date - b.date);
};

/**
 * Group meals by week (for yearly view)
 */
export const groupByWeek = (meals) => {
  const grouped = {};

  meals.forEach((meal) => {
    const date = new Date(meal.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());

    const key = `Week ${Math.ceil(date.getDate() / 7)}`;

    if (!grouped[key]) {
      grouped[key] = {
        week: key,
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
      };
    }

    grouped[key].calories += meal.calories || 0;
    grouped[key].protein += meal.protein || 0;
    grouped[key].carbohydrates += meal.carbohydrates || 0;
    grouped[key].fat += meal.fat || 0;
  });

  return Object.values(grouped);
};

/**
 * Calculate macro percentages
 */
export const calculateMacroPercentages = (meals) => {
  const totals = meals.reduce(
    (acc, meal) => {
      acc.protein += meal.protein || 0;
      acc.carbs += meal.carbohydrates || 0;
      acc.fat += meal.fat || 0;
      acc.calories += meal.calories || 0;
      return acc;
    },
    { protein: 0, carbs: 0, fat: 0, calories: 0 }
  );

  const macroTotal = totals.protein + totals.carbs + totals.fat || 1;

  return [
    {
      name: "Protein",
      value: Math.round((totals.protein / macroTotal) * 100),
      actual: totals.protein,
      color: "#10B981",
    },
    {
      name: "Carbs",
      value: Math.round((totals.carbs / macroTotal) * 100),
      actual: totals.carbs,
      color: "#FBBF24",
    },
    {
      name: "Fat",
      value: Math.round((totals.fat / macroTotal) * 100),
      actual: totals.fat,
      color: "#F97316",
    },
  ];
};

/**
 * Get meal type distribution
 */
export const getMealTypeDistribution = (meals) => {
  const distribution = {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0,
  };

  meals.forEach((meal) => {
    const type = meal.mealType?.toLowerCase() || "snack";
    if (distribution.hasOwnProperty(type)) {
      distribution[type]++;
    }
  });

  return distribution;
};

/**
 * Calculate daily average calories
 */
export const calculateDailyAverageCalories = (meals) => {
  if (meals.length === 0) return 0;
  const totalCalories = meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
  const days = new Set(meals.map((m) => new Date(m.date).toDateString())).size;
  return Math.round(totalCalories / days);
};