import { useQuery } from "@tanstack/react-query";
import type { Profile } from "@shared/schema";

export default function AboutSection() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const careerObjectives = [
    {
      number: 1,
      title: "Entry-level Position",
      description: "Secure a software developer role to apply and grow my technical skills in a professional environment."
    },
    {
      number: 2,
      title: "Skill Enhancement",
      description: "Continuously learn modern technologies, frameworks, and best practices in software development."
    },
    {
      number: 3,
      title: "Impact Projects",
      description: "Contribute to meaningful projects that solve real-world problems and create positive impact."
    }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4" data-testid="text-about-title">
            About Me
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" data-testid="text-about-subtitle">
            Always learning, always building. I create innovative solutions that bridge technology and human needs.
          </p>
        </div>
        
        {/* Career Objectives */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-secondary mb-8" data-testid="text-objectives-title">
            Career Objectives
          </h3>
          <div className="space-y-8">
            {careerObjectives.map((objective) => (
              <div key={objective.number} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold" data-testid={`badge-objective-${objective.number}`}>
                  {objective.number}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-secondary mb-2" data-testid={`text-objective-title-${objective.number}`}>
                    {objective.title}
                  </h4>
                  <p className="text-gray-600" data-testid={`text-objective-description-${objective.number}`}>
                    {objective.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
