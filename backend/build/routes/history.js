"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var history_1 = require("../controllers/history");
var auth_1 = __importDefault(require("../middleware/auth"));
var router = express_1.Router();
// Get a user's listening history
router.get("/getHistory", auth_1.default, history_1.getListeningHistory);
// Add song to or update user's listening history
router.put("/updateHistory/:id", auth_1.default, history_1.addSongToHistory);
// Remove a song from listening history
router.delete("/removeHistory/:id", auth_1.default, history_1.removeSongFromHistory);
exports.default = router;
