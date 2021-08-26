"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserPassword = void 0;
var joi_1 = __importDefault(require("joi"));
// validation for change password
var validateUserPassword = function (data) {
    var schema = joi_1.default.object({
        password: joi_1.default.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required()
            .error(function () { return new Error("invalid password format"); }),
    });
    return schema.validate(data);
};
exports.validateUserPassword = validateUserPassword;
