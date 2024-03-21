import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import initializeDatabase from "../../core/utils/database";
import { MoviesService } from "../../core/services/movies";

/**
 * @swagger
 * /api/movies:
 *   get:
 *     tags:
 *       - Movie
 *     description: Returns movies
 *     responses:
 *       200:
 *         description: Hello Movies
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const moviesService = new MoviesService();
    const movies = await moviesService.getMovies();

    res.status(200).json({ status: 200, data: movies });
}