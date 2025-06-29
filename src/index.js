import app from "./app.js";
import logger from "./logs/logger.js";
import path from 'node:path';
import 'dotenv/config';
import config from "./config/env.js";
import sequelize from "./database/database.js";

async function main() {
    try {
        await sequelize.sync({ force: false });
        const PORT = config.PORT;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            logger.info(`This is an info message`);
            logger.error(`This is an error message`);
            logger.warn(`This is a warning message`);
            logger.fatal(`This is a fatal message`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
}

main();
