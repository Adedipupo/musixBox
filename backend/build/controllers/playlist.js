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
exports.getLikedPlaylistsByUser = exports.mostPlayedPlaylist = exports.likePublicPost = exports.removePlaylist = exports.removeFromPlaylist = exports.addToPlaylist = exports.createPlaylist = exports.getPlaylist = exports.getPublicPlaylists = void 0;
var playlistModel_1 = __importDefault(require("../models/playlistModel"));
var response_1 = __importDefault(require("../utils/response"));
var response = new response_1.default();
var getPublicPlaylists = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUser, publicPlaylists, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                currentUser = req.user.id;
                if (!currentUser) {
                    response.setError(401, "Unauthorized access");
                    return [2 /*return*/, response.send(res)];
                }
                return [4 /*yield*/, playlistModel_1.default.find({ isPublic: true })
                        .lean()
                        .exec()];
            case 1:
                publicPlaylists = _a.sent();
                if (publicPlaylists) {
                    response.setSuccess(200, "Successful!", { payload: publicPlaylists });
                    return [2 /*return*/, response.send(res)];
                }
                response.setError(404, "No pulic playlist");
                return [2 /*return*/, response.send(res)];
            case 2:
                error_1 = _a.sent();
                response.setError(404, "Invalid request");
                return [2 /*return*/, response.send(res)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPublicPlaylists = getPublicPlaylists;
var getPlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var playlistId, currentUser, playlist, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                playlistId = req.params.id;
                currentUser = req.user.id;
                return [4 /*yield*/, playlistModel_1.default.findById({ _id: playlistId }).lean().exec()];
            case 1:
                playlist = _a.sent();
                if (playlist) {
                    if (playlist.isPublic ||
                        (currentUser && playlist.ownerId == currentUser)) {
                        response.setSuccess(200, "Successful!", { payload: playlist.tracks });
                        return [2 /*return*/, response.send(res)];
                    }
                    response.setError(401, "Private playlist");
                    return [2 /*return*/, response.send(res)];
                }
                response.setError(404, "Playlist not found");
                return [2 /*return*/, response.send(res)];
            case 2:
                error_2 = _a.sent();
                response.setError(400, "Invalid request");
                return [2 /*return*/, response.send(res)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPlaylist = getPlaylist;
var createPlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var playlist, currentUser, newPlaylist, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                playlist = req.body;
                currentUser = req.user.id;
                playlist.ownerId = currentUser;
                return [4 /*yield*/, playlistModel_1.default.create(playlist)];
            case 1:
                newPlaylist = _a.sent();
                if (newPlaylist) {
                    response.setSuccess(201, "Successful!", {
                        payload: newPlaylist.toJSON(),
                    });
                    return [2 /*return*/, response.send(res)];
                }
                response.setError(400, "Invalid input data");
                return [2 /*return*/, response.send(res)];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                if (error_3.message.split(" ").includes("duplicate")) {
                    response.setError(400, error_3.keyValue.name + " already exists");
                    return [2 /*return*/, response.send(res)];
                }
                response.setError(400, "Error creating playlist");
                return [2 /*return*/, response.send(res)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createPlaylist = createPlaylist;
var addToPlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var playlistId, _a, trackId_1, title, currentUser, playlist, duplicate, saved, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                playlistId = req.params.id;
                _a = req.body, trackId_1 = _a.id, title = _a.title;
                currentUser = req.user.id;
                return [4 /*yield*/, playlistModel_1.default.findOne({
                        _id: playlistId,
                        ownerId: currentUser,
                    }).exec()];
            case 1:
                playlist = _b.sent();
                if (!(playlist && playlist.tracks)) return [3 /*break*/, 3];
                duplicate = playlist.tracks.find(function (track) { return track.trackId === trackId_1; });
                if (duplicate) {
                    response.setError(400, "Track already exists");
                    return [2 /*return*/, response.send(res)];
                }
                playlist.tracks.push({ trackId: trackId_1, title: title });
                return [4 /*yield*/, playlist.save()];
            case 2:
                saved = _b.sent();
                if (saved) {
                    response.setSuccess(201, "Successful!", { payload: saved });
                    return [2 /*return*/, response.send(res)];
                }
                _b.label = 3;
            case 3:
                response.setError(400, "User can't carry out operation");
                return [2 /*return*/, response.send(res)];
            case 4:
                error_4 = _b.sent();
                response.setError(400, "Error adding song to playlist");
                return [2 /*return*/, response.send(res)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addToPlaylist = addToPlaylist;
var removeFromPlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var playlistId, trackId_2, currentUser, playlist, index, saved, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                playlistId = req.params.id;
                trackId_2 = req.body.id;
                currentUser = req.user.id;
                return [4 /*yield*/, playlistModel_1.default.findById({
                        _id: playlistId,
                        ownerId: currentUser,
                    }).exec()];
            case 1:
                playlist = _a.sent();
                if (!(playlist && playlist.tracks)) return [3 /*break*/, 3];
                index = playlist.tracks.findIndex(function (track) { return track.trackId === trackId_2; });
                if (index === -1) {
                    response.setError(404, "Track not found");
                    return [2 /*return*/, response.send(res)];
                }
                playlist.tracks.splice(index, 1);
                return [4 /*yield*/, playlist.save()];
            case 2:
                saved = _a.sent();
                if (saved) {
                    response.setSuccess(201, "Successfully removed!", { payload: saved });
                    return [2 /*return*/, response.send(res)];
                }
                _a.label = 3;
            case 3:
                response.setError(400, "User can't carry out operation");
                return [2 /*return*/, response.send(res)];
            case 4:
                error_5 = _a.sent();
                console.error(error_5);
                response.setError(400, "Error removing song from playlist");
                return [2 /*return*/, response.send(res)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.removeFromPlaylist = removeFromPlaylist;
var removePlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var playlistId, currentUser, deleted, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                playlistId = req.params.id;
                currentUser = req.user.id;
                return [4 /*yield*/, playlistModel_1.default.findOneAndRemove({
                        _id: playlistId,
                        ownerId: currentUser,
                    }).exec()];
            case 1:
                deleted = _a.sent();
                if (deleted) {
                    response.setSuccess(201, "Successfully removed!", { payload: {} });
                    return [2 /*return*/, response.send(res)];
                }
                response.setError(400, "User can't carry out operation");
                return [2 /*return*/, response.send(res)];
            case 2:
                error_6 = _a.sent();
                response.setError(400, "Error removing playlist");
                return [2 /*return*/, response.send(res)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.removePlaylist = removePlaylist;
var likePublicPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, toLike, addedLike, newData, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id = req.user.id;
                return [4 /*yield*/, playlistModel_1.default.findOne({
                        _id: req.params.id,
                        isPublic: true,
                        likes: { $in: [id] },
                    }).exec()];
            case 1:
                toLike = _a.sent();
                if (!!toLike) return [3 /*break*/, 3];
                return [4 /*yield*/, playlistModel_1.default.findOneAndUpdate({ _id: req.params.id, isPublic: true }, { $push: { likes: id } }, { new: true }).exec()];
            case 2:
                addedLike = _a.sent();
                if (addedLike) {
                    newData = {
                        data: addedLike,
                    };
                    response.setSuccess(200, "Successful", newData);
                    return [2 /*return*/, response.send(res)];
                }
                response.setError(400, "failed");
                return [2 /*return*/, response.send(res)];
            case 3:
                response.setError(400, "you can not like a playlist more than once");
                return [2 /*return*/, response.send(res)];
            case 4:
                err_1 = _a.sent();
                response.setError(400, "failed");
                return [2 /*return*/, response.send(res)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.likePublicPost = likePublicPost;
var mostPlayedPlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUser, mostPlayed, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                currentUser = req.user.id;
                if (!currentUser) {
                    response.setError(400, "Unauthorized access");
                    return [2 /*return*/, response.send(res)];
                }
                return [4 /*yield*/, playlistModel_1.default.find({ isPublic: true })
                        .sort({ listeningCount: -1 })
                        .lean()
                        .exec()];
            case 1:
                mostPlayed = _a.sent();
                response.setSuccess(200, "Successful", { payload: mostPlayed });
                return [2 /*return*/, response.send(res)];
            case 2:
                err_2 = _a.sent();
                console.error(err_2.message);
                response.setError(400, "Error occured during query");
                return [2 /*return*/, response.send(res)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.mostPlayedPlaylist = mostPlayedPlaylist;
var getLikedPlaylistsByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUser_1, playlists, userPlaylists, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                currentUser_1 = req.user.id;
                return [4 /*yield*/, playlistModel_1.default.find({ isPublic: true }).lean().exec()];
            case 1:
                playlists = _a.sent();
                if (playlists && playlists.length) {
                    userPlaylists = playlists.filter(function (playlist) {
                        return (playlist.likes &&
                            playlist.likes.some(function (like) { return like == currentUser_1; }));
                    });
                    if (userPlaylists.length) {
                        response.setSuccess(201, "Successfully!", { payload: userPlaylists });
                        return [2 /*return*/, response.send(res)];
                    }
                    response.setError(404, "User liked no playlist");
                    return [2 /*return*/, response.send(res)];
                }
                response.setError(404, "No public playlist");
                return [2 /*return*/, response.send(res)];
            case 2:
                err_3 = _a.sent();
                console.error(err_3.message);
                response.setError(400, "Error occured during query");
                return [2 /*return*/, response.send(res)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getLikedPlaylistsByUser = getLikedPlaylistsByUser;
