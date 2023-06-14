const jwt = require("jsonwebtoken");

module.exports = function (adminRole) { // isAdmin value
  return function (req, res, next) {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).json({ msg: "No token in header" });
    }
    try {
      const decoded = jwt.verify(token, "secret-key");
      req.user = decoded.user;

      // Check if the user has the required role
      if (adminRole && req.user.isAdmin !== adminRole) {
        return res.status(403).json({ msg: "Access denied" });
      }

      next();
    } catch (err) {
      res.status(500).json({
        msg: err.message,
      });
    }
  };
};
