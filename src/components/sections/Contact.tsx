
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useContactForm } from "@/hooks/use-contact-form";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactAlerts } from "@/components/contact/ContactAlerts";
import { BookingButton } from "@/components/contact/BookingButton";

export default function Contact() {
  const { form, isSubmitting, isSuccess, isRateLimited, error, onSubmit } = useContactForm();
  
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
                <ContactAlerts error={error} isRateLimited={isRateLimited} />
                
                <ContactForm 
                  form={form}
                  isSubmitting={isSubmitting}
                  isSuccess={isSuccess}
                  isRateLimited={isRateLimited}
                  onSubmit={onSubmit}
                />
                
                <BookingButton />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
