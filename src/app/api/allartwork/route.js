import { requireAdmin } from "../../../lib/auth-utils";
import { dbConnect } from "../../../lib/dbConnect"

const artworkCollection = dbConnect("artworks")

export async function GET(request){
    // No auth required for viewing artworks - this is a public gallery
    const result = await artworkCollection.find().toArray();
    return Response.json(result);
}

export async function POST(request){
    try {
        await requireAdmin();
        const query = await request.json();
        const result = await artworkCollection.insertOne(query);
        return Response.json(result);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 403 });
    }
}