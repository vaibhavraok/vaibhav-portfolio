import { 
  users, profile, projects, skills, achievements, contacts, adminSettings,
  type User, type InsertUser, type Profile, type InsertProfile, 
  type Project, type InsertProject, type Skill, type InsertSkill, 
  type Achievement, type InsertAchievement, type Contact, type InsertContact,
  type AdminSettings, type InsertAdminSettings
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  updateUserCredentials(id: string, credentials: { username: string; password: string }): Promise<User>;
  
  // Profile methods
  getProfile(): Promise<Profile | undefined>;
  updateProfile(profileData: InsertProfile): Promise<Profile>;
  
  // Project methods
  getProjects(): Promise<Project[]>;
  createProject(projectData: InsertProject): Promise<Project>;
  updateProject(id: string, projectData: InsertProject): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  
  // Skill methods
  getSkills(): Promise<Skill[]>;
  createSkill(skillData: InsertSkill): Promise<Skill>;
  updateSkill(id: string, skillData: InsertSkill): Promise<Skill>;
  deleteSkill(id: string): Promise<void>;
  
  // Achievement methods
  getAchievements(): Promise<Achievement[]>;
  createAchievement(achievementData: InsertAchievement): Promise<Achievement>;
  updateAchievement(id: string, achievementData: InsertAchievement): Promise<Achievement>;
  deleteAchievement(id: string): Promise<void>;
  
  // Contact methods
  createContact(contactData: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  updateContact(id: string, contactData: Partial<Contact>): Promise<Contact>;
  deleteContact(id: string): Promise<void>;
  
  // Admin settings methods
  getAdminSettings(): Promise<AdminSettings[]>;
  updateAdminSetting(key: string, value: string): Promise<AdminSettings>;
}

// rewrite MemStorage to DatabaseStorage
export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async updateUserCredentials(id: string, credentials: { username: string; password: string }): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ username: credentials.username, password: credentials.password })
      .where(eq(users.id, id))
      .returning();
    return user;
  }
  
  // Profile methods
  async getProfile(): Promise<Profile | undefined> {
    const [profileData] = await db.select().from(profile).limit(1);
    return profileData || undefined;
  }
  
  async updateProfile(profileData: InsertProfile): Promise<Profile> {
    // First try to get existing profile
    const existing = await this.getProfile();
    
    if (existing) {
      const [updated] = await db
        .update(profile)
        .set({ ...profileData, updatedAt: new Date() })
        .where(eq(profile.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(profile)
        .values(profileData)
        .returning();
      return created;
    }
  }
  
  // Project methods
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(projects.order);
  }
  
  async createProject(projectData: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(projectData)
      .returning();
    return project;
  }
  
  async updateProject(id: string, projectData: InsertProject): Promise<Project> {
    const [project] = await db
      .update(projects)
      .set({ ...projectData, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project;
  }
  
  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }
  
  // Skill methods
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills).orderBy(skills.category, skills.order);
  }
  
  async createSkill(skillData: InsertSkill): Promise<Skill> {
    const [skill] = await db
      .insert(skills)
      .values(skillData)
      .returning();
    return skill;
  }
  
  async updateSkill(id: string, skillData: InsertSkill): Promise<Skill> {
    const [skill] = await db
      .update(skills)
      .set(skillData)
      .where(eq(skills.id, id))
      .returning();
    return skill;
  }
  
  async deleteSkill(id: string): Promise<void> {
    await db.delete(skills).where(eq(skills.id, id));
  }
  
  // Achievement methods
  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements).orderBy(achievements.achievedAt);
  }
  
  async createAchievement(achievementData: InsertAchievement): Promise<Achievement> {
    const [achievement] = await db
      .insert(achievements)
      .values(achievementData)
      .returning();
    return achievement;
  }
  
  async updateAchievement(id: string, achievementData: InsertAchievement): Promise<Achievement> {
    const [achievement] = await db
      .update(achievements)
      .set(achievementData)
      .where(eq(achievements.id, id))
      .returning();
    return achievement;
  }
  
  async deleteAchievement(id: string): Promise<void> {
    await db.delete(achievements).where(eq(achievements.id, id));
  }
  
  // Contact methods
  async createContact(contactData: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(contactData)
      .returning();
    return contact;
  }
  
  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(contacts.createdAt);
  }
  
  async updateContact(id: string, contactData: Partial<Contact>): Promise<Contact> {
    const [contact] = await db
      .update(contacts)
      .set(contactData)
      .where(eq(contacts.id, id))
      .returning();
    return contact;
  }
  
  async deleteContact(id: string): Promise<void> {
    await db.delete(contacts).where(eq(contacts.id, id));
  }
  
  // Admin settings methods
  async getAdminSettings(): Promise<AdminSettings[]> {
    return await db.select().from(adminSettings);
  }
  
  async updateAdminSetting(key: string, value: string): Promise<AdminSettings> {
    const existing = await db.select().from(adminSettings).where(eq(adminSettings.key, key)).limit(1);
    
    if (existing.length > 0) {
      const [updated] = await db
        .update(adminSettings)
        .set({ value, updatedAt: new Date() })
        .where(eq(adminSettings.key, key))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(adminSettings)
        .values({ key, value })
        .returning();
      return created;
    }
  }
}

export const storage = new DatabaseStorage();