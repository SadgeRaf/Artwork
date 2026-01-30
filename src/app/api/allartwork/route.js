import { dbConnect } from "../../../lib/dbConnect"

const artworkCollection = dbConnect("artworks")

export async function GET(request){
    const result = await artworkCollection.find().toArray();
    return Response.json(result);
}