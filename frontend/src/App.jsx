import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import FoodAnalyzer from "./pages/FoodAnalyzer";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import Test from "./pages/Test";
import Profile from "./pages/Profile";
import MealHistory from "./pages/MealHistory";
import { Routes, Route } from "react-router-dom";
import MealCard from "./components/MealCard";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/analyze" element={<FoodAnalyzer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/meal-history" element={<MealHistory />} />
          <Route path="/meal" element={<MealCard />} />
          <Route path="/analytics" element={<Analytics />} />

          <Route path="/test" element={<Test />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
