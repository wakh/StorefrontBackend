"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.create = exports.indexCompleted = exports.showCurrent = exports.show = void 0;
var orders_1 = require("../models/orders");
var order_products_1 = require("../models/order_products");
var store = new orders_1.OrderStore();
var opStore = new order_products_1.OrderProductStore();
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, op, _a, _b, _c, _d, err_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                id = req.params.id;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 5, , 6]);
                op = {};
                _a = op;
                return [4 /*yield*/, store.showCurrent(id)];
            case 2:
                _a.oInfo = _e.sent();
                _b = op;
                _d = (_c = opStore).getProductInfo;
                return [4 /*yield*/, opStore.indexByOrder(id.toString())];
            case 3: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
            case 4:
                _b.products = _e.sent();
                res.json(op);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _e.sent();
                res.status(400).send(err_1 + id);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.show = show;
var showCurrent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, op, _a, _b, _c, _d, err_2;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                uid = req.params.uid;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 6, , 7]);
                op = {};
                _a = op;
                return [4 /*yield*/, store.showCurrent(uid)];
            case 2:
                _a.oInfo = _e.sent();
                if (!op.oInfo.id) return [3 /*break*/, 5];
                _b = op;
                _d = (_c = opStore).getProductInfo;
                return [4 /*yield*/, opStore.indexByOrder(op.oInfo.id.toString())];
            case 3: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
            case 4:
                _b.products = _e.sent();
                _e.label = 5;
            case 5:
                res.json(op);
                return [3 /*break*/, 7];
            case 6:
                err_2 = _e.sent();
                res.status(400).send(err_2 + uid);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.showCurrent = showCurrent;
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.index()];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400).send(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var indexCompleted = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, orders, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uid = req.params.uid;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.indexCompleted(uid)];
            case 2:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(400).send(err_4 + uid);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.indexCompleted = indexCompleted;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, newOrder, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uid = req.params.uid;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.create(uid)];
            case 2:
                newOrder = _a.sent();
                res.json(newOrder);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(400).send(err_5 + uid);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, store.show(id)];
            case 2:
                order = _a.sent();
                return [4 /*yield*/, store.delete(id)];
            case 3:
                _a.sent();
                if (!order.status) return [3 /*break*/, 5];
                return [4 /*yield*/, store.create(order.user_id.toString())];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                res.send("Order id " + id + " deleted");
                return [3 /*break*/, 7];
            case 6:
                err_6 = _a.sent();
                res.status(400).send(err_6 + id);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var add = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var op, newOrderProduct, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                op = {
                    order_id: req.body.order_id,
                    product_id: req.body.product_id,
                    quantity: req.body.quantity
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, opStore.create(op)];
            case 2:
                newOrderProduct = _a.sent();
                res.json(newOrderProduct);
                return [3 /*break*/, 4];
            case 3:
                err_7 = _a.sent();
                res.status(400).send(err_7 + op);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.add = add;
var complete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var oid, order, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                oid = req.params.oid;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, store.complete(oid)];
            case 2:
                order = _a.sent();
                if (!!order.status) return [3 /*break*/, 4];
                return [4 /*yield*/, store.create(order.user_id.toString())];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                res.json(order);
                return [3 /*break*/, 6];
            case 5:
                err_8 = _a.sent();
                res.status(400).send(err_8 + oid);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=orders.js.map