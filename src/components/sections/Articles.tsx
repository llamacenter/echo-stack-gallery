
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Dummy articles data (in a real app, this would come from APIs)
const articlesData = [
  {
    id: 1,
    title: "Building High-Performance React Applications",
    excerpt: "Learn how to optimize React apps for better user experience and SEO scores.",
    date: "2023-05-15",
    readingTime: 8,
    tags: ["React", "Performance", "JavaScript"],
    source: "Hashnode",
    url: "#"
  },
  {
    id: 2,
    title: "Next.js 14: The Future of React Framework",
    excerpt: "Exploring the new features and improvements in Next.js 14 and how to leverage them.",
    date: "2023-06-22",
    readingTime: 12,
    tags: ["Next.js", "React", "Web Development"],
    source: "Dev.to",
    url: "#"
  },
  {
    id: 3,
    title: "TypeScript Best Practices for Large Projects",
    excerpt: "A comprehensive guide to scaling TypeScript in enterprise applications.",
    date: "2023-07-10",
    readingTime: 15,
    tags: ["TypeScript", "Best Practices", "Architecture"],
    source: "Medium",
    url: "#"
  },
  {
    id: 4,
    title: "Building Accessible Web Applications",
    excerpt: "How to ensure your web apps are accessible to all users and comply with WCAG standards.",
    date: "2023-08-05",
    readingTime: 10,
    tags: ["Accessibility", "HTML", "CSS"],
    source: "Hashnode",
    url: "#"
  },
  {
    id: 5,
    title: "State Management in 2023: Beyond Redux",
    excerpt: "Modern approaches to state management in React applications.",
    date: "2023-09-18",
    readingTime: 11,
    tags: ["React", "State Management", "JavaScript"],
    source: "Dev.to",
    url: "#"
  },
  {
    id: 6,
    title: "Optimizing Database Queries in Node.js Applications",
    excerpt: "Techniques for improving database performance in Node.js backend services.",
    date: "2023-10-07",
    readingTime: 9,
    tags: ["Node.js", "Database", "Performance"],
    source: "Medium",
    url: "#"
  }
];

export default function Articles() {
  const [articles, setArticles] = useState(articlesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  
  // Get all unique tags
  const allTags = Array.from(
    new Set(articlesData.flatMap(article => article.tags))
  );
  
  // Filter articles based on search query and selected tag
  useEffect(() => {
    let filtered = articlesData;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        article => 
          article.title.toLowerCase().includes(query) || 
          article.excerpt.toLowerCase().includes(query)
      );
    }
    
    if (selectedTag) {
      filtered = filtered.filter(article => 
        article.tags.includes(selectedTag)
      );
    }
    
    setArticles(filtered);
  }, [searchQuery, selectedTag]);
  
  return (
    <section id="articles" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Articles & Insights</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technical articles, tutorials and insights I've published 
            across various developer platforms.
          </p>
        </div>
        
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge 
              className={`cursor-pointer ${selectedTag === "" ? "bg-primary" : "bg-secondary hover:bg-secondary/80"}`}
              onClick={() => setSelectedTag("")}
            >
              All
            </Badge>
            {allTags.map(tag => (
              <Badge
                key={tag}
                className={`cursor-pointer ${selectedTag === tag ? "bg-primary" : "bg-secondary hover:bg-secondary/80"}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{article.source}</Badge>
                      <span className="text-xs text-muted-foreground">{article.readingTime} min read</span>
                    </div>
                    <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        {article.title}
                      </a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-3">
                      {article.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(article.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-secondary rounded-md">
            <p className="text-lg text-muted-foreground">No articles found matching your criteria.</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
