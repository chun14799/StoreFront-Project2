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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
exports.OrderStore = void 0;
var connection_1 = __importDefault(require("../connection"));
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    // @ts-ignore
    OrderStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, connection_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT * FROM orders";
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Data Not Found");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // create order
    OrderStore.prototype.createOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var newOrder, connection, sql_insert_order, result, createdOrder, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        newOrder = {
                            product_id: order.product_id,
                            quantity: order.quantity,
                            user_id: order.user_id,
                            status: order.status
                        };
                        return [4 /*yield*/, connection_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql_insert_order = "\n          WITH new_row AS (\n              INSERT INTO orders (product_id,quantity, user_id,status)\n              VALUES ($1,$2,$3,$4) RETURNING *\n            )\n          INSERT INTO order_product (order_id, product_id) VALUES ((SELECT id FROM new_row), (SELECT product_id FROM new_row)) RETURNING *;\n          ";
                        return [4 /*yield*/, connection_1["default"].query(sql_insert_order, [
                                newOrder.product_id,
                                newOrder.quantity,
                                newOrder.user_id,
                                newOrder.status,
                            ])];
                    case 2:
                        result = _a.sent();
                        if (result && result.rows.length > 0) {
                            createdOrder = result.rows[0];
                            connection.release();
                            return [2 /*return*/, createdOrder];
                        }
                        else {
                            connection.release();
                            throw new Error("Error when insert data to db");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("".concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // get order by user_id
    OrderStore.prototype.getOrdersByUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, results, ordersOfUser, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, connection_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT orders.id , orders.product_id , orders.user_id , orders.quantity, orders.status\n        FROM orders\n        INNER JOIN users\n            ON orders.user_id = users.id\n        WHERE users.id = ".concat(userId, "\n        ");
                        return [4 /*yield*/, connection_1["default"].query(sql)];
                    case 2:
                        results = _a.sent();
                        if (results) {
                            ordersOfUser = results.rows;
                            connection.release();
                            return [2 /*return*/, ordersOfUser];
                        }
                        else {
                            connection.release();
                            throw new Error("Data not found");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("".concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // get completed order by user_id
    OrderStore.prototype.getCompletedOrdersByUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, results, ordersOfUser, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, connection_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT orders.id , orders.product_id , orders.user_id , orders.quantity, orders.status\n          FROM orders\n          INNER JOIN users\n              ON orders.user_id = users.id\n          WHERE users.id = ".concat(userId, "\n          AND orders.status = 'complete'\n          ");
                        return [4 /*yield*/, connection_1["default"].query(sql)];
                    case 2:
                        results = _a.sent();
                        if (results) {
                            ordersOfUser = results.rows;
                            connection.release();
                            return [2 /*return*/, ordersOfUser];
                        }
                        else {
                            connection.release();
                            throw new Error("Data not found");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("".concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.updateStatusOfOrder = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, updatedOrder, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, connection_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "\n            UPDATE orders\n            SET status = 'complete'\n            WHERE id = ".concat(orderId, "\n            RETURNING *;\n        ");
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            updatedOrder = result.rows[0];
                            connection.release();
                            return [2 /*return*/, updatedOrder];
                        }
                        else {
                            connection.release();
                            throw new Error("Error when updating order status");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("".concat(error_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
