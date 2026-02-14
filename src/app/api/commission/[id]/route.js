import { ObjectId } from "mongodb"
import { dbConnect } from "../../../../lib/dbConnect"

const commissionCollection = dbConnect('commissions')

export async function GET(request, {params}) {
    const {id} = await params
    const result = await commissionCollection.findOne({_id: new ObjectId(id)})
    return Response.json(result)
}

