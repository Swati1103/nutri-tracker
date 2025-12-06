import jwt from "jsonwebtoken";

// ✅ FACTORY FUNCTION TO CREATE VERIFY TOKEN MIDDLEWARE
export const createVerifyToken = (JWT_SECRET) => {
  return (req, res, next) => {
    console.log("\n🔐 ===== TOKEN VERIFICATION =====");
    console.log("Checking for token...");

    // ✅ Try to get token from cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    console.log("Token found:", token ? "✅ YES" : "❌ NO");

    if (!token) {
      console.error("❌ No token provided");
      return res.status(401).json({
        success: false,
        message: "No token provided - Please login first",
      });
    }

    try {
      console.log("🔍 Verifying token...");
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("✅ Token verified for user:", decoded.username);
      
      req.user = decoded;
      next();
    } catch (err) {
      console.error("❌ Token verification failed:", err.message);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        error: err.message,
      });
    }
  };
};