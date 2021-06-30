"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var orders_1 = require("../handlers/orders");
var verify_1 = __importDefault(require("../utilities/verify"));
var ordersRoute = express_1.Router();
ordersRoute.get('/current/:uid', verify_1.default, orders_1.showCurrent);
ordersRoute.get('/completed/:uid', verify_1.default, orders_1.indexCompleted);
exports.default = ordersRoute;
//# sourceMappingURL=orders.js.map