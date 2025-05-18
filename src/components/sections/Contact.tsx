
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
import { useToast } from "@/components/ui/use-toast";

// Contact form schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
    setIsSubmitting(true);
    
    // Simulate form submission delay
    setTimeout(() => {
      console.log("Form submitted:", data);
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
    }, 1500);
    
    // In a real implementation, this would be a server-side action with Supabase
    // Example:
    // try {
    //   await supabase.from('contacts').insert([
    //     {
    //       name: data.name,
    //       email: data.email,
    //       message: data.message,
    //       created_at: new Date().toISOString()
    //     }
    //   ]);
    //   setIsSubmitting(false);
    //   setIsSuccess(true);
    //   toast({
    //     title: "Message sent successfully!",
    //     description: "Thank you for reaching out. I'll get back to you soon.",
    //   });
    //   form.reset();
    //   setTimeout(() => setIsSuccess(false), 3000);
    // } catch (error) {
    //   setIsSubmitting(false);
    //   toast({
    //     title: "Something went wrong",
    //     description: "Your message could not be sent. Please try again.",
    //     variant: "destructive"
    //   });
    // }
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
                      disabled={isSubmitting || isSuccess}
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
