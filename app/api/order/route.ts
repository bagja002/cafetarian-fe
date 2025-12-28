import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Simulate backend processing time
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Log the received data (simulating database save)
        console.log("Received Order:", JSON.stringify(body, null, 2));

        const paymentMethod = body.customer?.paymentMethod;

        if (paymentMethod === "QRIS" || paymentMethod === "Transfer") {
            return NextResponse.json({
                message: "Order created successfully",
                token: "EXAMPLE_SNAP_TOKEN_12345", // Mock Token
                redirect_url: "https://google.com" // Mock redirect
            });
        }

        return NextResponse.json({
            message: "Order created successfully",
            // No redirect_url for Cash
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Invalid request data" },
            { status: 400 }
        );
    }
}
