import { verifyToken } from "../utils/auth.utils.js";

export default function authenticate(req, res, next) {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ message: "Access token not found" });
    }

    const decoded = verifyToken(accessToken, "access");

    if (!decoded) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access token" });
  }
};
