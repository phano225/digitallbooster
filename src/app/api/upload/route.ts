import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Initialize Supabase admin client if service role key is present, fallback to anon
const hasServiceKey = serviceKey && serviceKey !== "REMPLACEZ_PAR_VOTRE_CLE_SERVICE_ROLE";
const supabaseKey = hasServiceKey ? serviceKey : anonKey;
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

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

    // Clean up filename and make it unique
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

    // Attempt to create bucket if it doesn't exist (only works with service key or correct policies)
    try {
      await supabaseAdmin.storage.createBucket('portfolio', {
        public: true
      });
    } catch (bucketErr) {
      // Quietly continue if already exists or fails
    }

    // Upload file directly to Supabase Storage Bucket
    const { data, error: uploadError } = await supabaseAdmin.storage
      .from('portfolio')
      .upload(fileName, bytes, {
        contentType: file.type,
        duplex: 'half'
      } as any);

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError);
      
      // If upload failed, provide helpful context
      let helperMsg = uploadError.message;
      if (!hasServiceKey && (uploadError.message.includes("policies") || uploadError.message.includes("403") || uploadError.message.includes("New row violates"))) {
        helperMsg = "Permission refusée. Pour téléverser sur Supabase, veuillez renseigner votre clé 'SUPABASE_SERVICE_ROLE_KEY' dans le fichier .env.local.";
      }
      throw new Error(helperMsg);
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('portfolio')
      .getPublicUrl(fileName);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (err: any) {
    console.error("Upload API Error:", err);
    return NextResponse.json(
      { error: err.message || "Impossible de téléverser l'image sur Supabase." },
      { status: 500 }
    );
  }
}
