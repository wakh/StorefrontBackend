"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./routes/users"));
var products_1 = __importDefault(require("./routes/products"));
var orders_1 = __importDefault(require("./routes/orders"));
var app = express_1.default();
var port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send('Main');
});
app.use('/users', users_1.default);
app.use('/orders', orders_1.default);
app.use('/products', products_1.default);
app.listen(port, function () {
    console.log('Server started on port ' + port);
});
//# sourceMappingURL=server.js.map