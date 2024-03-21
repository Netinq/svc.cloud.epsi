import { Db, ObjectId } from "mongodb";
import initializeDatabase from "../utils/database";

export class CommentsServices {

    public async getComments(idMovie: string) {
        const db: Db = await initializeDatabase();
        const comments = await db.collection("comments").find({ movie_id: new ObjectId(idMovie) }).toArray();
        return comments;
    }

    public async getComment(idComment: string, idMovie: string) {
        const db: Db = await initializeDatabase();
        return await db.collection("comments").findOne({
            _id: new ObjectId(idComment),
            movie_id: new ObjectId(idMovie)
        });
    }

    public async createComment(idMovie: string, name: string, email: string, text: string) {
        const db: Db = await initializeDatabase();
        return await db.collection("comments").insertOne({
            movie_id: new ObjectId(idMovie),
            name: name,
            email: email,
            text: text
        });
    }

    public async updateComment(idComment: string, idMovie: string, text: string) {
        const db: Db = await initializeDatabase();
        return await db.collection("comments").updateOne({
            _id: new ObjectId(idComment),
            movie_id: new ObjectId(idMovie)
        }, {
            $set: { text: text }
        });
    }

    public async deleteComment(idComment: string, idMovie: string) {
        const db: Db = await initializeDatabase();
        return await db.collection("comments").deleteOne({
            _id: new ObjectId(idComment),
            movie_id: new ObjectId(idMovie)
        });
    }

}