"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var tokenSecret = process.env.TOKEN_SECRET;
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(' ')[1];
        var decoded = jsonwebtoken_1.default.verify(token, tokenSecret);
        next();
    }
    catch (err) {
        res.status(401).send(err);
    }
};
exports.default = verifyAuthToken;
//# sourceMappingURL=verify.js.map