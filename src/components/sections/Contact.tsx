
import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Contact form schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Rate limiting helper
const RATE_LIMIT_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function Contact() {
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
      // Submit to Supabase
      const { error: supabaseError } = await supabase
        .from('contacts')
        .insert([
          {
            name: data.name,
            email: data.email,
            message: data.message,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (supabaseError) {
        throw new Error(supabaseError.message);
      }
      
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
  
  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interested in working together? Fill out the form below with some info about 
            your project and I'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mail className="size-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center">Send me a message</CardTitle>
                <CardDescription className="text-center">
                  I'll respond within 24-48 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                {isRateLimited && (
                  <Alert className="mb-6 border-amber-600">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <AlertTitle>Rate Limited</AlertTitle>
                    <AlertDescription>
                      You can submit another message after 5 minutes.
                    </AlertDescription>
                  </Alert>
                )}
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell me about your project..." 
                              className="min-h-32 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting || isSuccess || isRateLimited}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : isSuccess ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Sent!
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </Form>
                
                <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Or schedule a call directly</p>
                  <Button variant="outline" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Book a consultation
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
