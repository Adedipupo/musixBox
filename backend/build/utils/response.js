"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseStatus = /** @class */ (function () {
    function ResponseStatus() {
        this.statusCode = null;
        this.status = null;
        this.data = null;
        this.message = null;
    }
    ResponseStatus.prototype.setSuccess = function (statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.status = "successful";
    };
    ResponseStatus.prototype.setError = function (statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
        this.status = "error";
    };
    ResponseStatus.prototype.send = function (res) {
        var result = {
            status: this.status,
            message: this.message,
            data: this.data,
        };
        if (this.status === "successful") {
            return res.status(this.statusCode ? this.statusCode : 200).json(result);
        }
        return res.status(this.statusCode ? this.statusCode : 500).json({
            status: this.status,
            message: this.message,
            data: [],
        });
    };
    return ResponseStatus;
}());
exports.default = ResponseStatus;
