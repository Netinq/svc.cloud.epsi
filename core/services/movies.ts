import { Db, ObjectId } from "mongodb";
import initializeDatabase from "../utils/database";

export class MoviesService {

    public async getMovies() {
        const db: Db = await initializeDatabase();
        const movies = await db.collection("movies").find({}).limit(10).toArray();
        return movies;
    }

    public async createMovie(plot: string, genres: string[], title: string, languages: string[], released: string, directors: string[]) {
        const db: Db = await initializeDatabase();
        return await db.collection("movies").insertOne({
            plot: plot,
            genres: genres,
            title: title,
            languages: languages,
            released: released,
            directors: directors
        });
    }

    public async getMovieById(id: string) {
        const db: Db = await initializeDatabase();
        return await db.collection("movies").findOne({ _id: new ObjectId(id) });
    }

    public async updateMovie(id: string, plot: string, genres: string[], title: string, languages: string[], released: string, directors: string[]) {
        const db: Db = await initializeDatabase();
        return await db.collection("movies").updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    plot: plot,
                    genres: genres,
                    title: title,
                    languages: languages,
                    released: released,
                    directors: directors
                }
            }
        );
    }

    public async deleteMovie(id: string) {
        const db: Db = await initializeDatabase();
        return await db.collection("movies").deleteOne({ _id: new ObjectId(id) });
    }
}