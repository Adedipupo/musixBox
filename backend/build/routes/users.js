"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passwordResetRoutes_1 = __importDefault(require("./passwordResetRoutes"));
var userAuth_1 = require("../controllers/userAuth");
var auth_1 = __importDefault(require("../middleware/auth"));
var users_1 = require("../controllers/users");
var updateProfile_1 = require("../controllers/updateProfile");
var viewProfile_1 = require("../controllers/viewProfile");
var router = express_1.default.Router();
// route for users
router.get("/", function (req, res) {
    res.send("users route");
});
router.use("/", passwordResetRoutes_1.default);
// controller route to change user password
router.put("/change-password/:id", auth_1.default, users_1.changePassword);
router.get("/profile/:id", auth_1.default, viewProfile_1.viewProfile);
router.put("/profile/:id", auth_1.default, updateProfile_1.updateProfile);
router.post("/register", userAuth_1.registerUser);
router.post("/login", userAuth_1.loginUser);
exports.default = router;
