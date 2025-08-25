import { useQuery } from "@tanstack/react-query"; 
import type { Profile } from "@shared/schema";

export default function AboutSection() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4" data-testid="text-about-title">
            About Me
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg" data-testid="text-about-subtitle">
            Passionate software developer with a strong foundation in AI & ML, dedicated to creating impactful solutions through technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Left Side: Professional Description */}
          <div className="md:col-span-2 text-gray-700 leading-relaxed space-y-4">
            <p>
              I am a passionate software developer with a strong foundation in Artificial Intelligence 
              and Machine Learning (AI & ML), driven by the vision of creating impactful solutions that 
              bridge technology with real-world needs.
            </p>
            <p>
              Currently pursuing my B.E. in Artificial Intelligence and Machine Learning at BITM, I thrive 
              on curiosity and problem-solving. My journey in technology has been shaped by hands-on projects, 
              ranging from event management systems to AI-powered applications, each reinforcing my expertise 
              in software architecture, scalability, and user experience.
            </p>
            <p>
              Proficient in Python, Java, C++, and JavaScript, I enjoy building full-stack applications and 
              experimenting with cutting-edge AI/ML techniques. I believe in continuous learning and actively 
              keep up with emerging trends in AI, ML, and software development to sharpen my skills.
            </p>
            <p>
              My ultimate goal is to contribute to innovative projects that harness the power of technology to 
              deliver meaningful impact, inspire progress, and solve challenges at scale.
            </p>
          </div>

          {/* Right Side: Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <i className="fas fa-bolt text-primary text-2xl mb-3"></i>
              <h4 className="font-semibold text-secondary mb-2">Quick Learner</h4>
              <p className="text-gray-600 text-sm">
                Adapt rapidly to emerging tools, frameworks, and technologies.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <i className="fas fa-brain text-primary text-2xl mb-3"></i>
              <h4 className="font-semibold text-secondary mb-2">AI & ML Focus</h4>
              <p className="text-gray-600 text-sm">
                Passionate about artificial intelligence and machine learning applications.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <i className="fas fa-lightbulb text-primary text-2xl mb-3"></i>
              <h4 className="font-semibold text-secondary mb-2">Problem Solver</h4>
              <p className="text-gray-600 text-sm">
                Analytical thinker with a structured approach to challenges.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <i className="fas fa-rocket text-primary text-2xl mb-3"></i>
              <h4 className="font-semibold text-secondary mb-2">Innovation</h4>
              <p className="text-gray-600 text-sm">
                Exploring creative ideas and leveraging technology for impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
