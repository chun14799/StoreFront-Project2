"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var routers = express_1["default"].Router();
var productRoute_1 = __importDefault(require("../routes/api/productRoute"));
var userRoute_1 = __importDefault(require("./api/userRoute"));
var orderRoute_1 = __importDefault(require("./api/orderRoute"));
routers.get('/', function (req, res) {
    res.send('Welcome to Project 2 of Udacity');
});
routers.use('/products', productRoute_1["default"]);
routers.use('/users', userRoute_1["default"]);
routers.use('/orders', orderRoute_1["default"]);
exports["default"] = routers;
