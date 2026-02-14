import { error } from "console";
import { requireAuth } from "../../../lib/auth-utils";
import { dbConnect } from "../../../lib/dbConnect";
import { ObjectId } from "mongodb";

const commissionCollection = dbConnect('commissions')

export async function POST(request) {
    const query = await request.json();
    const { user } = await requireAuth();

    if (!user) {
        return Response.json({ error: "login first"}, { status: 403 })
    } else {
        const commissionData = {
            ...query,
            createdAt: new Date(),
            status: 'pending',
            userId: user._id.toString()
        }
        const result = await commissionCollection.insertOne(commissionData)
        return Response.json(result);
    }

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

export async function PUT(request) {
    try {
        const { user } = await requireAuth()
        const { commissionId, status } = await request.json();

        // Validate status
        const validStatuses = ['pending', 'in-progress', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return Response.json({ 
                error: 'Invalid status. Must be: pending, in-progress, completed, or cancelled' 
            }, { status: 400 });
        }

        // Find the commission first
        const commission = await commissionCollection.findOne({ 
            _id: new ObjectId(commissionId) 
        });

        if (!commission) {
            return Response.json({ 
                error: 'Commission not found' 
            }, { status: 404 });
        }

        // Check permissions
        if (user.role !== 'admin' && commission.userId !== user._id.toString()) {
            return Response.json({ 
                error: 'You do not have permission to update this commission' 
            }, { status: 403 });
        }

        // Update the commission
        const result = await commissionCollection.updateOne(
            { _id: new ObjectId(commissionId) },
            { 
                $set: { 
                    status,
                    updatedAt: new Date()
                } 
            }
        );

        if (result.modifiedCount === 0) {
            return Response.json({ 
                error: 'Failed to update commission' 
            }, { status: 500 });
        }

        return Response.json({ 
            success: true, 
            message: `Commission status updated to ${status}` 
        });

    } catch (error) {
        console.error('Update commission error:', error);
        return Response.json({ error: error.message }, { status: 401 });
    }
}
