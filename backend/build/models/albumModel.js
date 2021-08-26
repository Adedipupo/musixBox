"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumModel = void 0;
var mongoose_1 = require("mongoose");
var trackSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    preview: {
        type: String,
    },
    md5_image: {
        type: String,
    },
    duration: {
        type: String,
    },
    artist: {
        id: String,
        name: String,
    },
});
var contributorSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
});
var albumSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    cover_small: {
        type: String,
        required: true,
    },
    cover_medium: {
        type: String,
        required: true,
    },
    cover_big: {
        type: String,
        required: true,
    },
    cover_xl: {
        type: String,
        required: true,
    },
    genre_id: {
        type: Number,
        required: true,
    },
    artist: {
        id: String,
        name: String,
    },
    duration: {
        type: Number,
    },
    nb_tracks: {
        type: Number,
    },
    tracks: { type: [trackSchema] },
    contributors: { type: [contributorSchema] },
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    ],
    listened: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    ],
    likeCount: {
        type: Number,
        default: 0,
    },
    listeningCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
albumSchema.virtual("Recently_played", {
    ref: "Recent_play",
    localField: "_id",
    foreignField: "directory_info",
    justOne: false,
    match: { isActive: false },
});
exports.AlbumModel = mongoose_1.model("Album", albumSchema);
