/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
import { Request, Response } from "express";
import { AlbumModel } from "../models/albumModel";
import ResponseClass from "../utils/response";
import axios from "axios";

const response = new ResponseClass();

export const getLikedAlbumsByUser = async (req: Request, res: Response) => {
  try {
    const { id: currentUser } = req.user as Record<string, any>;
    const albums = await AlbumModel.find({}).lean().exec();

    if (albums && albums.length) {
      const userAlbums = albums.filter((album: any) => {
        return (
          album.likes && album.likes.some((like: string) => like == currentUser)
        );
      });

      if (userAlbums.length) {
        response.setSuccess(201, "Successfully!", { payload: userAlbums });
        return response.send(res);
      }

      response.setError(404, "User liked no album");
      return response.send(res);
    }

    response.setError(404, "Album is empty");
    return response.send(res);
  } catch (err) {
    console.error(err.message);
    response.setError(400, "Error occured during query");
    return response.send(res);
  }
};

export const searchAlbum = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const albumId = req.query.album;

    const result = await AlbumModel.findOne({ id: albumId });
    if (!result) {
      const album = await axios(`https://api.deezer.com/album/${albumId}`);
      const albumDetails = album.data;
      const {
        id,
        title,
        link,
        cover,
        cover_small,
        cover_medium,
        cover_big,
        cover_xl,
        artist,
        genre_id,
        contributors,
        duration,
        nb_tracks,
      } = albumDetails;
      const tracks = albumDetails.tracks.data;
      const data = {
        id,
        title,
        link,
        cover,
        cover_small,
        cover_medium,
        cover_big,
        cover_xl,
        genre_id,
        contributors,
        artist,
        tracks,
        duration,
      };

      const savedAlbum = new AlbumModel({
        id,
        title,
        cover,
        cover_small,
        cover_medium,
        cover_big,
        cover_xl,
        genre_id,
        contributors,
        duration,
        artist,
        tracks,
        nb_tracks,
      });
      const albumData = await savedAlbum.save();
      response.setSuccess(200, "Successful", albumData);
      return response.send(res);
    }
    response.setSuccess(200, "Successful", result);
    return response.send(res);
  } catch (error) {
    response.setError(400, "failed, Can not find result");
    return response.send(res);
  }
};

export const mostPlayedAlbum = async (req: Request, res: Response) => {
  try {
    const { id: currentUser } = req.user as Record<string, any>;

    if (!currentUser) {
      response.setError(400, "Unauthorized access");
      return response.send(res);
    }

    const mostPlayed = await AlbumModel.find({ isPublic: true })
      .sort({ listeningCount: -1 })
      .lean()
      .exec();

    response.setSuccess(200, "Successful", { payload: mostPlayed });
    return response.send(res);
  } catch (err) {
    console.error(err.message);
    response.setError(400, "Error occured during query");
    return response.send(res);
  }
};

export const likedAlbum = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.user as Record<string, any>;
    const toLike = await AlbumModel.findOne({
      _id: req.params.id,
      likes: { $in: id },
    }).exec();

    if (!toLike) {
      const addedLike = await AlbumModel.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { likes: id } },
        { new: true }
      ).exec();
      addedLike.likeCount = addedLike.likes.length;
      await addedLike.save();
      response.setSuccess(200, "Successful", addedLike);
      return response.send(res);
    }

    const removedLike = await AlbumModel.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { likes: id } },
      { new: true }
    ).exec();

    removedLike.likeCount = removedLike.likes.length;
    await removedLike.save();

    response.setSuccess(200, "Successful", removedLike);
    return response.send(res);
  } catch (err) {
    response.setError(400, "failed to like an album");
    return response.send(res);
  }
};

export const listenedAlbumCount = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const count = 1;
    const album = await AlbumModel.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { listeningCount: count } },
      {
        new: true,
      }
    );
    response.setSuccess(200, "Successful", album);
    return response.send(res);
  } catch (error) {
    response.setError(400, "failed to count listeningCount");
    return response.send(res);
  }
};
