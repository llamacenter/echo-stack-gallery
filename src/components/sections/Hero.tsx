
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Full-Stack <span className="gradient-text">Developer</span> & SaaS Architect
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Building high-performance, scalable web applications with modern 
              technologies. Specialized in Next.js, React, TypeScript, and cloud architecture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="font-medium"
                asChild
              >
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="font-medium"
                asChild
              >
                <a href="#products">View Portfolio</a>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-md opacity-75"></div>
              <div className="bg-background rounded-lg overflow-hidden relative p-6 md:p-8 border border-border">
                <pre className="text-sm md:text-base overflow-x-auto">
                  <code>{`// Hello World
const developer = {
  name: "Your Name",
  role: "Full-Stack Developer",
  skills: [
    "Next.js", "React", 
    "TypeScript", "Node.js"
  ],
  loves: "Building amazing apps"
};

// Let's create something great!`}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Skills Matrix */}
      <div className="container mt-16">
        <div className="bg-secondary/50 rounded-xl p-6 md:p-8 border">
          <h2 className="text-xl font-semibold mb-6 text-center">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Next.js", "React", "TypeScript", "Node.js",
              "PostgreSQL", "TailwindCSS", "GraphQL", "Framer Motion",
              "React Native", "AWS", "CI/CD", "Jest"
            ].map((skill) => (
              <div 
                key={skill}
                className="flex items-center justify-center p-3 bg-background rounded-md border text-sm hover:border-primary transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Trust Indicators */}
      <div className="container mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold gradient-text">5+</p>
            <p className="text-sm text-muted-foreground">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold gradient-text">50+</p>
            <p className="text-sm text-muted-foreground">Projects Completed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold gradient-text">30+</p>
            <p className="text-sm text-muted-foreground">Happy Clients</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold gradient-text">100%</p>
            <p className="text-sm text-muted-foreground">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
