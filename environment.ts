import dotenv from "dotenv";
import logger from "./utils/logger/log4js";

dotenv.config({ path: `.env` });

interface Environment {
    [key: string]: EnvironmentValues;
}

interface EnvironmentValues {
    baseUrl: string;
    apiUrl: string;
    sessionId?: string;
}

const environment: Environment = {
    test: {
        baseUrl: process.env.BASE_URL || "",
        apiUrl: "https://www.google.lt",
    },
};

if (!process.env.ENV || !["test"].includes(process.env.ENV.toLowerCase())) {
    logger.info('Please provide a correct environment like "npx cross-env ENV=test"');
    process.exit();
}

logger.info(`Test will be run against ${process.env.ENV} environment`);

export default environment[process.env.ENV];
