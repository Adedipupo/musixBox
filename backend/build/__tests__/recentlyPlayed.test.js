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
describe("test relating to Auth", function () {
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
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Save to recently played collection", function () {
    it("should create a playlist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var playlist, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    playlist = {
                        name: "myplaylist",
                        genre_id: "60bbf32e6d0d135bb9c2cd32",
                    };
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post(url + "/playlist")
                            .send(playlist)
                            .set("authorization", "Bearer " + currentUser.token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    expect(res.body.status).toBe("successful");
                    expect(res.body).toHaveProperty("data");
                    expect(res.body.data.payload.name).toBe(playlist.name);
                    currentUser.playlistId = res.body.data.payload._id;
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should save the recently played playlist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var playlistData, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    playlistData = {
                        directory: "playlist",
                        id: currentUser.playlistId,
                    };
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post(url + "/recently-played")
                            .send(playlistData)
                            .set("authorization", "Bearer " + currentUser.token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    expect(res.body.status).toBe("successful");
                    expect(res.body).toHaveProperty("data");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should save the recently played artist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var artistData, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    artistData = {
                        directory: "artist",
                        id: "60bd5c32f134759588289077",
                    };
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post(url + "/recently-played")
                            .send(artistData)
                            .set("authorization", "Bearer " + currentUser.token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    expect(res.body.status).toBe("successful");
                    expect(res.body.data.directory_info).toBe(artistData.id);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should save the recently played album", function () { return __awaiter(void 0, void 0, void 0, function () {
        var albumData, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    albumData = {
                        directory: "album",
                        id: "60bd642e6d46f3af2adea824",
                    };
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post(url + "/recently-played")
                            .send(albumData)
                            .set("authorization", "Bearer " + currentUser.token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    expect(res.body.status).toBe("successful");
                    expect(res.body).toHaveProperty("data");
                    expect(res.body.data.directory_info).toBe(albumData.id);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Get all recently played of a user", function () {
    it("Should return recently played playlist, album and artist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .get(url + "/recently-played")
                        .set("authorization", "Bearer " + currentUser.token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body.status).toBe("successful");
                    expect(res.body).toHaveProperty("data");
                    expect(Array.isArray(res.body.data)).toBe(true);
                    expect(res.body.data).toHaveLength(3);
                    return [2 /*return*/];
            }
        });
    }); });
});
