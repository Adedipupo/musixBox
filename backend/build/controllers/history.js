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
exports.removeSongFromHistory = exports.addSongToHistory = exports.getListeningHistory = void 0;
var history_service_1 = require("../services/history.service");
var historyModel_1 = __importDefault(require("../models/historyModel"));
var userModel_1 = require("../models/userModel");
var response_1 = __importDefault(require("../utils/response"));
var lodash_1 = __importDefault(require("lodash"));
var response = new response_1.default();
var getListeningHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, data, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_id = req.user.id;
                return [4 /*yield*/, historyModel_1.default.findOne({ user_id: user_id })];
            case 1:
                data = _a.sent();
                if (data) {
                    response.setSuccess(200, "successful", lodash_1.default.pick(data, ["_id", "history"]));
                }
                else
                    response.setError(404, "No listening history found");
                return [2 /*return*/, response.send(res)];
            case 2:
                e_1 = _a.sent();
                response.setError(404, "Error fetching history");
                return [2 /*return*/, response.send(res)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getListeningHistory = getListeningHistory;
var addSongToHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, songId_1, userExists, trackDetails, history_1, song_data, resp, existingTrack, _a, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 11, , 12]);
                user_id = req.user.id;
                songId_1 = req.params.id;
                return [4 /*yield*/, userModel_1.UserModel.findOne({ _id: user_id })];
            case 1:
                userExists = _b.sent();
                if (!userExists) {
                    response.setError(404, "user with this id doesn't exist");
                    return [2 /*return*/, response.send(res)];
                }
                return [4 /*yield*/, history_service_1.fetchTrack(songId_1)];
            case 2:
                trackDetails = _b.sent();
                return [4 /*yield*/, historyModel_1.default.findOne({ user_id: user_id })];
            case 3:
                history_1 = _b.sent();
                if (!trackDetails) return [3 /*break*/, 10];
                song_data = __assign(__assign({}, trackDetails), { id: songId_1, timestamp: Date.now() });
                if (!!history_1) return [3 /*break*/, 5];
                return [4 /*yield*/, historyModel_1.default.create({
                        user_id: user_id,
                        history: [song_data],
                    })];
            case 4:
                resp = _b.sent();
                response.setSuccess(201, "Listening history created", lodash_1.default.pick(resp, ["_id", "history"]));
                return [2 /*return*/, response.send(res)];
            case 5:
                existingTrack = history_1.history.find(function (track) { return +track.id === +songId_1; });
                if (!existingTrack) return [3 /*break*/, 7];
                return [4 /*yield*/, historyModel_1.default.findOneAndUpdate({ user_id: user_id }, {
                        $pull: { history: { $in: [existingTrack] } },
                    })];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7: 
            // track is added at position 0 of the history array
            return [4 /*yield*/, historyModel_1.default.findOneAndUpdate({ user_id: user_id }, {
                    $push: {
                        history: {
                            $each: [song_data],
                            $position: 0,
                        },
                    },
                })];
            case 8:
                // track is added at position 0 of the history array
                _b.sent();
                return [4 /*yield*/, historyModel_1.default.findOne({ user_id: user_id })];
            case 9:
                history_1 = _b.sent();
                response.setSuccess(200, "History updated successfully", lodash_1.default.pick(history_1, ["_id", "history"]));
                return [2 /*return*/, response.send(res)];
            case 10:
                response.setError(400, "Track not found");
                return [2 /*return*/, response.send(res)];
            case 11:
                _a = _b.sent();
                message = _a.message;
                response.setError(400, message);
                return [2 /*return*/, response.send(res)];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.addSongToHistory = addSongToHistory;
var removeSongFromHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, songId_2, history_2, existingTrack, _a, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                user_id = req.user.id;
                songId_2 = req.params.id;
                return [4 /*yield*/, historyModel_1.default.findOne({ user_id: user_id })];
            case 1:
                history_2 = _b.sent();
                // Return an error if the history document doesn't exist or the history array is empty
                if (!history_2 || history_2.history.length === 0) {
                    response.setError(400, "Listening history empty");
                    return [2 /*return*/, response.send(res)];
                }
                existingTrack = history_2.history.find(function (track) { return +track.id === +songId_2; });
                if (!existingTrack) return [3 /*break*/, 4];
                return [4 /*yield*/, historyModel_1.default.findOneAndUpdate({ user_id: user_id }, {
                        $pull: { history: { $in: [existingTrack] } },
                    })];
            case 2:
                _b.sent();
                return [4 /*yield*/, historyModel_1.default.findOne({ user_id: user_id })];
            case 3:
                history_2 = _b.sent();
                response.setSuccess(200, "Track successfully removed from history", lodash_1.default.pick(history_2, ["_id", "history"]));
                return [2 /*return*/, response.send(res)];
            case 4:
                response.setError(400, "track not found in history");
                return [2 /*return*/, response.send(res)];
            case 5:
                _a = _b.sent();
                message = _a.message;
                response.setError(400, message);
                return [2 /*return*/, response.send(res)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.removeSongFromHistory = removeSongFromHistory;
