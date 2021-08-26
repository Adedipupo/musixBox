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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPublicPlaylists = exports.searchQuery = exports.searchPlaylist = void 0;
var genres_1 = require("../services/genres");
var response_1 = __importDefault(require("../utils/response"));
var playlistModel_1 = __importDefault(require("../models/playlistModel"));
var responseStatus = new response_1.default();
var searchPlaylist = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var playlistId, songTitle_1, playlist, track, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    playlistId = req.params.id;
                    songTitle_1 = req.query.name;
                    return [4 /*yield*/, playlistModel_1.default.findById({ _id: playlistId })];
                case 1:
                    playlist = _a.sent();
                    if (!playlist) {
                        responseStatus.setError(404, "playlist not found");
                        return [2 /*return*/, responseStatus.send(res)];
                    }
                    track = playlist.tracks;
                    if (track) {
                        data = track.filter(function (song) {
                            return song.title.toLowerCase().indexOf(songTitle_1 === null || songTitle_1 === void 0 ? void 0 : songTitle_1.toLocaleLowerCase()) >= 0;
                        }
                        //   return song;
                        );
                        if (data.length === 0) {
                            responseStatus.setError(404, "No song Found");
                            return [2 /*return*/, responseStatus.send(res)];
                        }
                        responseStatus.setSuccess(200, "successful", data);
                        return [2 /*return*/, responseStatus.send(res)];
                    }
                    responseStatus.setError(404, "empty track list");
                    return [2 /*return*/, responseStatus.send(res)];
                case 2:
                    error_1 = _a.sent();
                    responseStatus.setError(500, error_1.message);
                    return [2 /*return*/, responseStatus.send(res)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.searchPlaylist = searchPlaylist;
// search album playlist artist
var searchQuery = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var queryString, playlistSearch, allSearch, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    queryString = req.query.name;
                    if (!queryString) return [3 /*break*/, 3];
                    return [4 /*yield*/, exports.searchPublicPlaylists(queryString)];
                case 1:
                    playlistSearch = _a.sent();
                    return [4 /*yield*/, genres_1.fetchAllQuery(queryString)];
                case 2:
                    allSearch = _a.sent();
                    data = __spreadArray(__spreadArray([], allSearch), playlistSearch);
                    if (data.length === 0) {
                        responseStatus.setError(404, "search not found");
                        return [2 /*return*/, responseStatus.send(res)];
                    }
                    responseStatus.setSuccess(200, "successfull", data);
                    return [2 /*return*/, responseStatus.send(res)];
                case 3:
                    responseStatus.setError(400, "type the search word ");
                    return [2 /*return*/, responseStatus.send(res)];
                case 4:
                    error_2 = _a.sent();
                    responseStatus.setError(500, error_2.message);
                    return [2 /*return*/, responseStatus.send(res)];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.searchQuery = searchQuery;
// search user playlist
var searchPublicPlaylists = function (search) { return __awaiter(void 0, void 0, void 0, function () {
    var publicPlaylists, data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, playlistModel_1.default.find({ isPublic: true })];
            case 1:
                publicPlaylists = _a.sent();
                if (publicPlaylists) {
                    data = publicPlaylists.filter(function (playlist) {
                        return playlist.name.toLowerCase().indexOf(search === null || search === void 0 ? void 0 : search.toLocaleLowerCase()) >= 0;
                    });
                    return [2 /*return*/, data];
                }
                throw new Error("playlist not found");
            case 2:
                error_3 = _a.sent();
                throw new Error(error_3.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.searchPublicPlaylists = searchPublicPlaylists;
