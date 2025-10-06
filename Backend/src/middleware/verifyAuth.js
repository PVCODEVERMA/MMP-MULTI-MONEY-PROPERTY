import jwt from "jsonwebtoken";

export const verifyAuth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export const verifyRole = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ message: "Forbidden: role mismatch" });
  next();
};

export const isAdmin = (req, res, next) => {
  if (!["SubAdmin", "SuperAdmin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};
