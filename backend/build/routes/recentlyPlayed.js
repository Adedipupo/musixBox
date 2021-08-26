"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var recentlyPlayed_1 = require("../controllers/recentlyPlayed");
var auth_1 = __importDefault(require("../middleware/auth"));
var router = express_1.default.Router();
// route to save recently played, expecting a query params of directory and a params of id
// /api/v1/music-box-api/recently-played/{{id}}?directory=playlist
router.post("/", auth_1.default, recentlyPlayed_1.saveRecentlyPlayed);
router.get("/", auth_1.default, recentlyPlayed_1.getRecentlySaved);
exports.default = router;
