import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier fourni." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean up filename and make it unique
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

    // Path in public folder
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Ensure folder exists
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Return the relative URL
    return NextResponse.json({ url: `/uploads/${fileName}` });
  } catch (err: any) {
    console.error("Upload API Error:", err);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'upload : " + err.message },
      { status: 500 }
    );
  }
}
