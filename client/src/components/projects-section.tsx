import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@shared/schema";

export default function ProjectsSection() {
  const { data: projects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Sort projects by featured and order
  const sortedProjects = projects?.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.order - b.order;
  }) || [];

  const getProjectIcon = (title: string) => {
    if (title.toLowerCase().includes("event")) return "calendar";
    if (title.toLowerCase().includes("game") || title.toLowerCase().includes("gamification")) return "gamepad";
    if (title.toLowerCase().includes("inventory")) return "cube";
    if (title.toLowerCase().includes("ecommerce") || title.toLowerCase().includes("e-commerce")) return "shopping-cart";
    if (title.toLowerCase().includes("finance")) return "chart-line";
    return "code";
  };

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4" data-testid="text-projects-title">
            Featured Projects
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" data-testid="text-projects-subtitle">
            A showcase of my development work, ranging from web applications to AI-powered solutions that demonstrate my technical expertise.
          </p>
        </div>
        
        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sortedProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
              data-testid={`card-project-${project.id}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <i className={`fas fa-${getProjectIcon(project.title)} text-primary text-xl`}></i>
                  </div>
                  {project.featured && (
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full" data-testid={`badge-featured-${project.id}`}>
                      Featured
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-secondary mb-3" data-testid={`text-project-title-${project.id}`}>
                  {project.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4" data-testid={`text-project-description-${project.id}`}>
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.map((tech, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs"
                      data-testid={`badge-tech-${project.id}-${index}`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  {project.codeUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(project.codeUrl, "_blank")}
                      className="flex-1 text-sm"
                      data-testid={`button-code-${project.id}`}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button
                      size="sm"
                      onClick={() => window.open(project.demoUrl, "_blank")}
                      className="flex-1 text-sm bg-primary hover:bg-accent"
                      data-testid={`button-demo-${project.id}`}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View More Projects Button */}
        <div className="text-center">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-secondary mb-2" data-testid="text-more-projects-title">
              Want to see more of my work?
            </h3>
          </div>
          <Button
            onClick={() => window.open("https://github.com/vaibhavraok", "_blank")}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors"
            data-testid="button-view-all-github"
          >
            <Github className="w-5 h-5 mr-2" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
