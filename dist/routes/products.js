"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var products_1 = require("../handlers/products");
var verify_1 = __importDefault(require("../utilities/verify"));
var productsRoute = express_1.Router();
productsRoute.get('/', products_1.index);
productsRoute.get('/:id', products_1.show);
productsRoute.post('/', verify_1.default, products_1.create);
productsRoute.get('/:category', products_1.indexCategory);
productsRoute.get('/topfive', products_1.topFive);
exports.default = productsRoute;
//# sourceMappingURL=products.js.map