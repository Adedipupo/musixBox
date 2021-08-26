"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var artist_1 = require("../controllers/artist");
var auth_1 = __importDefault(require("../middleware/auth"));
var router = express_1.default.Router();
router.get("/likes", auth_1.default, artist_1.getLikedArtistsByUser);
router.get("/mostPlayed", auth_1.default, artist_1.mostPlayedArtist);
// route to get artist by id
router.get("/id/:id", auth_1.default, artist_1.addArtistById);
// route to increase like count and add id of users that like
router.put("/like/:id", auth_1.default, artist_1.likeArtist);
// route to increase listening count
router.put("/listened/:id", auth_1.default, artist_1.listeningCount);
exports.default = router;
