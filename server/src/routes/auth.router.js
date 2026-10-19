import express from "express";
import { registerValidation } from "../validation/auth.validation.js";
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

router.post("/login", loginUserController);

router.get("/get-me", authenticate, getMeController);

router.get("/refresh-token", refreshTokenController);

router.get( "/google",
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
      const accessToken = generateToken(isUserExists, "access");
      const refreshToken = generateToken(isUserExists, "refresh");
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
      });
      await userModel.findByIdAndUpdate(isUserExists._id, { refreshToken });

      return res.json({
        message: "Google authentication successful",
        data: {
          accessToken,
          user: isUserExists,
        },
      });
      return;
    }

    const newUser = await userModel.create({
      username: user.displayName,
      email: user.emails[0].value,
      googleId: user.id,
    });

    const accessToken = generateToken(newUser, "access");
    const refreshToken = generateToken(newUser, "refresh");
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    await userModel.findByIdAndUpdate(newUser._id, { refreshToken });

    res.json({
      message: "Google authentication successful",
      data: {
        accessToken,
        user: newUser,
      },
    });

  }
);

export default router;
