import { dbConnect, collections } from "../../../../lib/dbConnect";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return Response.json({ error: 'Email is required' }, { status: 400 });
        }

        const user = await dbConnect(collections.USERS).findOne({ email });

        if (!user) {
            return Response.json({ error: 'User not found' }, { status: 404 });
        }

        return Response.json({ 
            role: user.role || 'user',
            name: user.name,
            email: user.email
        });
    } catch (error) {
        return Response.json({ 
            error: error.message 
        }, { status: 500 });
    }
}
