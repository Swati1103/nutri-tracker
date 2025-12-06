import mongoose from "mongoose";

const mealHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foodName: {
      type: String,
      required: true,
    },
    calories: Number,
    protein: Number,
    carbohydrates: Number,
    fat: Number,
    detected: [String],
    imageFileName: String,
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "snack"],
      default: "snack",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MealHistory", mealHistorySchema);