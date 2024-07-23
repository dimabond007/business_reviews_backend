"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.register = exports.login = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
dotenv_1.default.config();
const { JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User_1.default.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        const isPasswordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};
exports.login = login;
const register = async (req, res) => {
    console.log("register");
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, SALT_ROUNDS);
        const user = new User_1.default({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        const err = error;
        console.log("register", err.name);
        if (err.code === 11000) {
            console.log("username already exists");
            return res.status(400).json({ error: "User already exists" });
        }
        res.status(500).json({ error: "Registration failed" });
    }
};
exports.register = register;
const getUserById = async (req, res) => {
    try {
        const user = await User_1.default.findById({ _id: req.userId }).lean();
        if (!user) {
            throw new mongoose_1.Error(`User ${req.userId}`);
        }
        const { password, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get user by id" });
    }
};
exports.getUserById = getUserById;
//# sourceMappingURL=user.controller.js.map