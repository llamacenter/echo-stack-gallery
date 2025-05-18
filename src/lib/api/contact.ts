
import { supabase } from "@/integrations/supabase/client";
import { ContactFormValues } from "@/schemas/contact-schema";

export async function submitContactForm(data: ContactFormValues) {
  // Submit to Supabase - using type assertion to work with existing types
  const { error: supabaseError } = await supabase
    .from('contacts')
    .insert([
      {
        name: data.name,
        email: data.email,
        message: data.message,
        created_at: new Date().toISOString()
      }
    ] as any); // Type assertion to bypass type checking
  
  if (supabaseError) {
    throw new Error(supabaseError.message);
  }
  
  return true;
}
