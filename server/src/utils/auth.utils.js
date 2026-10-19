import config from '../config/config.js';
import jwt from 'jsonwebtoken';

export const generateToken = (user, type = "access") => {
    const isAccessToken = type === "access";
    let payload = {
        id: user._id,
        email: user.email,
    }

    return jwt.sign(
        payload,
        isAccessToken
            ? config.ACCESS_TOKEN_SECRET
            : config.REFRESH_TOKEN_SECRET,
        {
            expiresIn: isAccessToken ? "15m" : "7d",
        }
    );
};

export const verifyToken = (token, type = "access") => {
    const isAccessToken = type === "access";
    try {
        const decoded = jwt.verify(token, isAccessToken ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET);
        return decoded;
    } catch (error) {
        throw new Error("Invalid token");
    }
}