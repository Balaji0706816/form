import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:M",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            body.firstName || "",
            body.lastName || "",
            body.email || "",
            body.phone || "",
            body.company || "",
            body.businessType || "",
            body.currentWebsite || "",
            body.websiteType || "",
            body.goal || "",
            body.budget || "",
            body.timeline || "",
            body.message || "",
          ],
        ],
      },
    });

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Google Sheets error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to submit form" },
      { status: 500 }
    );
  }
}