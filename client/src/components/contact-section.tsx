import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { sendContactEmail } from "@/lib/emailjs";
import type { Profile, InsertContact } from "@shared/schema";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      // Save to database
      const response = await apiRequest("POST", "/api/contact", data);
      
      // Send email via EmailJS
      await sendContactEmail({
        name: data.name,
        Email: data.email,
        subject: data.subject,
        message: data.message,
      });
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4" data-testid="text-contact-title">
            Let's Connect
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" data-testid="text-contact-subtitle">
            Ready to collaborate on exciting projects or discuss opportunities? I'd love to hear from you. Let's create something amazing together!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold text-secondary mb-6" data-testid="text-form-title">
              Send Me a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    className="w-full"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full"
                    data-testid="input-email"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="What's this about?"
                  className="w-full"
                  data-testid="input-subject"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full"
                  data-testid="textarea-message"
                />
              </div>
              
              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-accent transition-colors font-semibold"
                data-testid="button-send-message"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-secondary mb-6" data-testid="text-contact-info-title">
              Get In Touch
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Phone</div>
                  <div className="font-medium text-secondary" data-testid="text-phone">
                    {profile?.phone || "+91 7204372199"}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-medium text-secondary" data-testid="text-email">
                    {profile?.email || "vaibhavraok0123@gmail.com"}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Location</div>
                  <div className="font-medium text-secondary" data-testid="text-location">
                    Ballari, Karnataka, India
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-semibold text-secondary mb-4" data-testid="text-follow-title">
                Follow Me
              </h4>
              <div className="flex space-x-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.open(profile?.linkedinUrl || "https://linkedin.com/in/vaibhav-k-3b826631a", "_blank")}
                  className="w-12 h-12 bg-secondary text-white rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                  data-testid="button-linkedin"
                >
                  <i className="fab fa-linkedin"></i>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.open(profile?.githubUrl || "https://github.com/vaibhavraok", "_blank")}
                  className="w-12 h-12 bg-secondary text-white rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                  data-testid="button-github"
                >
                  <i className="fab fa-github"></i>
                </Button>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-semibold text-secondary" data-testid="text-response-title">
                  Quick Response Guarantee
                </span>
              </div>
              <p className="text-gray-600 text-sm" data-testid="text-response-description">
                I typically respond to all messages within 24 hours. For urgent inquiries, feel free to reach out directly via phone, LinkedIn 
                <span className="font-medium"> (linkedin.com/in/vaibhav-k-3b826631a)</span>, or GitHub 
                <span className="font-medium"> (github.com/vaibhavraok)</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
