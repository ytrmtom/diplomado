import User from "../models/user.js";
import { comparar } from "../common/bcrypt.js";
import jwt from 'jsonwebtoken';
import config from "../config/env.js";

async function login(req, res, next) {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Request body is required" });
        }
        
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        console.log("Received login request for username:", username, password);
        const user = await User.findOne({
            where: { username },
        });
        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }
        const isMatch = await comparar(password, user.password );
        console.log("Password match:", isMatch);
        if (!isMatch) {
            return res.status(403).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            { userId: user.id }, 
            config.JWT_SECRET, 
            { expiresIn: config.JWT_EXPIRES_IN }
        );
        
        return res.json({ token });
    } catch (error) {
        next(error);
    }
}

export default {
    login,
};
