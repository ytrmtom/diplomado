import { Sequelize } from "sequelize";
import config from "../config/env.js";

console.log('Database config:', {
    database: config.DB_DATABASE,
    user: config.DB_USER,
    host: config.DB_HOST,
    dialect: config.DB_DIALECT
});

/* const sequelize = new Sequelize(`postgres://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`, {
    dialect: config.DB_DIALECT,
    logging: console.log,
});

export default sequelize; */

export const sequelize = new Sequelize(
    config.DB_DATABASE,
    config.DB_USER,
    config.DB_PASSWORD,
    {
        host: config.DB_HOST,
        dialect: config.DB_DIALECT,
        logging: console.log,
        dialectOptions: 
            config.DB_USE_SSL === "true" ? {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            } 
            : {} 
        }
);
