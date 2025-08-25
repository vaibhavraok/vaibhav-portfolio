import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { Profile } from "@shared/schema";
import profileImage from "@assets/ed9f128e-e302-42ab-8539-f07709a01b25_1756109968757.jpg";

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
    <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4" data-testid="text-hero-title">
              Hi, I'm <span className="text-primary">{profile?.name || "Vaibhav K"}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-6" data-testid="text-hero-description">
              {profile?.bio || "Full Stack Developer passionate about AI & ML, creating innovative solutions that bridge technology and human needs."}
            </p>
            <div className="flex space-x-4">
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors"
                data-testid="button-view-work"
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
                data-testid="button-get-in-touch"
              >
                Get In Touch
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src={profile?.profileImageUrl || profileImage}
              alt="Vaibhav K Profile Picture" 
              className="w-80 h-80 rounded-full shadow-2xl object-cover border-8 border-white"
              data-testid="img-profile"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
