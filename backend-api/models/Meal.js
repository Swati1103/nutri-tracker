import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  foodName: String,
  calories: Number,
  protein: Number,
  carbohydrates: Number,
  fat: Number,
  detected: [String],
  imageFileName: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Meal", mealSchema);
