"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var playlist_1 = require("../controllers/playlist");
var auth_1 = __importDefault(require("../middleware/auth"));
var router = express_1.default.Router();
router
    .route("/")
    .get(auth_1.default, playlist_1.getPublicPlaylists)
    .post(auth_1.default, playlist_1.createPlaylist);
router
    .route("/:id")
    .get(auth_1.default, playlist_1.getPlaylist)
    .put(auth_1.default, playlist_1.addToPlaylist)
    .delete(auth_1.default, playlist_1.removeFromPlaylist);
router.get("/mostPlayed", playlist_1.mostPlayedPlaylist);
router.get("/likes", playlist_1.getLikedPlaylistsByUser);
router.put("/likes/:id", auth_1.default, playlist_1.likePublicPost);
router.delete("/delete/:id", auth_1.default, playlist_1.removePlaylist);
exports.default = router;
