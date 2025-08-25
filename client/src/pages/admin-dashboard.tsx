import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Profile, Project, Skill, Achievement, Contact } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch data
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const { data: projects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: skills } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const { data: achievements } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

  const { data: contacts } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  // Profile update mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: Partial<Profile>) => {
      const response = await apiRequest("PUT", "/api/profile", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({ title: "Profile updated successfully" });
    },
  });

  const handleLogout = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-testid="title-admin-dashboard">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage your portfolio content</p>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              Back to Site
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              data-testid="button-back-to-site"
            >
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile" data-testid="tab-profile">Profile</TabsTrigger>
            <TabsTrigger value="projects" data-testid="tab-projects">Projects</TabsTrigger>
            <TabsTrigger value="skills" data-testid="tab-skills">Skills</TabsTrigger>
            <TabsTrigger value="achievements" data-testid="tab-achievements">Achievements</TabsTrigger>
            <TabsTrigger value="contacts" data-testid="tab-contacts">Contacts</TabsTrigger>
            <TabsTrigger value="settings" data-testid="tab-settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile && (
                  <ProfileForm 
                    profile={profile} 
                    onUpdate={updateProfileMutation.mutate}
                    isLoading={updateProfileMutation.isPending}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <ProjectsManager projects={projects || []} />
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <SkillsManager skills={skills || []} />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <AchievementsManager achievements={achievements || []} />
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <ContactsManager contacts={contacts || []} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-600">
                  Admin credentials and other settings can be managed here.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ProfileForm({ 
  profile, 
  onUpdate, 
  isLoading 
}: { 
  profile: Profile; 
  onUpdate: (data: Partial<Profile>) => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    name: profile.name || "",
    email: profile.email || "",
    phone: profile.phone || "",
    bio: profile.bio || "",
    linkedinUrl: profile.linkedinUrl || "",
    githubUrl: profile.githubUrl || "",
    resumeUrl: profile.resumeUrl || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            data-testid="input-name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            data-testid="input-email"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            data-testid="input-phone"
          />
        </div>
        <div>
          <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
          <Input
            id="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
            data-testid="input-linkedin"
          />
        </div>
        <div>
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input
            id="githubUrl"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            data-testid="input-github"
          />
        </div>
        <div>
          <Label htmlFor="resumeUrl">Resume URL</Label>
          <Input
            id="resumeUrl"
            value={formData.resumeUrl}
            onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
            data-testid="input-resume"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
          data-testid="textarea-bio"
        />
      </div>
      <Button 
        type="submit" 
        disabled={isLoading}
        data-testid="button-save-profile"
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}

function ProjectsManager({ projects }: { projects: Project[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold" data-testid={`text-project-title-${project.id}`}>
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm" data-testid={`text-project-description-${project.id}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies?.map((tech, index) => (
                    <Badge key={index} variant="secondary" data-testid={`badge-tech-${project.id}-${index}`}>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" data-testid={`button-edit-project-${project.id}`}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" data-testid={`button-delete-project-${project.id}`}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <Button className="w-full" data-testid="button-add-project">
            Add New Project
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SkillsManager({ skills }: { skills: Skill[] }) {
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="font-semibold mb-3 capitalize" data-testid={`text-category-${category}`}>
                {category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-2 p-2 border rounded">
                    {skill.iconUrl && (
                      <img 
                        src={skill.iconUrl} 
                        alt={skill.name} 
                        className="w-6 h-6" 
                        data-testid={`img-skill-icon-${skill.id}`}
                      />
                    )}
                    <span className="text-sm" data-testid={`text-skill-name-${skill.id}`}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button className="w-full" data-testid="button-add-skill">
            Add New Skill
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AchievementsManager({ achievements }: { achievements: Achievement[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold" data-testid={`text-achievement-title-${achievement.id}`}>
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-sm" data-testid={`text-achievement-description-${achievement.id}`}>
                  {achievement.description}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge data-testid={`badge-achievement-type-${achievement.id}`}>
                    {achievement.type}
                  </Badge>
                  {achievement.verified && (
                    <Badge variant="secondary" data-testid={`badge-achievement-verified-${achievement.id}`}>
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" data-testid={`button-edit-achievement-${achievement.id}`}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" data-testid={`button-delete-achievement-${achievement.id}`}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <Button className="w-full" data-testid="button-add-achievement">
            Add New Achievement
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactsManager({ contacts }: { contacts: Contact[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold" data-testid={`text-contact-name-${contact.id}`}>
                  {contact.name}
                </h3>
                <Badge 
                  variant={contact.replied ? "default" : "secondary"}
                  data-testid={`badge-contact-status-${contact.id}`}
                >
                  {contact.replied ? "Replied" : "New"}
                </Badge>
              </div>
              <p className="text-gray-600 text-sm mb-2" data-testid={`text-contact-email-${contact.id}`}>
                {contact.email}
              </p>
              <p className="font-medium mb-2" data-testid={`text-contact-subject-${contact.id}`}>
                {contact.subject}
              </p>
              <p className="text-gray-700" data-testid={`text-contact-message-${contact.id}`}>
                {contact.message}
              </p>
              <div className="flex space-x-2 mt-3">
                <Button variant="outline" size="sm" data-testid={`button-reply-contact-${contact.id}`}>
                  Reply
                </Button>
                <Button variant="outline" size="sm" data-testid={`button-mark-replied-${contact.id}`}>
                  Mark as Replied
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
