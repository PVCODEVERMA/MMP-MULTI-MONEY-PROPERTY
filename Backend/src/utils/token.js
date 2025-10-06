
import jwt from "jsonwebtoken";


export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: `${process.env.ACCESS_TOKEN_LIFETIME}s` }
  );
};


// Generate Refresh Token
export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: `${process.env.REFRESH_TOKEN_LIFETIME}s` }
  );
};

// Verify Access Token
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    return null;
  }
};

// Verify Refresh Token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    return null;
  }
};

// Set Tokens in Cookies (for secure auth)
export const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true", // only true in production
    sameSite: "strict",
    maxAge: parseInt(process.env.ACCESS_TOKEN_LIFETIME) * 1000, // ms
    domain: process.env.COOKIE_DOMAIN,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "strict",
    maxAge: parseInt(process.env.REFRESH_TOKEN_LIFETIME) * 1000,
    domain: process.env.COOKIE_DOMAIN,
  });
};

// Clear Tokens (Logout)
export const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "strict",
    domain: process.env.COOKIE_DOMAIN,
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    domain: process.env.COOKIE_DOMAIN,
  });
};
