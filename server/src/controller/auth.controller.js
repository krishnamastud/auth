import userModel from "../model/auth.model.js";
import { generateToken, verifyToken } from "../utils/auth.utils.js";
import bcrypt from "bcryptjs";

const registerUserController = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await userModel.create({
    username,
    email,
    password: await bcrypt.hash(password, 10),
  });

  const accessToken = generateToken(user, "access");
  const refreshToken = generateToken(user, "refresh");

  await userModel.findByIdAndUpdate(user._id, { refreshToken }, { new: true });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.status(200).json({
    message: "User registered successfully",
    user: {
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
      error: [
        {
          path: "password",
          message: "invalid username or password",
        },
      ],
    });
  }

  const accessToken = generateToken(user, "access");
  const refreshToken = generateToken(user, "refresh");

  await userModel.findByIdAndUpdate(user._id, { refreshToken }, { new: true });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
};

const getMeController = async (req, res) => {
  const { email } = req.user;

  const user = await userModel.findOne({ email });

  res.status(200).json({
    message: "User details retrieved successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

const refreshTokenController = async (req, res) => {
    try {
        const { refreshToken } = req.cookies

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token not found" });
        }

        const decoded = verifyToken(refreshToken, "refresh");

        if (!decoded) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const user = await userModel.findOne({ _id: decoded.id, email: decoded.email });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const newAccessToken = generateToken(user, "access");
        const newRefreshToken = generateToken(user, "refresh");

        await userModel.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken }, { new: true });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
        });

        res.status(200).json({
            message: "Token refreshed successfully",
            accessToken: newAccessToken,
        });
        
    } catch (error) {
        
    }

};

export {
  registerUserController,
  loginUserController,
  getMeController,
  refreshTokenController,
};
