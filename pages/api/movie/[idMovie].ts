import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import initializeDatabase from "../../../core/utils/database";
import { MoviesService } from "../../../core/services/movies";

/**
 * @swagger
 * /api/movie/{idMovie}:
 *   get:
 *     tags:
 *       - Movie
 *     description: Endpoint which returns movie data
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID movie
 *     responses:
 *       200:
 *         description: Success Response
 *       404:
 *         description: Movie not found
 *   put:
 *     tags:
 *       - Movie
 *     description: Update movie data
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID movie
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plot
 *               - genres
 *               - title
 *             properties:
 *               plot:
 *                 type: string
 *                 description: user identity
 *                 required: true
 *               genres:
 *                 type: array
 *                 items:
 *                   required: true
 *                   type: string
 *               title:
 *                 type: string
 *                 required: true
 *               languages:
 *                 type: array
 *                 items:
 *                   required: true
 *                   type: string
 *               released:
 *                 type: string
 *                 required: true
 *               directors:
 *                 type: array
 *                 items:
 *                   required: true
 *                   type: string
 *     responses:
 *       200:
 *         description: Success Response
 *   delete:
 *     tags:
 *       - Movie
 *     description: Delete movie data
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID movie
 *     responses:
 *       200:
 *         description: Movie deleted
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { idMovie } = req.query;

  const moviesService = new MoviesService();

  switch (req.method) {
    case "GET":
      const movie = await moviesService.getMovieById(idMovie as string);

      if (!movie) {
        return res
          .status(404)
          .json({ status: 404, message: "Movie not found" });
      }

      res.status(200).json({ status: 200, data: movie });
      break;
    case "PUT":
      const { plot, genres, title, languages, released, directors } = req.body;

      const movieUpdated = await moviesService.updateMovie(
        idMovie as string,
        plot,
        genres,
        title,
        languages,
        released,
        directors
      );

      res.status(200).json({ status: 200, data: movieUpdated });
      break;
    case "DELETE":
      await moviesService.deleteMovie(idMovie as string);
      res.status(204).json({ status: 204, message: "Movie deleted" });
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
