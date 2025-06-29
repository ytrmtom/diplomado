import bcrypt from "bcrypt";
import config from "../config/env.js";
import logger from "../logs/logger.js";

export const encriptar = async (password) => {
    try {
        const salt = config.BCRYPT_SALT_ROUNDS;
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        logger.error(error);
        throw new Error("Error encriptando el password");
    }
};

export const comparar = async (password, hash) => {
    try {
        console.log("Comparando password:", password, "con hash:", hash);
        return await bcrypt.compare(password, hash);
    } catch (error) {
        logger.error(error);
        throw new Error("Error comparando el password");
    }
};