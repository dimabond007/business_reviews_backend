"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const business_route_1 = __importDefault(require("./routes/business.route"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
async function main() {
    await (0, db_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({}));
    const publicPath = path_1.default.join(__dirname, 'public');
    app.use(express_1.default.static(publicPath));
    app.use("/api/user", user_route_1.default);
    app.use("/api/business", business_route_1.default);
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(publicPath, 'index.html'));
    });
}
main();
exports.default = app;
//# sourceMappingURL=app.js.map