
export const allowRoles = (...roles) => (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(401).json({ message: "Unauthorized: user not logged in or role missing" });
  }

  if (!roles.map(r => r.toLowerCase()).includes(req.user.role.toLowerCase())) {
    return res.status(403).json({ message: "Forbidden: insufficient role" });
  }

  next();
};

export default allowRoles;
