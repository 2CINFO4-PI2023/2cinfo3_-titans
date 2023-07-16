"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = exports.authorize = exports.validateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const basic_auth_1 = __importDefault(require("basic-auth"));
const auth_service_1 = require("../modules/user/service/auth.service");
function validateJwtToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null || !(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("err: ", err);
            return res.sendStatus(403);
        }
        next();
    });
}
exports.validateJwtToken = validateJwtToken;
function authorize(allowedRoles) {
    return (req, res, next) => {
        var _a, _b;
        console.log("headers: ", req.headers);
        const authHeader = req.headers["authorization"];
        console.log("authHeader: ", authHeader);
        const token = authHeader && authHeader.split(" ")[1];
        console.log("token: ", token);
        try {
            const decoded = (jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET));
            const userRole = decoded.user.role;
            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({ message: "Forbidden" });
            }
            const id = req.params.id;
            console.log("id", id !== ((_a = decoded.user._id) === null || _a === void 0 ? void 0 : _a.toString()));
            console.log("id: ", id);
            if (userRole === auth_service_1.ROLES.CLIENT &&
                id &&
                id !== ((_b = decoded.user._id) === null || _b === void 0 ? void 0 : _b.toString())) {
                return res.status(403).json({ message: "Forbidden not the user" });
            }
            next();
        }
        catch (error) {
            console.log("error", error);
            return res.status(401).json({ message: "Unauthorized" });
        }
    };
}
exports.authorize = authorize;
function authenticateAdmin(req, res, next) {
    const credentials = (0, basic_auth_1.default)(req);
    const expectedPassword = process.env.ADMIN_PASSWORD;
    const expectedUsername = process.env.ADMIN_USERNAME;
    if (!credentials ||
        credentials.name !== expectedUsername ||
        credentials.pass !== expectedPassword) {
        res.status(401).send("Unauthorized");
        return;
    }
    next();
}
exports.authenticateAdmin = authenticateAdmin;
