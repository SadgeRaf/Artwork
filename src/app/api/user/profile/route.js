import { requireAuth } from "../../../../lib/auth-utils";
import { dbConnect, collections } from "../../../../lib/dbConnect";
import bcrypt from 'bcryptjs';

export async function GET(request) {
    try {
        const { user } = await requireAuth();
        const { password, ...userProfile } = user;

        return Response.json({
            success: true,
            user: userProfile
        });
    } catch (error) {
        return Response.json({ 
            error: error.message 
        }, { status: 401 });
    }
}

// Update user profile
export async function PUT(request) {
    try {
        const { user } = await requireAuth();
        const updates = await request.json();

        // Fields that can be updated
        const allowedUpdates = ['name'];
        const updateData = {};

        // Only allow updating specific fields
        allowedUpdates.forEach(field => {
            if (updates[field] !== undefined) {
                updateData[field] = updates[field];
            }
        });

        // Handle password update separately
        if (updates.currentPassword && updates.newPassword) {
            // Verify current password
            const isMatch = await bcrypt.compare(updates.currentPassword, user.password);
            
            if (!isMatch) {
                return Response.json({ 
                    error: 'Current password is incorrect' 
                }, { status: 400 });
            }

            // Hash new password
            updateData.password = await bcrypt.hash(updates.newPassword, 14);
        }

        if (Object.keys(updateData).length === 0) {
            return Response.json({ 
                error: 'No valid fields to update' 
            }, { status: 400 });
        }

        // Update user in database
        const result = await dbConnect(collections.USERS).updateOne(
            { _id: user._id },
            { $set: updateData }
        );

        if (result.modifiedCount === 0) {
            return Response.json({ 
                error: 'Failed to update profile' 
            }, { status: 500 });
        }

        return Response.json({
            success: true,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        return Response.json({ 
            error: error.message 
        }, { status: 500 });
    }
}
