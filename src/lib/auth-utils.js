import { getServerSession } from 'next-auth';
import { authOptions } from './authOption';
import { dbConnect, collections } from './dbConnect';

export async function requireAuth() {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        throw new Error('Unauthorized');
    }
    
    // Get user from database to ensure they still exist and get latest role
    const user = await dbConnect(collections.USERS).findOne({ 
        email: session.user.email 
    });
    
    if (!user) {
        throw new Error('User not found');
    }
    
    return { session, user };
}

export async function requireAdmin() {
    const { session, user } = await requireAuth();
    
    if (user.role !== 'admin') {
        throw new Error('Admin access required');
    }
    
    return { session, user };
}