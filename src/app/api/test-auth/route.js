import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../lib/authOption"

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    
    return Response.json({
      success: true,
      session: session,
      message: session ? "User is authenticated" : "User is not authenticated"
    })
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
      message: "Error checking authentication"
    })
  }
}