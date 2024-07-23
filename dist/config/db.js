"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    console.log("Connecting to MongoDB with URI:", mongoUri);
    if (!mongoUri) {
        throw new Error("MONGO_URI is not defined in .env file");
    }
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log("MongoDB connected");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error("Unknown error", error);
        }
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map