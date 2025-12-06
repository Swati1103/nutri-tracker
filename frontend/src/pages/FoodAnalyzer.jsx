import React, { useState } from "react";
import { storage } from "../utils/storage";
import { toast } from "react-toastify";
import { getFullURL } from "../utils/config";

const FoodAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [mealType, setMealType] = useState("snack");
  const isLoggedIn = storage.isLoggedIn();

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handle save meal
  const handleSaveMeal = async () => {
    if (!result) return;

    setIsSaving(true);
    try {
      // Handle both food_items and detected formats
      const foodName = result.food_items?.[0]?.name || 
                      result.detected?.[0] || 
                      "Unknown Food";
      
      // Convert food_items to nutrition format
      const nutritionData = result.food_items?.map((item) => ({
        name: item.name, // ✅ Add name field (required by backend)
        calories: item.calories,
        protein: item.protein,
        carbohydrates: item.carbs,
        fat: item.fat,
      })) || result.nutrition || [];

      console.log("📤 Sending to /api/meals/save:", {
        foodName,
        detected: result.food_items?.map(item => item.name) || result.detected,
        nutrition: nutritionData,
        mealType,
      });

      const saveUrl = getFullURL("/api/meals/save");
      console.log("🔗 Save URL:", saveUrl);
      console.log("📦 Request payload:", {
        foodName,
        detected: result.food_items?.map((item) => item.name) || result.detected || [],
        nutrition: nutritionData,
        mealType,
      });

      const response = await fetch(saveUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          foodName,
          detected: result.food_items?.map((item) => item.name) || result.detected || [],
          nutrition: nutritionData,
          mealType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Response error:", {
          status: response.status,
          statusText: response.statusText,
          data,
        });
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      console.log("✅ Meal saved:", data);
      toast.success("✅ Meal saved to your history!");
      
      // Reset form
      setFile(null);
      setPreview(null);
      setResult(null);
      setMealType("snack");
    } catch (err) {
      console.error("❌ Save error:", err);
      toast.error("❌ " + (err.message || "Error saving meal"));
    } finally {
      setIsSaving(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      // Send to backend /api/meals/add (which forwards to Flask)
      const addUrl = getFullURL("/api/meals/add");
      console.log("📤 Uploading to:", addUrl);

      const response = await fetch(addUrl, {
        method: "POST",
        body: formData,
        // NO Content-Type header - browser will set it automatically with boundary
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to process image");
      }

      const data = await response.json();
      console.log("✅ Backend response:", data);

      // Transform Flask response to match display format
      const transformedResult = {
        food_items: data.prediction.nutrition.map((item) => ({
          name: item.food,
          calories: item.calories,
          protein: item.protein,
          carbs: item.carbohydrates,
          fat: item.fat,
        })),
        total_calories: data.prediction.nutrition.reduce(
          (sum, item) => sum + item.calories,
          0
        ),
      };

      setResult(transformedResult);
    } catch (err) {
      setError(err.message || "Error processing image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-100 p-8 flex w-full">
      <div className="w-[60%] mx-5 p-2">
        <div className="max-w-2xl mx-auto">
          <div>
            <div>
              <h1 className="text-4xl font-bold mb-8 text-center">
                Nutrition Analyzer
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Input */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend my-2">Upload Food Image</legend>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered w-full"
                    disabled={loading}
                  />
                </fieldset>

                {/* Image Preview */}
                {preview && (
                  <div className="border-2 border-dashed border-primary p-4 rounded-lg w-[60%]">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-w-full h-auto rounded"
                    />
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="alert alert-error">
                    <span>{error}</span>
                  </div>
                )}

                {/* Process Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-[50%] text-center bg-indigo-50"
                  disabled={loading || !file}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Processing...
                    </>
                  ) : (
                    "Analyze Image"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[40%] mx-5 p-2">
        <div className="">
          {result && (
            <div className="mt-8 space-y-4">
              <span className="text-2xl font-bold ">Detected Foods</span>
              {result.food_items && (
                <div className="border-2 rounded-xl">
                  <div className="space-y-2">
                    {result.food_items.map((item, idx) => (
                      <div className="card card-border bg-base-100 w-full">
                        <div className="card-body bg-slate-50 rounded-xl">
                          <h2 className="card-title font-serif font-semibold text-xl">
                            {idx + 1}. {item.name}
                          </h2>
                          <p className="text-sm italic">
                            Calories : {item.calories}kcal | Carbohydrates :{" "}
                            {item.carbs}g | Protein : {item.protein}g | Fat :{" "}
                            {item.fat}g
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.total_calories && (
                <div className="stats  shadow w-full">
                  <div className="stat">
                    <div className="stat-title">Total Calories</div>
                    <div className="stat-value text-primary">
                      {result.total_calories} kcal
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {
            isLoggedIn && result &&
            <div className="mt-5 space-y-3">
              <select 
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="select select-bordered w-full text-sm"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
              <button 
                onClick={handleSaveMeal}
                disabled={isSaving}
                className="w-full btn btn-active btn-success bg-green-400 font-black"
              >
                {isSaving ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  "Add this to your meal"
                )}
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default FoodAnalyzer;
