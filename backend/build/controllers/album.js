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
exports.listenedAlbumCount = exports.likedAlbum = exports.mostPlayedAlbum = exports.searchAlbum = exports.getLikedAlbumsByUser = void 0;
var albumModel_1 = require("../models/albumModel");
var response_1 = __importDefault(require("../utils/response"));
var axios_1 = __importDefault(require("axios"));
var response = new response_1.default();
var getLikedAlbumsByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUser_1, albums, userAlbums, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                currentUser_1 = req.user.id;
                return [4 /*yield*/, albumModel_1.AlbumModel.find({}).lean().exec()];
            case 1:
                albums = _a.sent();
                if (albums && albums.length) {
                    userAlbums = albums.filter(function (album) {
                        return (album.likes && album.likes.some(function (like) { return like == currentUser_1; }));
                    });
                    if (userAlbums.length) {
                        response.setSuccess(201, "Successfully!", { payload: userAlbums });
                        return [2 /*return*/, response.send(res)];
                    }
                    response.setError(404, "User liked no album");
                    return [2 /*return*/, response.send(res)];
                }
                response.setError(404, "Album is empty");
                return [2 /*return*/, response.send(res)];
            case 2:
                err_1 = _a.sent();
                console.error(err_1.message);
                response.setError(400, "Error occured during query");
                return [2 /*return*/, response.send(res)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getLikedAlbumsByUser = getLikedAlbumsByUser;
var searchAlbum = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var albumId, result, album, albumDetails, id, title, link, cover, cover_small, cover_medium, cover_big, cover_xl, artist, genre_id, contributors, duration, nb_tracks, tracks, data, savedAlbum, albumData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                albumId = req.query.album;
                return [4 /*yield*/, albumModel_1.AlbumModel.findOne({ id: albumId })];
            case 1:
                result = _a.sent();
                if (!!result) return [3 /*break*/, 4];
                return [4 /*yield*/, axios_1.default("https://api.deezer.com/album/" + albumId)];
            case 2:
                album = _a.sent();
                albumDetails = album.data;
                id = albumDetails.id, title = albumDetails.title, link = albumDetails.link, cover = albumDetails.cover, cover_small = albumDetails.cover_small, cover_medium = albumDetails.cover_medium, cover_big = albumDetails.cover_big, cover_xl = albumDetails.cover_xl, artist = albumDetails.artist, genre_id = albumDetails.genre_id, contributors = albumDetails.contributors, duration = albumDetails.duration, nb_tracks = albumDetails.nb_tracks;
                tracks = albumDetails.tracks.data;
                data = {
                    id: id,
                    title: title,
                    link: link,
                    cover: cover,
                    cover_small: cover_small,
                    cover_medium: cover_medium,
                    cover_big: cover_big,
                    cover_xl: cover_xl,
                    genre_id: genre_id,
                    contributors: contributors,
                    artist: artist,
                    tracks: tracks,
                    duration: duration,
                };
                savedAlbum = new albumModel_1.AlbumModel({
                    id: id,
                    title: title,
                    cover: cover,
                    cover_small: cover_small,
                    cover_medium: cover_medium,
                    cover_big: cover_big,
                    cover_xl: cover_xl,
                    genre_id: genre_id,
                    contributors: contributors,
                    duration: duration,
                    artist: artist,
                    tracks: tracks,
                    nb_tracks: nb_tracks,
                });
                return [4 /*yield*/, savedAlbum.save()];
            case 3:
                albumData = _a.sent();
                response.setSuccess(200, "Successful", albumData);
                return [2 /*return*/, response.send(res)];
            case 4:
                response.setSuccess(200, "Successful", result);
                return [2 /*return*/, response.send(res)];
            case 5:
                error_1 = _a.sent();
                response.setError(400, "failed, Can not find result");
                return [2 /*return*/, response.send(res)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.searchAlbum = searchAlbum;
var mostPlayedAlbum = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
                return [4 /*yield*/, albumModel_1.AlbumModel.find({ isPublic: true })
                        .sort({ listeningCount: -1 })
                        .limit(5)
                        .lean()
                        .exec()];
            case 1:
                mostPlayed = _a.sent();
                return [2 /*return*/, mostPlayed];
            case 2:
                err_2 = _a.sent();
                console.error(err_2.message);
                response.setError(400, "Error occured during query");
                return [2 /*return*/, response.send(res)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.mostPlayedAlbum = mostPlayedAlbum;
var likedAlbum = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, toLike, addedLike, removedLike, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                id = req.user.id;
                return [4 /*yield*/, albumModel_1.AlbumModel.findOne({
                        _id: req.params.id,
                        likes: { $in: id },
                    }).exec()];
            case 1:
                toLike = _a.sent();
                if (!!toLike) return [3 /*break*/, 4];
                return [4 /*yield*/, albumModel_1.AlbumModel.findOneAndUpdate({ _id: req.params.id }, { $push: { likes: id } }, { new: true }).exec()];
            case 2:
                addedLike = _a.sent();
                addedLike.likeCount = addedLike.likes.length;
                return [4 /*yield*/, addedLike.save()];
            case 3:
                _a.sent();
                response.setSuccess(200, "Successful", addedLike);
                return [2 /*return*/, response.send(res)];
            case 4: return [4 /*yield*/, albumModel_1.AlbumModel.findOneAndUpdate({ _id: req.params.id }, { $pull: { likes: id } }, { new: true }).exec()];
            case 5:
                removedLike = _a.sent();
                removedLike.likeCount = removedLike.likes.length;
                return [4 /*yield*/, removedLike.save()];
            case 6:
                _a.sent();
                response.setSuccess(200, "Successful", removedLike);
                return [2 /*return*/, response.send(res)];
            case 7:
                err_3 = _a.sent();
                response.setError(400, "failed to like an album");
                return [2 /*return*/, response.send(res)];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.likedAlbum = likedAlbum;
var listenedAlbumCount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var count, album, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                count = 1;
                return [4 /*yield*/, albumModel_1.AlbumModel.findOneAndUpdate({ _id: req.params.id }, { $inc: { listeningCount: count } }, {
                        new: true,
                    })];
            case 1:
                album = _a.sent();
                response.setSuccess(200, "Successful", album);
                return [2 /*return*/, response.send(res)];
            case 2:
                error_2 = _a.sent();
                response.setError(400, "failed to count listeningCount");
                return [2 /*return*/, response.send(res)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.listenedAlbumCount = listenedAlbumCount;
