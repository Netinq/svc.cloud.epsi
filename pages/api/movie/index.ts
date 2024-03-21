import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import initializeDatabase from "../../../core/utils/database";
import { MoviesService } from "../../../core/services/movies";

/**
 * @swagger
 * /api/movie:
 *   post:
 *     tags:
 *       - Movie
 *     description: Create movie
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
 *       201:
 *         description: Success Response
 *       500:
 *         description: Error Response
 *
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if(req.method !=='POST') return res.status(405).end('Method ${req.method} Not Allowed');

    const moviesService = new MoviesService();

    try{
        const { plot, genres, title, languages, released, directors  } = req.body; 

        const result = await moviesService.createMovie(plot, genres, title, languages, released, directors);
        res.status(201).json({status: 201, data: result});

    } catch(error: any) {
        res.status(500).json({status: 500, message: error.message});
    }
}