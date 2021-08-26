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
/* eslint-disable no-console */
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app"));
var mongoMemoryConnect_1 = require("../database/mongoMemoryConnect");
var currentUser = {};
var uri = "/api/v1/music-box-api";
var playlistId = "";
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
describe("test for user authentication", function () {
    it("should be able to signup ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).post(uri + "/users/register").send({
                        firstName: "ken",
                        lastName: "bayo",
                        email: "bayo@gmail.com",
                        password: "12345",
                        dateOfBirth: "2021/12/23",
                        gender: "M",
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    expect(res.body.data.data.gender).toBe("M");
                    expect(res.body.data.data.email).toBe("bayo@gmail.com");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should be able to signin", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).post(uri + "/users/login").send({
                        email: "bayo@gmail.com",
                        password: "12345",
                    })];
                case 1:
                    res = _a.sent();
                    currentUser.token = res.body.data.token;
                    expect(res.status).toBe(200);
                    expect(res.body.data).toHaveProperty("token");
                    expect(res.body.data.email).toBe("bayo@gmail.com");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("POST playlist route", function () {
    it("should create a Playlist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        name: "Blue sunday",
                        genreId: "60b3f80a5d1a2a7af7e668e5",
                        isPublic: true,
                    };
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post(uri + "/playlist")
                            .set("Authorization", "Bearer " + currentUser.token)
                            .send(data)];
                case 1:
                    res = _a.sent();
                    playlistId = res.body.data.payload._id;
                    expect(res.body.status).toBe("successful");
                    expect(res.status).toBe(201);
                    expect(res.body.data).toHaveProperty("payload");
                    expect(res.body.data.payload).toHaveProperty("createdAt");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("GET all playlists created by a user", function () {
    it("should respond with all user playlists", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .get(uri + "/playlist")
                        .set("Authorization", "Bearer " + currentUser.token)];
                case 1:
                    res = _a.sent();
                    expect(res.body.status).toBe("successful");
                    expect(res.status).toBe(200);
                    expect(res.body).toHaveProperty("data");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("GET all public playlist", function () {
    it("should respond with all public playlist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .get(uri + "/playlist")
                        .set("Authorization", "Bearer " + currentUser.token)];
                case 1:
                    res = _a.sent();
                    expect(res.body.status).toBe("successful");
                    expect(res.status).toBe(200);
                    expect(res.body.data).toHaveProperty("payload");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("GET a user playlist By Id", function () {
    it("should respond with a single playlist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .get(uri + "/playlist/" + playlistId)
                        .set("Authorization", "Bearer " + currentUser.token)];
                case 1:
                    res = _a.sent();
                    expect(res.body.status).toBe("successful");
                    expect(res.status).toBe(200);
                    expect(res.body.data).toHaveProperty("payload");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with a single Public playlist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .get(uri + "/playlist/" + playlistId)
                        .set("Authorization", "Bearer " + currentUser.token)];
                case 1:
                    res = _a.sent();
                    expect(res.body.status).toBe("successful");
                    expect(res.status).toBe(200);
                    expect(res.body.data).toHaveProperty("payload");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("GET most played playlist", function () {
    it("should retrieve the most played Playlist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .get(uri + "/playlist/mostPlayed")
                        .set("Authorization", "Bearer " + currentUser.token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body.status).toBe("successful");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("GET most played album", function () {
    it("should retrieve the most played album", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .get(uri + "/album/mostPlayed")
                        .set("Authorization", "Bearer " + currentUser.token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body.status).toBe("successful");
                    expect(res.body.data).toHaveProperty("payload");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("GET most played artist", function () {
    it("should retrieve the most played artist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .get(uri + "/artist/mostPlayed")
                        .set("Authorization", "Bearer " + currentUser.token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body.status).toBe("successful");
                    expect(res.body.data).toHaveProperty("payload");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("GET all album liked by a user", function () {
    it("should retrieve all album liked by a user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .get(uri + "/album/likes")
                        .set("Authorization", "Bearer " + currentUser.token)];
                case 1:
                    res = _a.sent();
                    expect(res.body.status).toBe("error");
                    expect(res.status).toBe(404);
                    expect(res.body.message).toBe("Album is empty");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("GET all artist liked by a user", function () {
    it("should retrieve all artist liked by a user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .get(uri + "/artist/likes")
                        .set("Authorization", "Bearer " + currentUser.token)];
                case 1:
                    res = _a.sent();
                    expect(res.body.status).toBe("error");
                    expect(res.status).toBe(404);
                    expect(res.body.message).toBe("Artist is empty");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("ADD a track to a playlist", function () {
    var data = {
        trackId: 12345,
        title: "Jowo",
    };
    it("should add a track to a playlist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .put(uri + "/playlist/" + playlistId)
                        .set("Authorization", "Bearer " + currentUser.token)
                        .send(data)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    expect(res.body.status).toBe("successful");
                    expect(res.body.data.payload).toHaveProperty("tracks");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("DELETE a track from a playlist", function () {
    var data = {
        trackId: 12345,
        title: "Jowo",
    };
    it("should delete a track from a playlist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .delete(uri + "/playlist/" + playlistId)
                        .set("Authorization", "Bearer " + currentUser.token)
                        .send(data)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    expect(res.body.status).toBe("successful");
                    expect(res.body.data).toHaveProperty("payload");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("DELETE a playlst", function () {
    it("should delete a playlist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .delete(uri + "/playlist/delete/" + playlistId)
                        .set("Authorization", "Bearer " + currentUser.token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    expect(res.body.status).toBe("successful");
                    expect(res.body.message).toBe("Successfully removed!");
                    expect(res.body.data).toHaveProperty("payload");
                    return [2 /*return*/];
            }
        });
    }); });
});
