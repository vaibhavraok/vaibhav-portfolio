import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface NavigationProps {
  onAdminClick: () => void;
}

export default function Navigation({ onAdminClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900" data-testid="text-logo">
              Vaibhav K
            </h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection("home")}
                className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                data-testid="link-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("about")}
                className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                data-testid="link-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection("skills")}
                className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                data-testid="link-skills"
              >
                Skills
              </button>
              <button 
                onClick={() => scrollToSection("projects")}
                className="text-primary px-3 py-2 text-sm font-medium transition-colors"
                data-testid="link-projects"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                data-testid="link-contact"
              >
                Contact
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => window.open("https://github.com/vaibhavraok", "_blank")}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
              data-testid="button-resume"
            >
              <i className="fas fa-download"></i>
              <span>Resume</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onAdminClick}
              className="text-gray-600 hover:text-primary p-2 transition-colors"
              data-testid="button-admin"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <i className="fas fa-bars"></i>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button 
              onClick={() => scrollToSection("home")}
              className="block px-3 py-2 text-gray-900 hover:text-primary"
              data-testid="link-mobile-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="block px-3 py-2 text-gray-600 hover:text-primary"
              data-testid="link-mobile-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("skills")}
              className="block px-3 py-2 text-gray-600 hover:text-primary"
              data-testid="link-mobile-skills"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection("projects")}
              className="block px-3 py-2 text-primary"
              data-testid="link-mobile-projects"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="block px-3 py-2 text-gray-600 hover:text-primary"
              data-testid="link-mobile-contact"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
