"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreModel = void 0;
var mongoose_1 = require("mongoose");
var genreSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    picture_small: {
        type: String,
        required: true,
    },
    picture_medium: {
        type: String,
        required: true,
    },
    picture_big: {
        type: String,
        required: true,
    },
    picture_xl: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
// create relationship between genre and playlist
genreSchema.virtual("playlist", {
    ref: "Playlist",
    localField: "_id",
    foreignField: "ownerId",
});
exports.genreModel = mongoose_1.model("Genre", genreSchema);
