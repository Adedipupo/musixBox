"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var trackSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    album: { type: String, required: true },
    duration: { type: String, required: true },
    link: { type: String, required: true },
    timestamp: { type: Date, default: Date.now() },
});
var historySchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, required: true, unique: true },
    history: [trackSchema],
});
var historyModel = mongoose_1.model("History", historySchema);
exports.default = historyModel;
