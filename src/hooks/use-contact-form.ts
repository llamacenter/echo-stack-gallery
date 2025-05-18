
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, ContactFormValues } from "@/schemas/contact-schema";
import { submitContactForm } from "@/lib/api/contact";

// Rate limiting duration constant
const RATE_LIMIT_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  
  // Initialize react-hook-form with zod resolver
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    // Clear previous states
    setError("");
    
    // Check for rate limiting
    const lastSubmissionTime = localStorage.getItem("lastContactSubmission");
    const currentTime = Date.now();
    
    if (lastSubmissionTime && currentTime - parseInt(lastSubmissionTime) < RATE_LIMIT_DURATION) {
      setIsRateLimited(true);
      toast({
        title: "Rate limited",
        description: "Please wait a few minutes before submitting another message.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await submitContactForm(data);
      
      // Store submission time for rate limiting
      localStorage.setItem("lastContactSubmission", currentTime.toString());
      
      // Handle success
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        variant: "default"
      });
      
      // Reset form after success
      form.reset();
      
      // Reset success state after animation
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : "Failed to send message");
      
      toast({
        title: "Something went wrong",
        description: "Your message could not be sent. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    form,
    isSubmitting,
    isSuccess,
    isRateLimited,
    error,
    onSubmit: form.handleSubmit(onSubmit),
    setError,
    setIsRateLimited
  };
}
