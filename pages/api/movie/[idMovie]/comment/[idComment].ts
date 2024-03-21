import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import initializeDatabase from "../../../../../core/utils/database";
import { MoviesService } from "../../../../../core/services/movies";
import { CommentsServices } from "../../../../../core/services/comments";

/**
 * @swagger
 * /api/movie/{idMovie}/comment/{idComment}:
 *   get:
 *     tags:
 *       - Comments
 *     description: Endpoint which returns comment data
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID movie
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: ID comment
 *     responses:
 *       200:
 *         description: Success Response
 *       404:
 *         description: Not found
 *   put:
 *     tags:
 *       - Comments
 *     description: Update comment data
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID movie
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: ID comment
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
 *               text:
 *                 type: string
 *                 description: Comment text
 *                 required: true
 *     responses:
 *       200:
 *         description: Success Response
 *   delete:
 *     tags:
 *       - Comments
 *     description: Delete comment data
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID movie
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: ID comment
 *     responses:
 *       200:
 *         description: Comment deleted
 *       500:
 *         description: Server error
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { idMovie, idComment } = req.query;

  const moviesService = new MoviesService();
  const commentsServices = new CommentsServices();

  const movie = await moviesService.getMovieById(idMovie as string);
  if (!movie)
    return res.status(404).json({ status: 404, message: "Movie not found" });

  switch (req.method) {
    case "GET":
      try {
        const comment = await commentsServices.getComment(
          idComment as string,
          idMovie as string
        );

        if (!comment) res.status(404).json({ message: "Comment not found" });
        res.status(200).json({ status: 200, data: comment });
      } catch (error: any) {
        res.status(500).json({ status: 500, message: error.message });
      }
      break;
    case "PUT":
      try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: "Text is required" });

        const updatedComment = await commentsServices.updateComment(
          idComment as string,
          idMovie as string,
          text
        );

        res.status(200).json({ status: 200, data: updatedComment });
      } catch (error: any) {
        res.status(500).json({ status: 500, message: error.message });
      }
      break;
    case "DELETE":
      try {
        await commentsServices.deleteComment(
          idComment as string,
          idMovie as string
        );
        res
          .status(204)
          .json({ status: 200, message: "Comment deleted successfully" });
      } catch (error: any) {
        res.status(500).json({ status: 500, message: error.message });
      }
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
