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
exports.getPlaylistByGenre = exports.getArtistsByGenre = exports.getOneGenre = exports.getGenres = void 0;
var genres_1 = require("../services/genres");
var genreModel_1 = require("../models/genreModel");
var playlistModel_1 = __importDefault(require("../models/playlistModel"));
var response_1 = __importDefault(require("../utils/response"));
var axios_1 = __importDefault(require("axios"));
var responseStatus = new response_1.default();
function getGenres(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var genre, allGenres, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, genreModel_1.genreModel.find({})];
                case 1:
                    genre = _a.sent();
                    if (!(genre.length === 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, genres_1.fetchGenres()];
                case 2:
                    allGenres = _a.sent();
                    return [4 /*yield*/, genreModel_1.genreModel.insertMany(allGenres.data.data)];
                case 3:
                    data = _a.sent();
                    responseStatus.setSuccess(200, "successful", data);
                    return [2 /*return*/, responseStatus.send(res)];
                case 4:
                    // return successful response
                    responseStatus.setSuccess(200, "successful", genre);
                    return [2 /*return*/, responseStatus.send(res)];
                case 5:
                    error_1 = _a.sent();
                    responseStatus.setError(500, "error");
                    return [2 /*return*/, responseStatus.send(res)];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getGenres = getGenres;
function getOneGenre(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, newId, data, oneGenre, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    id = req.params.id;
                    // return error if id is empty
                    if (!id) {
                        responseStatus.setError(400, "Please provide an Id");
                        return [2 /*return*/, responseStatus.send(res)];
                    }
                    // check if id is a number, if not return error
                    if (typeof +id !== "number") {
                        responseStatus.setError(500, "error");
                        return [2 /*return*/, responseStatus.send(res)];
                    }
                    newId = Number.parseInt(id, 10);
                    return [4 /*yield*/, genreModel_1.genreModel.findOne({ id: newId })];
                case 1:
                    data = _a.sent();
                    if (!!data) return [3 /*break*/, 3];
                    return [4 /*yield*/, genres_1.fetchOne(newId)];
                case 2:
                    oneGenre = _a.sent();
                    if (oneGenre.data.error) {
                        responseStatus.setError(404, "Not Found");
                        return [2 /*return*/, responseStatus.send(res)];
                    }
                    responseStatus.setSuccess(200, "successful", oneGenre);
                    return [2 /*return*/, responseStatus.send(res)];
                case 3:
                    // if data, return return success
                    responseStatus.setSuccess(200, "successful", data);
                    return [2 /*return*/, responseStatus.send(res)];
                case 4:
                    error_2 = _a.sent();
                    responseStatus.setError(500, "error");
                    return [2 /*return*/, responseStatus.send(res)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getOneGenre = getOneGenre;
// controller to get all artists related to a particular genre
var getArtistsByGenre = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get("https://api.deezer.com/genre/" + id + "}/artists")];
            case 2:
                response = _a.sent();
                responseStatus.setSuccess(200, "successful", response.data.data);
                return [2 /*return*/, responseStatus.send(res)];
            case 3:
                error_3 = _a.sent();
                responseStatus.setError(500, "an error ocurred");
                return [2 /*return*/, responseStatus.send(res)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getArtistsByGenre = getArtistsByGenre;
// controller to get all playlist associated to a particular genre
var getPlaylistByGenre = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, playlists, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, playlistModel_1.default.find({
                        genre_id: id,
                        isPublic: true,
                    })];
            case 2:
                playlists = _a.sent();
                responseStatus.setSuccess(200, "successful", playlists);
                return [2 /*return*/, responseStatus.send(res)];
            case 3:
                error_4 = _a.sent();
                responseStatus.setError(500, "an error ocurred");
                return [2 /*return*/, responseStatus.send(res)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getPlaylistByGenre = getPlaylistByGenre;
