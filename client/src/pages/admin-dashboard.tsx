import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
            <AdminSettingsManager />
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
    profileImageUrl: profile.profileImageUrl || "",
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
          <Label htmlFor="profileImageUrl">Profile Image URL</Label>
          <Input
            id="profileImageUrl"
            value={formData.profileImageUrl}
            onChange={(e) => setFormData({ ...formData, profileImageUrl: e.target.value })}
            data-testid="input-profile-image"
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
        <div className="md:col-span-2">
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
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Mutations
  const createProjectMutation = useMutation({
    mutationFn: async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
      const response = await apiRequest("POST", "/api/projects", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project created successfully" });
      setIsAddingProject(false);
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Project> & { id: string }) => {
      const response = await apiRequest("PUT", `/api/projects/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project updated successfully" });
      setEditingProject(null);
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project deleted successfully" });
    },
  });

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
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setEditingProject(project)}
                  data-testid={`button-edit-project-${project.id}`}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => deleteProjectMutation.mutate(project.id)}
                  disabled={deleteProjectMutation.isPending}
                  data-testid={`button-delete-project-${project.id}`}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <Button 
            className="w-full" 
            onClick={() => setIsAddingProject(true)}
            data-testid="button-add-project"
          >
            Add New Project
          </Button>
        </div>
      </CardContent>
      
      {/* Add/Edit Project Dialog */}
      <ProjectDialog
        project={editingProject}
        isOpen={!!editingProject || isAddingProject}
        onClose={() => {
          setEditingProject(null);
          setIsAddingProject(false);
        }}
        onSave={editingProject ? updateProjectMutation.mutate : createProjectMutation.mutate}
        isLoading={createProjectMutation.isPending || updateProjectMutation.isPending}
      />
    </Card>
  );
}

function ProjectDialog({ 
  project, 
  isOpen, 
  onClose, 
  onSave, 
  isLoading 
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [] as string[],
    codeUrl: "",
    demoUrl: "",
    featured: false,
    order: 0,
  });

  useState(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        technologies: project.technologies || [],
        codeUrl: project.codeUrl || "",
        demoUrl: project.demoUrl || "",
        featured: project.featured || false,
        order: project.order || 0,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        technologies: [],
        codeUrl: "",
        demoUrl: "",
        featured: false,
        order: 0,
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = project ? { id: project.id, ...formData } : formData;
    onSave(dataToSave);
  };

  const addTechnology = (tech: string) => {
    if (tech && !formData.technologies.includes(tech)) {
      setFormData({ ...formData, technologies: [...formData.technologies, tech] });
    }
  };

  const removeTechnology = (index: number) => {
    const newTechs = formData.technologies.filter((_, i) => i !== index);
    setFormData({ ...formData, technologies: newTechs });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add New Project"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="order">Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="codeUrl">Code URL</Label>
              <Input
                id="codeUrl"
                value={formData.codeUrl}
                onChange={(e) => setFormData({ ...formData, codeUrl: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="demoUrl">Demo URL</Label>
              <Input
                id="demoUrl"
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label>Technologies</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.technologies.map((tech, index) => (
                <Badge key={index} className="flex items-center gap-1">
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(index)}
                    className="ml-1 text-xs"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add technology"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechnology((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <Button
                type="button"
                onClick={(e) => {
                  const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                  addTechnology(input.value);
                  input.value = '';
                }}
              >
                Add
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
            />
            <Label htmlFor="featured">Featured Project</Label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SkillsManager({ skills }: { skills: Skill[] }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const createSkillMutation = useMutation({
    mutationFn: async (data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) => {
      const response = await apiRequest("POST", "/api/skills", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
      toast({ title: "Skill created successfully" });
      setIsAddingSkill(false);
    },
  });

  const updateSkillMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Skill> & { id: string }) => {
      const response = await apiRequest("PUT", `/api/skills/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
      toast({ title: "Skill updated successfully" });
      setEditingSkill(null);
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/skills/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
      toast({ title: "Skill deleted successfully" });
    },
  });

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-2">
                      {skill.iconUrl && (
                        <img 
                          src={skill.iconUrl} 
                          alt={skill.name} 
                          className="w-8 h-8" 
                          data-testid={`img-skill-icon-${skill.id}`}
                        />
                      )}
                      <div>
                        <span className="text-sm font-medium" data-testid={`text-skill-name-${skill.id}`}>
                          {skill.name}
                        </span>
                        <div className="text-xs text-gray-500">Level: {skill.level}/5</div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingSkill(skill)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteSkillMutation.mutate(skill.id)}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button 
            className="w-full" 
            onClick={() => setIsAddingSkill(true)}
            data-testid="button-add-skill"
          >
            Add New Skill
          </Button>
        </div>
      </CardContent>
      
      {/* Add/Edit Skill Dialog */}
      <SkillDialog
        skill={editingSkill}
        isOpen={!!editingSkill || isAddingSkill}
        onClose={() => {
          setEditingSkill(null);
          setIsAddingSkill(false);
        }}
        onSave={editingSkill ? updateSkillMutation.mutate : createSkillMutation.mutate}
        isLoading={createSkillMutation.isPending || updateSkillMutation.isPending}
      />
    </Card>
  );
}

