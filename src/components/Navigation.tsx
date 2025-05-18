
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "#home" },
  { 
    label: "Products", 
    href: "#products",
    subItems: [
      { label: "Products", href: "#products-list" },
      { label: "Projects", href: "#projects" },
      { label: "Snippets", href: "#snippets" },
    ]
  },
  { label: "Services", href: "#services" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id");
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId || "");
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header className={cn(
      "fixed w-full top-0 left-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
    )}>
      <div className="container flex items-center justify-between py-4">
        <a 
          href="#home" 
          className="text-foreground font-bold text-xl hover:text-primary transition-colors"
        >
          <span className="gradient-text">Dev Portfolio</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <div key={item.href} className="relative group">
              <a 
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  activeSection === item.href.substring(1) ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </a>
              
              {/* Dropdown for sub-items */}
              {item.subItems && (
                <div className="absolute left-0 mt-2 hidden group-hover:block">
                  <div className="py-1 bg-card rounded-md shadow-lg border">
                    {item.subItems.map((subItem) => (
                      <a
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-muted transition-colors",
                          activeSection === subItem.href.substring(1) ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mr-2"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-background border-t">
          <div className="container py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <div key={item.href}>
                <a 
                  href={item.href}
                  className={cn(
                    "block py-2 text-sm font-medium transition-colors hover:text-primary",
                    activeSection === item.href.substring(1) ? "text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
                
                {/* Mobile Sub-items */}
                {item.subItems && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-border">
                    {item.subItems.map((subItem) => (
                      <a
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "block py-1 text-sm transition-colors hover:text-primary",
                          activeSection === subItem.href.substring(1) ? "text-primary" : "text-muted-foreground"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
