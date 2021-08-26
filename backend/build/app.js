"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var path_1 = __importDefault(require("path"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
var index_1 = __importDefault(require("./routes/index"));
var cors_1 = __importDefault(require("cors"));
var mongoConnect_1 = __importDefault(require("./database/mongoConnect"));
var passport_1 = __importDefault(require("passport"));
var mongoMemoryConnect_1 = require("./database/mongoMemoryConnect");
var passport_2 = require("./controllers/passport");
var express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config();
//= ======== DB Connect ===========
if (process.env.NODE_ENV === "test") {
    mongoMemoryConnect_1.dbConnect();
}
else {
    mongoConnect_1.default();
}
//= ========= Express Config ===============
var app = express_1.default();
// Static-Asset Rendering
app.use(express_1.default.static(path_1.default.join(__dirname, "../", "public")));
app.use(cors_1.default());
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
//= = Root Route ==============
app.use("/api/v1/music-box-api", index_1.default);
// passport middleware
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_session_1.default({
    secret: "akfc76q3gbd83bqdh",
    resave: false,
    saveUninitialized: true,
}));
// middleware for social login
passport_2.googleStrategy(passport_1.default);
passport_2.facebookStrategy(passport_1.default);
// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
app.get("/", function (_req, res) {
    res.redirect("/api/v1/music-box-api");
});
exports.default = app;
