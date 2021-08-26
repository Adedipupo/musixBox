"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var genre_1 = require("../controllers/genre");
var router = express_1.default.Router();
// route to get all genres
router.get("/", genre_1.getGenres);
// route to get a genre by the deezer id
router.get("/:id", genre_1.getOneGenre);
// get playlist associated to a particular genre
router.get("/playlist/:id", genre_1.getPlaylistByGenre);
// get playlist associated to a particular genre
router.get("/artist/:id", genre_1.getArtistsByGenre);
exports.default = router;
