"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.loginUser = exports.registerUser = void 0;
var joiValidate_1 = require("../validations/joiValidate");
var userModel_1 = require("../models/userModel");
var auth_1 = require("../utils/auth");
var response_1 = __importDefault(require("../utils/response"));
var responseStatus = new response_1.default();
var registerUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error, _a, email, password, firstName, lastName, dateOfBirth, gender, exist, newUser, token, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    error = joiValidate_1.validateUser(req.body).error;
                    if (error) {
                        responseStatus.setError(401, error.message);
                        return [2 /*return*/, responseStatus.send(res)];
                    }
                    _a = req.body, email = _a.email, password = _a.password, firstName = _a.firstName, lastName = _a.lastName, dateOfBirth = _a.dateOfBirth, gender = _a.gender;
                    return [4 /*yield*/, userModel_1.UserModel.findOne({ email: email })];
                case 1:
                    exist = _b.sent();
                    if (exist) {
                        responseStatus.setError(409, "user exist");
                        return [2 /*return*/, responseStatus.send(res)];
                    }
                    return [4 /*yield*/, new userModel_1.UserModel({
                            email: email.toLowerCase(),
                            password: password,
                            firstName: firstName,
                            lastName: lastName,
                            dateOfBirth: dateOfBirth,
                            gender: gender,
                        })];
                case 2:
                    newUser = _b.sent();
                    return [4 /*yield*/, newUser.save()];
                case 3:
                    _b.sent();
                    token = auth_1.generateToken(newUser._id);
                    newUser.password = undefined;
                    responseStatus.setSuccess(201, "successful", { data: newUser, token: token });
                    return [2 /*return*/, responseStatus.send(res)];
                case 4:
                    error_1 = _b.sent();
                    responseStatus.setError(401, "invalid credentials");
                    return [2 /*return*/, responseStatus.send(res)];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.registerUser = registerUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var password, email, user, _a, data, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    password = req.body.password;
                    email = req.body.email.toLowerCase();
                    return [4 /*yield*/, userModel_1.UserModel.findOne({ email: email })];
                case 1:
                    user = _b.sent();
                    _a = user;
                    if (!_a) return [3 /*break*/, 3];
                    return [4 /*yield*/, user.isPasswordMatch(password)];
                case 2:
                    _a = (_b.sent());
                    _b.label = 3;
                case 3:
                    if (_a) {
                        data = {
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            gender: user.gender,
                            dateOfBirth: user.dateOfBirth,
                        };
                        responseStatus.setSuccess(200, "success", __assign(__assign({}, data), { token: auth_1.generateToken(user._id) }));
                        return [2 /*return*/, responseStatus.send(res)];
                    }
                    responseStatus.setError(400, "Invalid Credentials");
                    return [2 /*return*/, responseStatus.send(res)];
                case 4:
                    error_2 = _b.sent();
                    responseStatus.setError(400, "Invalid Credentials");
                    return [2 /*return*/, responseStatus.send(res)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.loginUser = loginUser;
