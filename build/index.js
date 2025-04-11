"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const user_route_1 = __importDefault(require("./routes/user.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const workspace_route_1 = __importDefault(require("./routes/workspace.route"));
const expense_route_1 = __importDefault(require("./routes/expense.route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://mind-money-993vsqo98-anythinglords-projects.vercel.app/", // enable only client
    credentials: true, // enable cookies and autenticación
}));
app.use(express_1.default.json()); // middleware -> transform the req.body to json
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/status", (_req, res) => {
    res.json({ message: 'api ok' });
});
app.use("/api/v1/users", user_route_1.default);
app.use("/api/v1/workspaces", workspace_route_1.default);
app.use("/api/v1/expenses", expense_route_1.default);
app.listen(config_1.PORT, () => { });
