"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var search_1 = require("../controllers/search");
var auth_1 = __importDefault(require("../middleware/auth"));
var router = express_1.default.Router();
router.get("/", auth_1.default, search_1.searchQuery);
router.get("/:id", auth_1.default, search_1.searchPlaylist);
exports.default = router;
