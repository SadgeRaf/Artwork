"use server"

import { dbConnect, collections } from "../../lib/dbConnect";
import bcrypt from 'bcryptjs'

export const postUser = async (payload) => {
    const { email, password, name } = payload;
    //check payload
    if (!email || !password) return null;

    //check user
    const isExist = await dbConnect(collections.USERS).findOne({ email });
    if (isExist) {
        return null;
    }

    //create user
    const newUser = {
        provider: "credentials",
        name,
        email,
        password: await bcrypt.hash(password, 14),
        role: "user"
    };

    //insert user
    const result = await dbConnect(collections.USERS).insertOne(newUser);

    if (result.acknowledged) {
        return {
            ...result, insertedId: result.insertedId.toString()
        };
    }
}

// New function for Google users
export const postGoogleUser = async (payload) => {
    const { email, name, image } = payload;

    if (!email) return null;

    // Check if user exists
    const existingUser = await dbConnect(collections.USERS).findOne({ email });
    if (existingUser) {
        return {
            _id: existingUser._id.toString(),
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role || 'user',
            provider: existingUser.provider,
            image: existingUser.image
        };
    }

    // Create new Google user
    const newUser = {
        provider: "google",
        name,
        email,
        image,
        role: "user",
        emailVerified: true,
        createdAt: new Date()
    };

    const result = await dbConnect(collections.USERS).insertOne(newUser);

    if (result.acknowledged) {
        return {
            _id: result.insertedId.toString(),
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            provider: newUser.provider,
            image: newUser.image
        };
    }
    
    return null;
}

export const loginUser = async (payload) => {
    const { email, password, name } = payload;
    //check payload
    if (!email || !password) return null;


    const user = await dbConnect(collections.USERS).findOne({ email });
    if (!user) {
        return null;
    }

    const isMatched = await bcrypt.compare(password, user.password)

    if (isMatched) {
        return user
    } else {
        return null
    }
}