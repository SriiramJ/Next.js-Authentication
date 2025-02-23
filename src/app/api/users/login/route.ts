import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request : NextRequest){
    try {
        
       const reqBody = await request.json()
       const {email, password} = reqBody;
       console.log("Request body:", reqBody);

    //    Check if user exists
    const user = await User.findOne({email})
    if(!user){
        return NextResponse.json({error: "User does not exist"}, {status: 400})
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return NextResponse.json({error: "Invalid password"}, {status: 400})
    }

    // Create token data
    const tokenData = {
        id: user._id,
        email: user.email,
        username: user.username
    }

    // Create token
    if (!process.env.TOKEN_SECRET) {
        throw new Error("TOKEN_SECRET is not defined");
    }
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
    });
    
    const response = NextResponse.json({
        message: "Login successful",
        token,
    })

    response.cookies.set("token", token, {
        httpOnly: true,
    });

    return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 }); 
    }
}