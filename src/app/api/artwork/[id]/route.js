import { ObjectId } from "mongodb"
import { dbConnect } from "../../../../lib/dbConnect"

const artworkCollection = dbConnect("artworks")

export async function GET(request, {params}) {
    const {id} = await params
    const result = await artworkCollection.findOne({_id: new ObjectId(id)})
    return Response.json(result)
}

