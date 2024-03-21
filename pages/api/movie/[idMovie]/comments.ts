import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import initializeDatabase from "../../../../core/utils/database";
import { CommentsServices } from "../../../../core/services/comments";
import { MoviesService } from "../../../../core/services/movies";

/**
 * @swagger
 * /api/movie/{idMovie}/comments:
 *   get:
 *     tags:
 *       - Comments
 *     description: Get comments from movie
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *     responses:
 *       200:
 *         description: Success Response
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Error Response
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { idMovie } = req.query;

  const moviesService = new MoviesService();
  const commentsServices = new CommentsServices();

  if (req.method === "GET") {
    try {
      const movie = await moviesService.getMovieById(idMovie as string);

      if (!movie) {
        return res
          .status(404)
          .json({ status: 404, message: "Movie not found" });
      }

      const comments = await commentsServices.getComments(idMovie as string);

      res.status(200).json({ status: 200, data: comments });
    } catch (error: any) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }

  res.status(405).end(`Method ${req.method} Not Allowed`);
}
