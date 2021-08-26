"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var passport_2 = require("../controllers/passport");
var router = express_1.default.Router();
router.get("/facebook", passport_1.default.authenticate("facebook", { scope: "email" }));
router.get("/facebook/success", passport_1.default.authenticate("facebook", {
    successRedirect: "/api/v1/music-box-api/fb/profile",
    failureRedirect: "/api/v1/music-box-api/fb/fail",
}));
router.get("/profile", passport_2.fbAuthController);
router.get("/fail", function (req, res) {
    res.status(401).json({
        status: "failed",
        message: "you are not authorized ",
    });
});
exports.default = router;
