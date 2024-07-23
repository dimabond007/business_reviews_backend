"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const businessSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    address: { type: String },
    city: { type: String },
    district: { type: String },
    category: { type: String },
});
const Business = (0, mongoose_1.model)("Business", businessSchema);
exports.default = Business;
//# sourceMappingURL=Business.js.map