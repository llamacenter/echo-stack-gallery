
import { useEffect } from "react";
import { ThemeProvider } from "./ThemeProvider";
import Navigation from "./Navigation";
import SEO from "./SEO";
import { HelmetProvider } from 'react-helmet-async';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Implement intersection observer for lazy loading
  useEffect(() => {
    const lazyLoadObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("animate-fade-in");
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all sections
    document.querySelectorAll("section").forEach((section) => {
      lazyLoadObserver.observe(section);
    });
    
    return () => {
      lazyLoadObserver.disconnect();
    };
  }, []);
  
  return (
    <ThemeProvider>
      <HelmetProvider>
        <SEO />
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">{children}</main>
          <footer className="bg-secondary py-8">
            <div className="container text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Developer Portfolio. All rights reserved.
              </p>
              <div className="mt-4 flex justify-center space-x-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  GitHub
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Twitter
                </a>
              </div>
            </div>
          </footer>
        </div>
      </HelmetProvider>
    </ThemeProvider>
  );
}
