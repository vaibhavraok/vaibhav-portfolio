import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle } from "lucide-react";
import type { Achievement } from "@shared/schema";

export default function EducationSection() {
  const { data: achievements } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

  const getAchievementIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "certificate":
        return "certificate";
      case "award":
        return "trophy";
      case "competition":
        return "star";
      default:
        return "award";
    }
  };

  return (
    <section id="education" className="py-16 bg-bg-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4" data-testid="text-education-title">
            Achievements & Certifications
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" data-testid="text-education-subtitle">
            Recognition of technical excellence, competitive achievements, and professional certifications that demonstrate continuous learning and skill development.
          </p>
        </div>
        
        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {achievements?.map((achievement) => (
            <div 
              key={achievement.id}
              className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
              data-testid={`card-achievement-${achievement.id}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className={`fas fa-${getAchievementIcon(achievement.type)} text-blue-600 text-xl`}></i>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800" data-testid={`badge-type-${achievement.id}`}>
                      {achievement.type}
                    </Badge>
                    {achievement.verified && (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-xs" data-testid={`badge-verified-${achievement.id}`}>
                          Verified
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-secondary mb-3" data-testid={`text-achievement-title-${achievement.id}`}>
                  {achievement.title}
                </h3>
                
                {achievement.description && (
                  <p className="text-gray-600 text-sm mb-4" data-testid={`text-achievement-description-${achievement.id}`}>
                    {achievement.description}
                  </p>
                )}
                
                {achievement.issuer && (
                  <p className="text-gray-500 text-xs mb-4" data-testid={`text-achievement-issuer-${achievement.id}`}>
                    Issued by: {achievement.issuer}
                  </p>
                )}
                
                {achievement.certificateUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(achievement.certificateUrl || "", "_blank")}
                    className="w-full"
                    data-testid={`button-certificate-${achievement.id}`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Certificate
                  </Button>
                )}
              </div>
            </div>
          )) || []}
        </div>
        
        {/* Ready for New Challenges Section */}
        <div className="bg-secondary py-16 rounded-2xl">
          <div className="text-center text-white">
            <h3 className="text-2xl font-bold mb-4" data-testid="text-challenges-title">
              Ready for New Challenges
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8" data-testid="text-challenges-description">
              These achievements reflect my dedication to excellence and continuous improvement. I'm excited to bring this mindset to new opportunities and make meaningful contributions to innovative projects.
            </p>
            <div className="flex flex-wrap justify-center space-x-8">
              <div className="flex items-center space-x-2 mb-4" data-testid="trait-excellence">
                <i className="fas fa-star text-primary"></i>
                <span>Excellence-driven</span>
              </div>
              <div className="flex items-center space-x-2 mb-4" data-testid="trait-goal-oriented">
                <i className="fas fa-bullseye text-primary"></i>
                <span>Goal-oriented</span>
              </div>
              <div className="flex items-center space-x-2 mb-4" data-testid="trait-collaborative">
                <i className="fas fa-users text-primary"></i>
                <span>Collaborative</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
