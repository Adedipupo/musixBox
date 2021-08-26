"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistModel = void 0;
var mongoose_1 = require("mongoose");
var artistSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    share: {
        type: String,
    },
    likedBy: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
    likedCount: {
        type: Number,
        default: 0,
        required: true,
    },
    listeningCount: {
        type: Number,
        default: 0,
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
    nb_album: {
        type: Number,
    },
    nb_fan: {
        type: Number,
    },
    radio: {
        type: Boolean,
    },
    tracklist: {
        type: String,
    },
    type: {
        type: String,
        required: true,
    },
}, { timestamps: true });
artistSchema.virtual("Recently_played", {
    ref: "Recent_play",
    localField: "_id",
    foreignField: "artist",
    justOne: false,
    match: { isActive: false },
});
exports.ArtistModel = mongoose_1.model("Artist", artistSchema);
