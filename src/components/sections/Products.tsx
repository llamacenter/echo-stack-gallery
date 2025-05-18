
import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const productsData = [
  {
    title: "SaaS Dashboard",
    description: "A comprehensive admin dashboard for SaaS applications with authentication, analytics, and user management.",
    tags: ["Next.js", "TypeScript", "Supabase", "TailwindCSS"],
    demoUrl: "#",
    caseStudyUrl: "#",
    imageUrl: "https://via.placeholder.com/600x400?text=SaaS+Dashboard"
  },
  {
    title: "E-commerce Platform",
    description: "Fully responsive e-commerce solution with product management, cart functionality, and payment processing.",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    demoUrl: "#",
    caseStudyUrl: "#",
    imageUrl: "https://via.placeholder.com/600x400?text=E-commerce+Platform"
  },
  {
    title: "Real Estate App",
    description: "Property listing application with search, filtering, and mapping functionalities.",
    tags: ["Next.js", "React", "Google Maps API", "Prisma"],
    demoUrl: "#",
    caseStudyUrl: "#",
    imageUrl: "https://via.placeholder.com/600x400?text=Real+Estate+App"
  }
];

const projectsData = [
  {
    title: "Task Management Tool",
    description: "A Trello-like task management app with drag-and-drop functionality.",
    tags: ["React", "Redux", "React DnD", "Firebase"],
    githubUrl: "https://github.com",
    demoUrl: "#",
    imageUrl: "https://via.placeholder.com/600x400?text=Task+Management"
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather information with location-based forecasts.",
    tags: ["React", "OpenWeather API", "CSS Modules"],
    githubUrl: "https://github.com",
    demoUrl: "#",
    imageUrl: "https://via.placeholder.com/600x400?text=Weather+Dashboard"
  },
  {
    title: "Markdown Editor",
    description: "Real-time markdown editor with preview and export options.",
    tags: ["TypeScript", "React", "Marked", "LocalStorage"],
    githubUrl: "https://github.com",
    demoUrl: "#",
    imageUrl: "https://via.placeholder.com/600x400?text=Markdown+Editor"
  }
];

const snippetsData = [
  {
    title: "Custom React Hooks Collection",
    description: "A set of useful React hooks for common use cases.",
    language: "TypeScript",
    code: `export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue] as const;
}`
  },
  {
    title: "Debounce Utility",
    description: "A simple debounce function for rate limiting.",
    language: "JavaScript",
    code: `export function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`
  },
  {
    title: "API Request Wrapper",
    description: "A fetch API wrapper with error handling.",
    language: "TypeScript",
    code: `export async function fetchApi<T>(
  url: string, 
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  
  return response.json();
}`
  }
];

export default function Products() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const filteredProducts = activeFilter === "all" 
    ? productsData 
    : productsData.filter(product => product.tags.includes(activeFilter));
  
  return (
    <section id="products" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of projects, professional products, and useful code snippets 
            that showcase my development skills and approach.
          </p>
        </div>
        
        <Tabs defaultValue="products" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="products">Production Products</TabsTrigger>
              <TabsTrigger value="projects">Personal Projects</TabsTrigger>
              <TabsTrigger value="snippets">Code Snippets</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="products" className="space-y-8">
            <div id="products-list">
              {/* Filters */}
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                <Badge 
                  className={`cursor-pointer ${activeFilter === "all" ? "bg-primary" : "bg-secondary hover:bg-secondary/80"}`}
                  onClick={() => setActiveFilter("all")}
                >
                  All
                </Badge>
                {["Next.js", "React", "TypeScript", "Node.js"].map(filter => (
                  <Badge
                    key={filter}
                    className={`cursor-pointer ${activeFilter === filter ? "bg-primary" : "bg-secondary hover:bg-secondary/80"}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
              
              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={product.imageUrl} 
                          alt={product.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105" 
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{product.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {product.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <CardDescription>{product.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={product.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" /> Live Demo
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={product.caseStudyUrl} target="_blank" rel="noopener noreferrer">
                            Case Study
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-8">
            <div id="projects">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsData.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105" 
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <CardDescription>{project.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" /> GitHub
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" /> Demo
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="snippets" className="space-y-8">
            <div id="snippets">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {snippetsData.map((snippet, index) => (
                  <motion.div
                    key={snippet.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle>{snippet.title}</CardTitle>
                        <Badge variant="secondary">{snippet.language}</Badge>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">{snippet.description}</CardDescription>
                        <div className="relative">
                          <pre className="p-4 rounded-md bg-secondary overflow-x-auto text-xs sm:text-sm">
                            <code>{snippet.code}</code>
                          </pre>
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="absolute top-2 right-2"
                            onClick={() => navigator.clipboard.writeText(snippet.code)}
                          >
                            Copy
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
