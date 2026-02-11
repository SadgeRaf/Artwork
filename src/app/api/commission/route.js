import { requireAuth } from "../../../lib/auth-utils";
import { dbConnect } from "../../../lib/dbConnect";

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

export async function GET(request) {
    try {
        const { user } = await requireAuth()

        let query = {};
        if (user.role !== 'admin') {
            query.userId = user._id.toString();
        }

        const commissions = await commissionCollection.find(query).toArray();
        return Response.json(commissions);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 401 });
    }
}