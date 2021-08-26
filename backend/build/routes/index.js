"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var playlist_1 = __importDefault(require("./playlist"));
var users_1 = __importDefault(require("./users"));
var genre_1 = __importDefault(require("./genre"));
var album_1 = __importDefault(require("./album"));
var googleAuth_1 = __importDefault(require("./googleAuth"));
var fbAuth_1 = __importDefault(require("./fbAuth"));
var searchSong_1 = __importDefault(require("./searchSong"));
var history_1 = __importDefault(require("./history"));
var recentlyPlayed_1 = __importDefault(require("./recentlyPlayed"));
var artist_1 = __importDefault(require("./artist"));
var router = express_1.default.Router();
// controllers for playlist route
router.use("/playlist", playlist_1.default);
// controllers for album route
router.use("/album", album_1.default);
// controllers for artist route
router.use("/artist", artist_1.default);
router.get("/", function (req, res) {
    res.send("music-box server is live");
});
// controller for search router
router.use("/search", searchSong_1.default);
// controllers for users route
router.use("/users", users_1.default);
// controller for genre route
router.use("/genres", genre_1.default);
// controller for playlist
// controller for album
router.use("/album", album_1.default);
// google authentication route
// http://localhost:3000/api/v1/music-box-api/auth/google
router.use("/auth", googleAuth_1.default);
// facebook authentication route
// http://localhost:3000/api/v1/music-box-api/fb/facebook
router.use("/fb", fbAuth_1.default);
// controller for user route
router.use("/users", users_1.default);
// listening history route
router.use("/history", history_1.default);
// controller for recently played music
router.use("/recently-played", recentlyPlayed_1.default);
exports.default = router;
