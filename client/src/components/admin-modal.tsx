import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "./navigation";

export default function AdminModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const loginMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const response = await apiRequest("POST", "/api/auth/login", data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Login successful" });
      setIsOpen(false);
      setLocation("/admin");
    },
    onError: () => {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(credentials);
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Navigation onAdminClick={() => setIsOpen(true)} />
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle data-testid="text-admin-modal-title">
              Admin Login
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="adminUsername" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </Label>
              <Input
                id="adminUsername"
                type="text"
                value={credentials.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                placeholder="Enter admin username"
                className="w-full"
                data-testid="input-admin-username"
              />
            </div>
            
            <div>
              <Label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </Label>
              <Input
                id="adminPassword"
                type="password"
                value={credentials.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Enter admin password"
                className="w-full"
                data-testid="input-admin-password"
              />
            </div>
            
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-accent transition-colors"
              data-testid="button-admin-login"
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
