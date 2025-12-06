import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { storage } from "../utils/storage";
import { getFullURL } from "../utils/config";
import PeriodSelector from "../components/PeriodSelector";
import CaloriesTrendChart from "../components/charts/CaloriesTrendChart";
import MacroDistributionChart from "../components/charts/MacroDistributionChart";
import DailyNutritionChart from "../components/charts/DailyNutritionChart";
import ProteinTrendChart from "../components/charts/ProteinTrendChart";
import WeeklyComparisonChart from "../components/charts/WeeklyComparisonChart";
import {
  getDateRange,
  groupByDay,
  groupByWeek,
  calculateMacroPercentages,
  calculateDailyAverageCalories,
} from "../utils/analytics";

const Analytics = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const isLoggedIn = storage.isLoggedIn();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please login to view analytics");
      return;
    }
    fetchAllMeals();
  }, [isLoggedIn]);

  const fetchAllMeals = async () => {
    try {
      setLoading(true);
      const response = await fetch(getFullURL("/api/meals/history"), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        setMeals(data.meals || []);
      } else {
        toast.error(data.message || "Failed to fetch meals");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-base-200 to-base-100">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-3xl font-bold mb-2">Please Login</h2>
          <p className="text-gray-600 mb-6">
            You need to login to view your analytics
          </p>
          <a href="/login" className="btn btn-primary">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // Filter meals by selected period
  const { startDate, endDate } = getDateRange(selectedPeriod);
  const filteredMeals = meals.filter((meal) => {
    const mealDate = new Date(meal.date);
    return mealDate >= startDate && mealDate <= endDate;
  });

  // Process data based on period
  const processedData =
    selectedPeriod === "yearly" ? groupByWeek(filteredMeals) : groupByDay(filteredMeals);
  const macroData = calculateMacroPercentages(filteredMeals);
  const avgCalories = calculateDailyAverageCalories(filteredMeals);

  return (
    <div className="bg-gradient-to-br from-base-100 to-base-200 min-h-screen py-8 px-4">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-base-content mb-4">
            📊 Nutrition Analytics
          </h1>
          <p className="text-gray-600">
            Track your nutrition trends and insights over time
          </p>
        </div>

        {/* Period Selector */}
        <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg p-6 border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-600 mb-2">Total Meals</h3>
            <p className="text-3xl font-bold text-blue-700">{filteredMeals.length}</p>
          </div>
          <div className="card bg-gradient-to-br from-green-50 to-green-100 shadow-lg p-6 border border-green-200">
            <h3 className="text-sm font-semibold text-green-600 mb-2">
              Avg Daily Calories
            </h3>
            <p className="text-3xl font-bold text-green-700">{avgCalories}</p>
            <p className="text-xs text-green-600 mt-1">kcal</p>
          </div>
          <div className="card bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg p-6 border border-purple-200">
            <h3 className="text-sm font-semibold text-purple-600 mb-2">
              Tracking Days
            </h3>
            <p className="text-3xl font-bold text-purple-700">
              {new Set(filteredMeals.map((m) => new Date(m.date).toDateString())).size}
            </p>
          </div>
        </div>

        {/* Charts Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="mt-4 text-gray-600">Loading analytics...</p>
            </div>
          </div>
        ) : filteredMeals.length === 0 ? (
          <div className="card bg-base-100 shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📉</div>
            <h3 className="text-2xl font-bold mb-2">No data for this period</h3>
            <p className="text-gray-600">
              Start tracking meals to see your nutrition analytics
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CaloriesTrendChart data={processedData} />
            <MacroDistributionChart data={macroData} />
            <DailyNutritionChart data={processedData} />
            <ProteinTrendChart data={processedData} />
            {selectedPeriod !== "yearly" && (
              <div className="lg:col-span-2">
                <WeeklyComparisonChart data={processedData} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;