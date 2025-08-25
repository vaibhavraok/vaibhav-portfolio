import { useQuery } from "@tanstack/react-query";
import type { Skill } from "@shared/schema";
import { Star, Target, Users } from "lucide-react";

export default function SkillsSection() {
  const { data: skills } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  // Group skills by category
  const skillsByCategory = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>) || {};

  const categoryTitles: Record<string, string> = {
    programming: "Programming Languages",
    frontend: "Frontend",
    backend: "Backend", 
    database: "Databases",
    tools: "Frameworks & Tools",
    cloud: "Cloud Plathforms"
  };

  const softSkills = [
    {
      icon: Star,
      title: "Excellence-driven",
      description: "Committed to delivering high-quality results and continuous improvement"
    },
    {
      icon: Target,
      title: "Goal-oriented", 
      description: "Focused on achieving objectives with strategic planning and execution"
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "Effective team player with strong communication and interpersonal skills"
    }
  ];

  return (
    <section id="skills" className="py-16 bg-bg-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4" data-testid="text-skills-title">
            Skills & Expertise
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto" data-testid="text-skills-subtitle">
            A comprehensive skill set spanning multiple programming languages, frameworks, and essential soft skills for effective development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-code text-primary"></i>
              </div>
              <h3 className="text-2xl font-bold text-secondary" data-testid="text-technical-skills-title">
                Technical Skills
              </h3>
            </div>

            <div className="space-y-8">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                      <i className="fas fa-code text-white"></i>
                    </div>
                    <h4 className="text-lg font-semibold text-secondary" data-testid={`text-category-${category}`}>
                      {categoryTitles[category] || category}
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="flex flex-col items-center space-y-2 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        {skill.iconUrl && (
                          <img 
                            src={skill.iconUrl}
                            alt={skill.name}
                            className="w-10 h-10"
                            data-testid={`img-skill-${skill.id}`}
                          />
                        )}
                        <span className="text-sm font-medium text-center" data-testid={`text-skill-${skill.id}`}>
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-secondary" data-testid="text-soft-skills-title">
                Soft Skills
              </h3>
            </div>

            <div className="space-y-6">
              {softSkills.map((skill, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <skill.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-secondary mb-2" data-testid={`text-soft-skill-title-${index}`}>
                        {skill.title}
                      </h4>
                      <p className="text-gray-600" data-testid={`text-soft-skill-description-${index}`}>
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
