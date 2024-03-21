import clientPromise from "../../lib/mongodb";

export default async function initializeDatabase() {

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    return db
}