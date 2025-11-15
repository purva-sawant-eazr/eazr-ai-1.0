import { NextRequest, NextResponse } from "next/server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://eazr.ai.eazr.in";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json(
      { error: "Authorization header missing" },
      { status: 401 }
    );
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    // Get the formData from the request
    const formData = await request.formData();

    const apiUrl = `${baseURL}/update-user-profile-with-picture`;

    // Forward the formData to the backend API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // DO NOT set Content-Type - fetch will set it automatically with boundary
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.detail || data.message || "Failed to update user profile" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Update User Profile With Picture API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
