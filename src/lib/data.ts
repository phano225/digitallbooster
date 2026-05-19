import { supabase } from "./supabase";

// Basic Content Definitions matching our Supabase payload
export interface SiteContent {
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
  };
  navigation?: Array<{
    label: string;
    href: string;
  }>;
  animations?: {
    enabled: boolean;
  };
  hero?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
  };
  services?: Array<{
    icon?: string;
    title?: string;
    description?: string;
    points?: string[];
  }>;
  portfolio?: Array<{
    title: string;
    category?: string;
    image?: string;
    description?: string;
    tags?: string[];
  }>;
  features?: Array<{
    icon?: string;
    title?: string;
    desc?: string;
  }>;
  cta?: {
    title?: string;
    subtitle?: string;
    buttonLabel?: string;
  };
}

export async function getSiteContent(): Promise<SiteContent | null> {
  try {
    // Use Next.js fetch revalidation logic internally if needed, 
    // but standard supabase.select is fine here.
    const { data, error } = await supabase
      .from('site_content')
      .select('payload')
      .eq('id', 1)
      .single();

    if (error) {
      console.error("Error fetching content from Supabase:", error);
      return null;
    }

    return data?.payload as SiteContent;
  } catch (err) {
    console.error("Fetch Exception:", err);
    return null;
  }
}
