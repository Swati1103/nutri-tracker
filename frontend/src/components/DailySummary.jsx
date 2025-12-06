import { useEffect, useState } from "react";
import { getFullURL } from "../utils/config";

function DailySummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function loadSummary() {
      const res = await fetch(getFullURL("/meal/daily-summary?user_id=1"));
      const data = await res.json();
      setSummary(data);
    }
    loadSummary();
  }, []);

  if (!summary) return null;

  return (
    <div className="bg-white shadow p-4 rounded max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">📊 Today's Summary</h2>

      <p><strong>Total Calories:</strong> {summary.calories}</p>
      <p><strong>Total Protein:</strong> {summary.protein}</p>
      <p><strong>Total Fat:</strong> {summary.fat}</p>
      <p><strong>Total Carbs:</strong> {summary.carbohydrates}</p>
    </div>
  );
}

export default DailySummary;