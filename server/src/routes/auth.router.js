import express from "express";
import {
  loginValidation,
  registerValidation,
} from "../validation/auth.validation.js";
import authenticate from "./../middleware/auth.middleware.js";
import {
  getMeController,
  loginUserController,
  refreshTokenController,
  registerUserController,
} from "../controller/auth.controller.js";
import passport from "../config/passport.js";
import userModel from "../model/auth.model.js";
import { generateToken } from "../utils/auth.utils.js";

const router = express.Router();

router.post("/register", registerValidation, registerUserController);

router.post("/login", loginValidation, loginUserController);

router.get("/get-me", authenticate, getMeController);

router.get("/refresh-token", refreshTokenController);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: "select_account",
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
  }),
  async (req, res) => {
    const user = req.user;
    const email = user.emails[0].value;

    const isUserExists = await userModel.findOne({ email });

    if (isUserExists) {
      const refreshToken = generateToken(isUserExists, "refresh");
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
      });
      await userModel.findByIdAndUpdate(isUserExists._id, { refreshToken });

      return res.redirect("http://localhost:5173/main/dashboard");
    }

    const newUser = await userModel.create({
      username: user.displayName,
      email: user.emails[0].value,
      googleId: user.id,
    });

    const refreshToken = generateToken(newUser, "refresh");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    await userModel.findByIdAndUpdate(newUser._id, { refreshToken });

    return res.redirect("http://localhost:5173/main/dashboard");
  },
);

export default router;
