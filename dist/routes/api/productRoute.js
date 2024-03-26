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
var express_1 = __importDefault(require("express"));
var products_1 = require("../../models/products");
var auth_1 = __importDefault(require("../../middleware/auth"));
var productRoute = express_1["default"].Router();
var productStore = new products_1.ProductStore();
productRoute.get("/", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, productStore.index()];
            case 1:
                products = _a.sent();
                res
                    .status(200)
                    .json({ message: "Get list of users successfully", data: products });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).send({ status: 500, message: "".concat(error_1) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
productRoute.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, product, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                productId = parseInt(req.params.id);
                if (!(productId && typeof productId == "number")) return [3 /*break*/, 2];
                return [4 /*yield*/, productStore.showProductInfo(productId)];
            case 1:
                product = _a.sent();
                res
                    .status(200)
                    .json({ message: "Get product info successfully", data: product });
                return [3 /*break*/, 3];
            case 2:
                res.status(400).send({ message: "Please pass product id as a number" });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                res.status(500).send({ status: 500, message: "".concat(error_2) });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
productRoute.post("/", auth_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newProduct, createdProduct, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                newProduct = {
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.category
                };
                if (!(newProduct.name && newProduct.price)) return [3 /*break*/, 2];
                return [4 /*yield*/, productStore.createProduct(newProduct)];
            case 1:
                createdProduct = _a.sent();
                if (createdProduct) {
                    res.status(200).json({
                        message: "Create new product successfully",
                        data: createdProduct
                    });
                }
                else {
                    throw new Error("Error when created Product");
                }
                return [3 /*break*/, 3];
            case 2:
                res.status(400).send({ message: "Please input product name and price" });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                res.status(500).send({ message: "".concat(error_3) });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
productRoute.get("/category/:category", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryName, productByCategory, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                categoryName = req.params.category;
                if (!categoryName) return [3 /*break*/, 2];
                return [4 /*yield*/, productStore.getProductByCategory(categoryName)];
            case 1:
                productByCategory = _a.sent();
                res.status(200).json({
                    message: "Successfully get list of products by category",
                    data: productByCategory
                });
                return [3 /*break*/, 3];
            case 2:
                res
                    .status(400)
                    .send({
                    message: "Please pass product category that you want to search"
                });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                res.status(500).json({
                    message: "".concat(error_4)
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports["default"] = productRoute;
