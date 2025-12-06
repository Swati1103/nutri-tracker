export const storage = {
  // Save user data
  setUser: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("💾 User saved to localStorage:", userData);
  },

  // Get user data
  getUser: () => {
    try {
      const user = localStorage.getItem("user");
      
      // ✅ FIX: Check if user exists BEFORE parsing
      if (user && user !== "undefined" && user !== "null") {
        return JSON.parse(user);
      }
      return null;
    } catch (error) {
      console.error("❌ Error parsing user data:", error);
      localStorage.removeItem("user");
      return null;
    }
  },

  // Check if user exists
  isLoggedIn: () => {
    try {
      const user = localStorage.getItem("user");
      return user && user !== "undefined" && user !== "null";
    } catch (error) {
      return false;
    }
  },

  // Clear user data (logout)
  clearUser: () => {
    localStorage.removeItem("user");
    console.log("🗑️ User cleared from localStorage");
  },
};