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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var orders_1 = require("../../models/orders");
var database_1 = __importDefault(require("../../database"));
var query_1 = __importDefault(require("../../utilities/query"));
describe('Orders Model', function () {
    var store = new orders_1.OrderStore();
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = 'INSERT INTO orders (user_id, status)'
                        + ' VALUES ($1, $2) RETURNING *;';
                    return [4 /*yield*/, query_1.default(database_1.default, sql, ['test1', 'TRUE'])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, query_1.default(database_1.default, sql, ['test1', 'FALSE'])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, query_1.default(database_1.default, sql, ['test1', 'TRUE'])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, query_1.default(database_1.default, sql, ['test2', 'TRUE'])];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, query_1.default(database_1.default, sql, ['test2', 'FALSE'])];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('index', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.index()];
                case 1:
                    orders = _a.sent();
                    expect(orders.length).toEqual(5);
                    return [2 /*return*/];
            }
        });
    }); });
    it('indexCompleted', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.indexCompleted('test1')];
                case 1:
                    orders = _a.sent();
                    expect(orders.length).toEqual(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('show', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.show('4')];
                case 1:
                    order = _a.sent();
                    expect(order.user_id).toEqual('test2');
                    return [2 /*return*/];
            }
        });
    }); });
    it('showCurrent', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.showCurrent('test1')];
                case 1:
                    order = _a.sent();
                    expect(order.id).toEqual(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.create('test3')];
                case 1:
                    newOrder = _a.sent();
                    expect(newOrder.user_id).toEqual('test3');
                    return [2 /*return*/];
            }
        });
    }); });
    it('complete', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.complete('4')];
                case 1:
                    order = _a.sent();
                    expect(order.status).toBeFalse;
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.delete('5')];
                case 1:
                    order = _a.sent();
                    expect(order.user_id).toEqual('test2');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=ordersSpec.js.map