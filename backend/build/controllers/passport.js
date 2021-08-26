"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fbAuthController = exports.googleAuthController = exports.facebookStrategy = exports.googleStrategy = void 0;
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
var passport_google_oauth20_1 = require("passport-google-oauth20");
var passport_facebook_1 = require("passport-facebook");
var passport_1 = __importDefault(require("passport"));
var userModel_1 = require("../models/userModel");
var auth_1 = require("../utils/auth");
var response_1 = __importDefault(require("../utils/response"));
var responseStatus = new response_1.default();
var googleStrategy = function (passport) {
    passport.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/v1/music-box-api/auth/google/success",
    }, function (accessToken, refreshToken, profile, done) {
        // console.log(profile);
        return done(null, profile);
    }));
};
exports.googleStrategy = googleStrategy;
var facebookStrategy = function (passport) {
    passport.use(new passport_facebook_1.Strategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/api/v1/music-box-api/fb/facebook/success",
        profileFields: ["id", "displayName", "photos", "email"],
    }, function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }));
};
exports.facebookStrategy = facebookStrategy;
var googleAuthController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, firstName, lastName, user, newUser, token_1, data_1, token, data, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // if user is not authenticated
                if (!req.session.passport) {
                    responseStatus.setError(400, "bad request");
                    return [2 /*return*/, responseStatus.send(res)];
                }
                email = req.session.passport.user.emails[0].value;
                firstName = req.session.passport.user.name.givenName;
                lastName = req.session.passport.user.name.familyName;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, userModel_1.UserModel.findOne({ email: email })];
            case 2:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 4];
                return [4 /*yield*/, userModel_1.UserModel.create({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        provider: "google",
                    })];
            case 3:
                newUser = _a.sent();
                token_1 = auth_1.generateToken(newUser._id);
                data_1 = {
                    token: token_1,
                    user: newUser,
                };
                responseStatus.setSuccess(201, "successful", data_1);
                return [2 /*return*/, responseStatus.send(res)];
            case 4:
                // if provider is not google,
                if (user.provider === "facebook") {
                    responseStatus.setError(400, "you already have an account with facebook, please login with facebook");
                    return [2 /*return*/, responseStatus.send(res)];
                }
                // if provider is not facebook,
                if (user.provider === "local") {
                    responseStatus.setError(400, "login with your email and password");
                    return [2 /*return*/, responseStatus.send(res)];
                }
                token = auth_1.generateToken(user._id);
                data = {
                    token: token,
                    user: user,
                };
                responseStatus.setSuccess(201, "successful", data);
                return [2 /*return*/, responseStatus.send(res)];
            case 5:
                e_1 = _a.sent();
                responseStatus.setError(500, "an error occurred");
                return [2 /*return*/, responseStatus.send(res)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.googleAuthController = googleAuthController;
passport_1.default.serializeUser(function (profile, done) {
    done(null, profile);
});
// used to deserialize the user
passport_1.default.deserializeUser(function (profile, done) {
    return done(null, profile);
});
var fbAuthController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, firstName, lastName, user, newUser, token_2, data_2, token, data, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // if user is not authenticated
                if (!req.session.passport) {
                    responseStatus.setError(400, "bad request");
                    return [2 /*return*/, responseStatus.send(res)];
                }
                email = req.session.passport.user.emails[0].value;
                firstName = req.session.passport.user.displayName.split(" ")[0];
                lastName = req.session.passport.user.displayName.split(" ")[1];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, userModel_1.UserModel.findOne({ email: email })];
            case 2:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 4];
                return [4 /*yield*/, userModel_1.UserModel.create({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        provider: "facebook",
                    })];
            case 3:
                newUser = _a.sent();
                token_2 = auth_1.generateToken(newUser._id);
                data_2 = {
                    token: token_2,
                    user: newUser,
                };
                responseStatus.setSuccess(201, "successful", data_2);
                return [2 /*return*/, responseStatus.send(res)];
            case 4:
                if (user.provider === "google") {
                    responseStatus.setError(400, "you already have an account with google, please login with google");
                    return [2 /*return*/, responseStatus.send(res)];
                }
                token = auth_1.generateToken(user._id);
                data = {
                    token: token,
                    user: user,
                };
                responseStatus.setSuccess(201, "successful", data);
                return [2 /*return*/, responseStatus.send(res)];
            case 5:
                e_2 = _a.sent();
                responseStatus.setError(500, "an error occurred");
                return [2 /*return*/, responseStatus.send(res)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.fbAuthController = fbAuthController;
