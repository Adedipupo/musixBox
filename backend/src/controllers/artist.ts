/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable eqeqeq */
// eslint-disable-next-line consistent-return
// eslint-disable-next-line no-console

import { Request, Response } from "express";
import ResponseClass from "../utils/response";
import { ArtistModel } from "../models/artistModel";
import axios from "axios";

const response = new ResponseClass();

export const getLikedArtistsByUser = async (req: Request, res: Response) => {
  try {
    const { id: currentUser } = req.user as Record<string, any>;
    const artists = await ArtistModel.find({}).lean().exec();

    if (artists && artists.length) {
      const userArtists = artists.filter((artist: any) => {
        return (
          artist.likes &&
          artist.likes.some((like: string) => like == currentUser)
        );
      });

      if (userArtists.length) {
        response.setSuccess(201, "Successfully!", { payload: userArtists });
        return response.send(res);
      }

      response.setError(404, "User liked no album");
      return response.send(res);
    }

    response.setError(404, "Artist is empty");
    return response.send(res);
  } catch (err) {
    console.error(err.message);
    response.setError(400, "Error occured during query");
    return response.send(res);
  }
};

export const mostPlayedArtist = async (req: Request, res: Response) => {
  try {
    const { id: currentUser } = req.user as Record<string, any>;

    if (!currentUser) {
      response.setError(400, "Unauthorized access");
      return response.send(res);
    }

    const mostPlayed = await ArtistModel.find({ isPublic: true })
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

export const addArtistById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const result = await ArtistModel.findOne({ id });
    if (result === null) {
      const getArtist = await axios.get(`https://api.deezer.com/artist/${id}`);
      const addArtist = await ArtistModel.create(getArtist.data);
      response.setSuccess(201, "successful", addArtist);
      return response.send(res);
    }
    const getArtist = await axios.get(`https://api.deezer.com/artist/${id}`);
    response.setError(
      409,
      `Artist with the id of ${getArtist.data.id} is already in the database`
    );
    return response.send(res);
  } catch (error) {
    response.setError(400, "Artist does not exist");
    return response.send(res);
  }
};

export const likeArtist = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { _id } = req.user as Record<string, any>;
    const artistProfile = await ArtistModel.findOne({ id });
    if (artistProfile.likedBy.includes(_id)) {
      const updateArtistProfile = await ArtistModel.findOneAndUpdate(
        { id },
        {
          $pull: { likedBy: _id },
          $inc: { likedCount: -1 },
        },
        { new: true }
      ).exec();
      response.setSuccess(201, "successful", updateArtistProfile);
      return response.send(res);
    }
    const updateArtistProfile = await ArtistModel.findOneAndUpdate(
      { id },
      {
        $push: { likedBy: _id },
        $inc: { likedCount: 1 },
      },
      { new: true }
    ).exec();
    response.setSuccess(201, "successful", updateArtistProfile);
    return response.send(res);
  } catch (err) {
    response.setError(400, "Artist does not exist");
    return response.send(res);
  }
};

export const listeningCount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const updateListeningCount = await ArtistModel.findOneAndUpdate(
      { id },
      { $inc: { listeningCount: 1 } },
      { new: true }
    ).exec();
    response.setSuccess(201, "successful", updateListeningCount);
    return response.send(res);
  } catch (err) {
    response.setError(400, "Artist does not exist");
    return response.send(res);
  }
};
