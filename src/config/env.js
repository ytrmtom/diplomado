const requiredEnv = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};



const config = {
    PORT: process.env.PORT ?? 3000,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_DIALECT: process.env.DB_DIALECT,
    BCRYPT_SALT_ROUNDS: +process.env.BCRYPT_SALT_ROUNDS,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};

export default config;