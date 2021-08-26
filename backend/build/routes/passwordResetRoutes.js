"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passwordResetController_1 = require("../controllers/passwordResetController");
var router = express_1.Router();
router.post("/requestPasswordReset", passwordResetController_1.requestPasswordResetController);
router.put("/resetPassword", passwordResetController_1.resetPasswordController);
exports.default = router;