function SkillDialog({ 
  skill, 
  isOpen, 
  onClose, 
  onSave, 
  isLoading 
}: {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "frontend",
    iconUrl: "",
    level: 3,
    order: 0,
  });

  useState(() => {
    if (skill) {
      setFormData({
        name: skill.name || "",
        category: skill.category || "frontend",
        iconUrl: skill.iconUrl || "",
        level: skill.level || 3,
        order: skill.order || 0,
      });
    } else {
      setFormData({
        name: "",
        category: "frontend",
        iconUrl: "",
        level: 3,
        order: 0,
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = skill ? { id: skill.id, ...formData } : formData;
    onSave(dataToSave);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{skill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
                <SelectItem value="cloud">Cloud Platforms</SelectItem>
                <SelectItem value="soft">Soft Skills</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="iconUrl">Icon URL</Label>
            <Input
              id="iconUrl"
              value={formData.iconUrl}
              onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="level">Level (1-5)</Label>
              <Input
                id="level"
                type="number"
                min="1"
                max="5"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) || 3 })}
              />
            </div>
            <div>
              <Label htmlFor="order">Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AchievementsManager({ achievements }: { achievements: Achievement[] }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [isAddingAchievement, setIsAddingAchievement] = useState(false);

  const createAchievementMutation = useMutation({
    mutationFn: async (data: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>) => {
      const response = await apiRequest("POST", "/api/achievements", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
      toast({ title: "Achievement created successfully" });
      setIsAddingAchievement(false);
    },
  });

  const updateAchievementMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Achievement> & { id: string }) => {
      const response = await apiRequest("PUT", `/api/achievements/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
      toast({ title: "Achievement updated successfully" });
      setEditingAchievement(null);
    },
  });

  const deleteAchievementMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/achievements/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
      toast({ title: "Achievement deleted successfully" });
    },
  });

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
                  <Badge variant="secondary">
                    {achievement.issuer}
                  </Badge>
                  {achievement.verified && (
                    <Badge variant="secondary" data-testid={`badge-achievement-verified-${achievement.id}`}>
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setEditingAchievement(achievement)}
                  data-testid={`button-edit-achievement-${achievement.id}`}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => deleteAchievementMutation.mutate(achievement.id)}
                  data-testid={`button-delete-achievement-${achievement.id}`}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <Button 
            className="w-full"
            onClick={() => setIsAddingAchievement(true)}
            data-testid="button-add-achievement"
          >
            Add New Achievement
          </Button>
        </div>
      </CardContent>
      
      {/* Add/Edit Achievement Dialog */}
      <AchievementDialog
        achievement={editingAchievement}
        isOpen={!!editingAchievement || isAddingAchievement}
        onClose={() => {
          setEditingAchievement(null);
          setIsAddingAchievement(false);
        }}
        onSave={editingAchievement ? updateAchievementMutation.mutate : createAchievementMutation.mutate}
        isLoading={createAchievementMutation.isPending || updateAchievementMutation.isPending}
      />
    </Card>
  );
}

function AchievementDialog({ 
  achievement, 
  isOpen, 
  onClose, 
  onSave, 
  isLoading 
}: {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "certificate",
    issuer: "",
    certificateUrl: "",
    verified: true,
    achievedAt: "",
  });

  useEffect(() => {
  if (isOpen) {   
    if (achievement) {
      setFormData({
        title: achievement.title ?? "",
        description: achievement.description ?? "",
        type: achievement.type ?? "certificate",
        issuer: achievement.issuer ?? "",
        certificateUrl: achievement.certificateUrl ?? "",
        verified: achievement.verified ?? true,
        achievedAt: achievement.achievedAt
          ? new Date(achievement.achievedAt).toISOString().split("T")[0]
          : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        type: "certificate",
        issuer: "",
        certificateUrl: "",
        verified: true,
        achievedAt: "",
      });
    }
  }
}, [achievement, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = achievement ? { id: achievement.id, ...formData } : formData;
    onSave(dataToSave);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{achievement ? "Edit Achievement" : "Add New Achievement"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="certificate">Certificate</SelectItem>
                  <SelectItem value="award">Award</SelectItem>
                  <SelectItem value="competition">Competition</SelectItem>
                  <SelectItem value="course">Course</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="issuer">Issuer</Label>
              <Input
                id="issuer"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="certificateUrl">Certificate URL</Label>
              <Input
                id="certificateUrl"
                value={formData.certificateUrl}
                onChange={(e) => setFormData({ ...formData, certificateUrl: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="achievedAt">Achieved Date</Label>
              <Input
                id="achievedAt"
                type="date"
                value={formData.achievedAt}
                onChange={(e) => setFormData({ ...formData, achievedAt: e.target.value })}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="verified"
              checked={formData.verified}
              onCheckedChange={(checked) => setFormData({ ...formData, verified: !!checked })}
            />
            <Label htmlFor="verified">Verified Achievement</Label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ContactsManager({ contacts }: { contacts: Contact[] }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateContactMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Contact> & { id: string }) => {
      const response = await apiRequest("PUT", `/api/contacts/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      toast({ title: "Contact updated successfully" });
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/contacts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      toast({ title: "Contact deleted successfully" });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contacts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No contact messages yet.</p>
          ) : (
            contacts.map((contact) => (
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
                <p className="text-gray-700 mb-3" data-testid={`text-contact-message-${contact.id}`}>
                  {contact.message}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Received: {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : 'Unknown'}
                </p>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`mailto:${contact.email}?subject=Re: ${contact.subject}`, '_blank')}
                    data-testid={`button-reply-contact-${contact.id}`}
                  >
                    Reply via Email
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => updateContactMutation.mutate({ id: contact.id, replied: true })}
                    data-testid={`button-mark-replied-${contact.id}`}
                  >
                    Mark as Replied
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => deleteContactMutation.mutate(contact.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function AdminSettingsManager() {
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    currentUsername: "",
    currentPassword: "",
    newUsername: "",
    newPassword: "",
    confirmPassword: "",
  });

  const updateCredentialsMutation = useMutation({
    mutationFn: async (data: { username: string; password: string; newUsername: string; newPassword: string }) => {
      const response = await apiRequest("PUT", "/api/admin/credentials", data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Admin credentials updated successfully" });
      setCredentials({
        currentUsername: "",
        currentPassword: "",
        newUsername: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
  });

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credentials.newPassword !== credentials.confirmPassword) {
      toast({ title: "New passwords don't match", variant: "destructive" });
      return;
    }

    updateCredentialsMutation.mutate({
      username: credentials.currentUsername,
      password: credentials.currentPassword,
      newUsername: credentials.newUsername,
      newPassword: credentials.newPassword,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Update Admin Credentials</h3>
            <form onSubmit={handleUpdateCredentials} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentUsername">Current Username</Label>
                  <Input
                    id="currentUsername"
                    value={credentials.currentUsername}
                    onChange={(e) => setCredentials({ ...credentials, currentUsername: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={credentials.currentPassword}
                    onChange={(e) => setCredentials({ ...credentials, currentPassword: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newUsername">New Username</Label>
                  <Input
                    id="newUsername"
                    value={credentials.newUsername}
                    onChange={(e) => setCredentials({ ...credentials, newUsername: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={credentials.newPassword}
                    onChange={(e) => setCredentials({ ...credentials, newPassword: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={credentials.confirmPassword}
                  onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={updateCredentialsMutation.isPending}
                data-testid="button-update-credentials"
              >
                {updateCredentialsMutation.isPending ? "Updating..." : "Update Credentials"}
              </Button>
            </form>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">System Information</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Portfolio Management System</p>
              <p>Version: 1.0.0</p>
              <p>Last Updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}