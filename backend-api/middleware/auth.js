import jwt from "jsonwebtoken";

// ✅ FACTORY FUNCTION TO CREATE VERIFY TOKEN MIDDLEWARE
export const createVerifyToken = (JWT_SECRET) => {
  return (req, res, next) => {
    console.log("\n🔐 ===== TOKEN VERIFICATION =====");

    // ✅ Try to get token from cookies OR Authorization header
    let token = req.cookies.token;

    // ✅ If no cookie, check Authorization header
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7); // Remove "Bearer " prefix
        console.log("📋 Token from Authorization header");
      }
    } else {
      console.log("🍪 Token from cookie");
    }

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