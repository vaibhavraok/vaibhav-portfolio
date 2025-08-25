import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { Profile } from "@shared/schema";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-secondary text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Top Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={scrollToTop}
            className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-accent transition-colors"
            data-testid="button-scroll-to-top"
          >
            <ArrowUp className="w-6 h-6" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4" data-testid="text-footer-name">
              {profile?.name || "Vaibhav K"}
            </h3>
            <p className="text-gray-300 mb-6" data-testid="text-footer-bio">
              {profile?.bio || "Full Stack Developer passionate about AI & ML, creating innovative solutions that bridge technology and human needs. Always learning, always building."}
            </p>
            <div className="flex space-x-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open(profile?.linkedinUrl || "https://linkedin.com/in/vaibhav-k-3b826631a", "_blank")}
                className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="button-footer-linkedin"
              >
                <i className="fab fa-linkedin"></i>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open(profile?.githubUrl || "https://github.com/vaibhavraok", "_blank")}
                className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="button-footer-github"
              >
                <i className="fab fa-github"></i>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open(`mailto:${profile?.email || "vaibhavraok0123@gmail.com"}`, "_blank")}
                className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="button-footer-email"
              >
                <i className="fas fa-envelope"></i>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open(`tel:${profile?.phone || "+917204372199"}`, "_blank")}
                className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="button-footer-phone"
              >
                <i className="fas fa-phone"></i>
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4" data-testid="text-quick-links-title">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-gray-300 hover:text-primary transition-colors"
                  data-testid="link-footer-home"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-300 hover:text-primary transition-colors"
                  data-testid="link-footer-about"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("skills")}
                  className="text-gray-300 hover:text-primary transition-colors"
                  data-testid="link-footer-skills"
                >
                  Skills
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-gray-300 hover:text-primary transition-colors"
                  data-testid="link-footer-projects"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("education")}
                  className="text-gray-300 hover:text-primary transition-colors"
                  data-testid="link-footer-education"
                >
                  Education
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-300 hover:text-primary transition-colors"
                  data-testid="link-footer-contact"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4" data-testid="text-contact-info-footer-title">
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <i className="fas fa-phone text-primary"></i>
                <span className="text-gray-300" data-testid="text-footer-phone">
                  {profile?.phone || "+91 7204372199"}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-primary"></i>
                <span className="text-gray-300" data-testid="text-footer-email">
                  {profile?.email || "vaibhavraok0123@gmail.com"}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0" data-testid="text-footer-built-with">
            Built with <i className="fas fa-heart text-red-500"></i> by {profile?.name || "Vaibhav K"}
          </div>
          <div className="text-gray-400 text-sm" data-testid="text-footer-copyright">
            © 2025 {profile?.name || "Vaibhav K"}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
