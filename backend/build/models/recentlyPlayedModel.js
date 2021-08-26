"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentlyPlayedModel = void 0;
var mongoose_1 = require("mongoose");
var RecentlyPlayedSchema = new mongoose_1.Schema({
    player_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    directory_info: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel",
    },
    onModel: {
        type: String,
        required: true,
        enum: ["Playlist", "Artist", "Album"],
    },
    directory_type: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.RecentlyPlayedModel = mongoose_1.model("Recent_play", RecentlyPlayedSchema);
