"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var album_1 = require("../controllers/album");
var auth_1 = __importDefault(require("../middleware/auth"));
var router = express_1.default.Router();
router.get("/likes", auth_1.default, album_1.getLikedAlbumsByUser);
router.get("/mostplayed", auth_1.default, album_1.mostPlayedAlbum);
router.get("/", auth_1.default, album_1.searchAlbum);
router.put("/likes/:id", auth_1.default, album_1.likedAlbum);
router.put("/listened/:id", auth_1.default, album_1.listenedAlbumCount);
exports.default = router;
