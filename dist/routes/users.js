"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_1 = require("../handlers/users");
var verify_1 = __importDefault(require("../utilities/verify"));
var usersRoute = express_1.Router();
usersRoute.get('/', verify_1.default, users_1.index);
usersRoute.get('/:id', verify_1.default, users_1.show);
usersRoute.post('/', users_1.create);
exports.default = usersRoute;
//# sourceMappingURL=users.js.map