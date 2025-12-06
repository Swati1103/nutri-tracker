import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { storage } from "../utils/storage";
import { getFullURL } from "../utils/config";
import { Link } from "react-router-dom";

import MealModal from "../components/MealModal";

const MealHistory = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalMeals, setTotalMeals] = useState(0);
  const [expandedMealId, setExpandedMealId] = useState(null);

  const isLoggedIn = storage.isLoggedIn();
  const itemsPerPage = 8;

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please login to view meal history");
      return;
    }

    fetchMeals(page);
  }, [page, isLoggedIn]);

  const fetchMeals = async (pageNum) => {
    try {
      setLoading(true);
      const response = await fetch(
        getFullURL(`/api/meals/history?page=${pageNum}&limit=${itemsPerPage}`),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setMeals(data.meals);
        setTotalPages(data.pagination.pages);
        setTotalMeals(data.pagination.total);
        setExpandedMealId(null);
        console.log("✅ Meals fetched:", data.meals.length);
      } else {
        toast.error(data.message || "Failed to fetch meals");
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      toast.error("Failed to load meal history");
    } finally {
      setLoading(false);
    }
  };

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const COLORS = ["#10B981", "#F59E0B", "#F97316"];

  const toggleMealAccordion = (mealId) => {
    setExpandedMealId(expandedMealId === mealId ? null : mealId);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-base-200 to-base-100">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-3xl font-bold mb-2">Please Login</h2>
          <p className="text-gray-600 mb-6">
            You need to login to view your meal history
          </p>
          <a href="/login" className="btn btn-primary">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-base-100 to-base-200 min-h-screen py-8 px-4">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-base-content">
                Your Meal History
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-3">
                Total meals tracked:{" "}
                <span className="font-bold text-lg text-primary">
                  {totalMeals}
                </span>
              </p>
            </div>
            <Link to="/analyze">
              <button className="btn btn-sm sm:btn-md btn-primary self-start sm:self-auto">
                + Analyze New Meal
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="mt-4 text-gray-600">Loading your meals...</p>
            </div>
          </div>
        ) : meals.length === 0 ? (
          <div className="card bg-base-100 shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold mb-2">No meals yet</h3>
            <p className="text-gray-600 mb-6">
              Start tracking your meals by analyzing food images
            </p>
            <a href="/analyze" className="btn btn-primary mx-auto">
              Go to Analyzer
            </a>
          </div>
        ) : (
          <>
            {/* Accordion Meals List */}
            <div className="space-y-4 mb-12">
              {meals.map((meal) => (
                <div
                  key={meal._id}
                  className="collapse collapse-arrow bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition"
                >
                  <input
                    type="radio"
                    name="meal-accordion"
                    checked={expandedMealId === meal._id}
                    onClick={() => toggleMealAccordion(meal._id)}
                  />

                  {/* Collapse Title - Meal Summary */}
                  <div className="collapse-title  font-semibold flex sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-4 py-4">
                    <div className=" sm:flex-row sm:items-center gap-2 sm:gap-6 flex-1 w-[20%] min-w-0">
                      {/* Food Name */}
                      <div className="flex-1">
                        <p className="text-base sm:text-lg font-bold text-base-content truncate">
                          {meal.foodName}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {formatDate(meal.date)}
                        </p>
                      </div>
                    </div>
                    {/* Meal Type Badge */}
                    <div className="flex-shrink-0">
                      <span className="badge badge-md badge-primary">
                        {capitalize(meal.mealType)}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Calories</p>
                      <p className="text-sm sm:text-base font-bold text-blue-600">
                        {meal.calories}kcal
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Protein</p>
                      <p className="text-sm sm:text-base font-bold text-green-600">
                        {meal.protein}g
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Carbs</p>
                      <p className="text-sm sm:text-base font-bold text-yellow-600">
                        {meal.carbohydrates}g
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Fat</p>
                      <p className="text-sm sm:text-base font-bold text-orange-600">
                        {meal.fat}g
                      </p>
                    </div>
                  </div>

                  {/* Collapse Content - Detailed View */}
                  <MealModal meal={meal} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center text-lg ">
              <div className="join flex justify-center h-12">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="join-item btn w-20 border-2 mx-2 hover:scale-110 hover:bg-slate-300 bg-gray-200 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`join-item btn mx-2 w-8 ${
                        page === pageNum
                          ? "border-black bg-slate-200 border hover:scale-110 hover:bg-slate-300"
                          : "hover:scale-110 hover:bg-slate-300"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="join-item btn w-20 hover:scale-110 hover:bg-slate-300 border-2 mx-2 bg-slate-200 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MealHistory;
