"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var passport_2 = require("../controllers/passport");
var router = express_1.default.Router();
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/success", passport_1.default.authenticate("google", {
    successRedirect: "/api/v1/music-box-api/auth/profile",
    failureRedirect: "/api/v1/music-box-api/auth/fail",
}));
router.get("/profile", passport_2.googleAuthController);
router.get("/fail", function (req, res) {
    res.status(401).json({
        status: "failed",
        message: "you are not authorized ",
    });
});
exports.default = router;
