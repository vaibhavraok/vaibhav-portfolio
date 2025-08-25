import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { Profile } from "@shared/schema";
import profileImage from "@assets/ed9f128e-e302-42ab-8539-f07709a01b25_1756111371303.jpg";

export default function HeroSection() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="pt-16 pb-16 bg-gradient-to-br from-secondary via-gray-700 to-primary relative overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/20 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-primary/10 rounded-full"></div>
      <div className="absolute top-1/2 right-0 w-40 h-40 bg-primary/5 rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <p className="text-primary text-lg mb-2" data-testid="text-hero-greeting">
              Hello, I'm
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" data-testid="text-hero-title">
              {profile?.name || "Vaibhav K"}
            </h1>
            <p className="text-xl text-primary mb-6" data-testid="text-hero-subtitle">
              Full Stack Developer • AI & ML Enthusiast
            </p>
            <p className="text-gray-300 mb-8 max-w-lg" data-testid="text-hero-description">
              Turning ideas into reliable, user-centric software powered by clean code and continuous learning.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <Button
                onClick={() => window.open(profile?.resumeUrl || "https://github.com/vaibhavraok", "_blank")}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
                data-testid="button-download-resume"
              >
                <i className="fas fa-download"></i>
                <span>Download Resume</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-secondary transition-colors"
                data-testid="button-get-in-touch"
              >
                Get In Touch
              </Button>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <i className="fas fa-phone text-primary"></i>
                <span data-testid="text-phone">{profile?.phone || "+91 7204372199"}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <i className="fas fa-envelope text-primary"></i>
                <span data-testid="text-email">{profile?.email || "vaibhavraok0123@gmail.com"}</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(profile?.linkedinUrl || "https://linkedin.com/in/vaibhav-k-3b826631a", "_blank")}
                className="w-12 h-12 bg-gray-700 text-white rounded-lg hover:bg-primary transition-colors"
                data-testid="button-linkedin"
              >
                <i className="fab fa-linkedin"></i>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(profile?.githubUrl || "https://github.com/vaibhavraok", "_blank")}
                className="w-12 h-12 bg-gray-700 text-white rounded-lg hover:bg-primary transition-colors"
                data-testid="button-github"
              >
                <i className="fab fa-github"></i>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center relative">
            <div className="relative">
              {/* Profile image with teal border */}
              <div className="w-80 h-80 rounded-full p-2 bg-gradient-to-br from-primary to-accent">
                <img 
                  src={profile?.profileImageUrl || profileImage}
                  alt="Vaibhav K Profile Picture" 
                  className="w-full h-full rounded-full object-cover shadow-2xl"
                  data-testid="img-profile"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
