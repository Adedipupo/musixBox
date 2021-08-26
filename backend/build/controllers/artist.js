"use strict";
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable eqeqeq */
// eslint-disable-next-line consistent-return
// eslint-disable-next-line no-console
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
exports.listeningCount = exports.likeArtist = exports.addArtistById = exports.mostPlayedArtist = exports.getLikedArtistsByUser = void 0;
var response_1 = __importDefault(require("../utils/response"));
var artistModel_1 = require("../models/artistModel");
var axios_1 = __importDefault(require("axios"));
var response = new response_1.default();
var getLikedArtistsByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUser_1, artists, userArtists, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                currentUser_1 = req.user.id;
                return [4 /*yield*/, artistModel_1.ArtistModel.find({}).lean().exec()];
            case 1:
                artists = _a.sent();
                if (artists && artists.length) {
                    userArtists = artists.filter(function (artist) {
                        return (artist.likes &&
                            artist.likes.some(function (like) { return like == currentUser_1; }));
                    });
                    if (userArtists.length) {
                        response.setSuccess(201, "Successfully!", { payload: userArtists });
                        return [2 /*return*/, response.send(res)];
                    }
                    response.setError(404, "User liked no album");
                    return [2 /*return*/, response.send(res)];
                }
                response.setError(404, "Artist is empty");
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
exports.getLikedArtistsByUser = getLikedArtistsByUser;
var mostPlayedArtist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
                return [4 /*yield*/, artistModel_1.ArtistModel.find({ isPublic: true })
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
exports.mostPlayedArtist = mostPlayedArtist;
var addArtistById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, getArtist_1, addArtist, getArtist, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                id = req.params.id;
                return [4 /*yield*/, artistModel_1.ArtistModel.findOne({ id: id })];
            case 1:
                result = _a.sent();
                if (!(result === null)) return [3 /*break*/, 4];
                return [4 /*yield*/, axios_1.default.get("https://api.deezer.com/artist/" + id)];
            case 2:
                getArtist_1 = _a.sent();
                return [4 /*yield*/, artistModel_1.ArtistModel.create(getArtist_1.data)];
            case 3:
                addArtist = _a.sent();
                response.setSuccess(201, "successful", addArtist);
                return [2 /*return*/, response.send(res)];
            case 4: return [4 /*yield*/, axios_1.default.get("https://api.deezer.com/artist/" + id)];
            case 5:
                getArtist = _a.sent();
                response.setSuccess(409, "Artist already in database", getArtist.data);
                return [2 /*return*/, response.send(res)];
            case 6:
                error_1 = _a.sent();
                response.setError(400, "Artist does not exist");
                return [2 /*return*/, response.send(res)];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.addArtistById = addArtistById;
var likeArtist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _id, artistProfile, updateArtistProfile_1, updateArtistProfile, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                id = req.params.id;
                _id = req.user._id;
                return [4 /*yield*/, artistModel_1.ArtistModel.findOne({ id: id })];
            case 1:
                artistProfile = _a.sent();
                if (!artistProfile.likedBy.includes(_id)) return [3 /*break*/, 3];
                return [4 /*yield*/, artistModel_1.ArtistModel.findOneAndUpdate({ id: id }, {
                        $pull: { likedBy: _id },
                        $inc: { likedCount: -1 },
                    }, { new: true }).exec()];
            case 2:
                updateArtistProfile_1 = _a.sent();
                response.setSuccess(201, "successful", updateArtistProfile_1);
                return [2 /*return*/, response.send(res)];
            case 3: return [4 /*yield*/, artistModel_1.ArtistModel.findOneAndUpdate({ id: id }, {
                    $push: { likedBy: _id },
                    $inc: { likedCount: 1 },
                }, { new: true }).exec()];
            case 4:
                updateArtistProfile = _a.sent();
                response.setSuccess(201, "successful", updateArtistProfile);
                return [2 /*return*/, response.send(res)];
            case 5:
                err_3 = _a.sent();
                response.setError(400, "Artist does not exist");
                return [2 /*return*/, response.send(res)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.likeArtist = likeArtist;
var listeningCount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updateListeningCount, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, artistModel_1.ArtistModel.findOneAndUpdate({ id: id }, { $inc: { listeningCount: 1 } }, { new: true }).exec()];
            case 1:
                updateListeningCount = _a.sent();
                response.setSuccess(201, "successful", updateListeningCount);
                return [2 /*return*/, response.send(res)];
            case 2:
                err_4 = _a.sent();
                response.setError(400, "Artist does not exist");
                return [2 /*return*/, response.send(res)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.listeningCount = listeningCount;
