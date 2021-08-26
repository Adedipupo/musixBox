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
var app_1 = __importDefault(require("../app"));
var supertest_1 = __importDefault(require("supertest"));
var mongoMemoryConnect_1 = require("../database/mongoMemoryConnect");
var currentUser = {};
var url = "/api/v1/music-box-api";
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoMemoryConnect_1.dbDisconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe("test relating to user signup", function () {
    it("for Register", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).post(url + "/users/register").send({
                        firstName: "emeka",
                        lastName: "okwor",
                        email: "emeka@gmail.com",
                        password: "12345",
                        dateOfBirth: "2021/12/23",
                        gender: "M",
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    expect(res.body.data.data.email).toBe("emeka@gmail.com");
                    return [2 /*return*/];
            }
        });
    }); });
    it("for Login", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).post(url + "/users/login").send({
                        email: "emeka@gmail.com",
                        password: "12345",
                    })];
                case 1:
                    res = _a.sent();
                    currentUser.token = res.body.token;
                    expect(res.status).toBe(200);
                    expect(res.body.data).toHaveProperty("token");
                    expect(res.body.data.email).toBe("emeka@gmail.com");
                    currentUser.token = res.body.data.token;
                    currentUser.id = res.body.data._id;
                    return [2 /*return*/];
            }
        });
    }); });
    it("change user password", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .put(url + "/users/change-password/" + currentUser.id)
                        .send({
                        oldPassword: "12345",
                        newPassword: "123456",
                    })
                        .set("authorization", "Bearer " + currentUser.token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body.status).toBe("successful");
                    return [2 /*return*/];
            }
        });
    }); });
    it("login with new password", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).post(url + "/users/login").send({
                        email: "emeka@gmail.com",
                        password: "123456",
                    })];
                case 1:
                    res = _a.sent();
                    currentUser.token = res.body.token;
                    expect(res.status).toBe(200);
                    expect(res.body.data).toHaveProperty("token");
                    expect(res.body.data.email).toBe("emeka@gmail.com");
                    currentUser.token = res.body.data.token;
                    currentUser.id = res.body.data._id;
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not login with old password", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).post(url + "/users/login").send({
                        email: "emeka@gmail.com",
                        password: "12345",
                    })];
                case 1:
                    res = _a.sent();
                    currentUser.token = res.body.token;
                    expect(res.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Fetch Genre", function () {
    it("should fetch all genre", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).get(url + "/genres")];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body.status).toBe("successful");
                    expect(res.body).toHaveProperty("data");
                    expect(Array.isArray(res.body.data)).toBe(true);
                    currentUser.genreId = res.body.data[0].id;
                    return [2 /*return*/];
            }
        });
    }); });
    it("should fetch one genre by id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).get(url + "/genres/" + currentUser.genreId)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body.status).toBe("successful");
                    expect(res.body).toHaveProperty("data");
                    return [2 /*return*/];
            }
        });
    }); });
});
