const { dbConnect } = require("../../../lib/dbConnect");

const commissionCollection = dbConnect('commissions')

export async function POST(request) {
    const query = await request.json();

    const commissionData = {
        ...query,
        createdAt: new Date(),
        status: 'pending',
    }

    const result = await commissionCollection.insertOne(commissionData)

    return Response.json(result);
}