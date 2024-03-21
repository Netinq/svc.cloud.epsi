import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import initializeDatabase from "../../../../../core/utils/database";
import { CommentsServices } from "../../../../../core/services/comments";
import { MoviesService } from "../../../../../core/services/movies";

/**
 * @swagger
 * /api/movie/{idMovie}/comment:
 *   post:
 *     tags:
 *       - Comments
 *     description: Get comment from movie
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - text
 *             properties:
 *               name:
 *                 type: string
 *                 description: user identity
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               text:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Success Response
 *       404:
 *         description: Movie not found
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Error Response
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).end(`Method ${req.method} Not Allowed`);

  const moviesService = new MoviesService();
  const commentsServices = new CommentsServices();

  try {
    const { idMovie } = req.query;
    const { name, email, text } = req.body;

    const movie = await moviesService.getMovieById(idMovie as string);

    if (!movie) return res.status(404).json({ message: "Movie not found" });
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!text) return res.status(400).json({ message: "Comment is required" });

    const result = await commentsServices.createComment(
      idMovie as string,
      name,
      email,
      text
    );

    res.status(201).json({ status: 201, data: result });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: error.message });
  }
}
