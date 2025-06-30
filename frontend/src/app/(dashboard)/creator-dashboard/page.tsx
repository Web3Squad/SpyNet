"use client";

import { useEffect, useState } from "react"; 
import { useAuth } from "@/providers/AuthProvider";
import StatCard from "@/components/features/dashboard/StatCard";
import AgentList from "@/components/features/dashboard/AgentList";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UploadCloud } from "lucide-react";
import { getCreatorDashboardData } from "@/services/dashboardService";
import { registerAgent } from "@/services/agentService";
import type { CreatorDashboardData } from "@/types";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function CreatorDashboardPage() {
  const { token } = useAuth();
  const [dashboardData, setDashboardData] = useState<CreatorDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados para o formulário de criação de agente
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
      name: "",
      description: "",
      specialty: "",
      useCases: "",
      endpoint: "",
      pricePerCall: "",
      image: null as File | null,
  });

  // Função para buscar os dados do dashboard
  const fetchDashboardData = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    if (!isLoading) setIsLoading(true);
    try {
      const data = await getCreatorDashboardData(token);
      setDashboardData(data);
    } catch (error) {
      console.error("Failed to fetch creator dashboard data:", error);
      toast.error("Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  // Funções para controlar o formulário do modal
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  // Função para submeter o novo agente para a API
  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Authentication required to create an agent.");
      return;
    }
    setIsSubmitting(true);
    try {
      await registerAgent(formData, token);
      toast.success("Agent created successfully!");
      setIsDialogOpen(false); // Fecha o modal
      fetchDashboardData(); // Atualiza os dados do dashboard para mostrar o novo agente
    } catch (error: any) {
      toast.error(error.message || "Failed to create agent.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  if (!dashboardData) {
    return <div className="text-center text-neutral-400">Could not load dashboard data. Please try again later.</div>
  }

  return (
    <div className="space-y-12">
      {/* Seção do Cabeçalho */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">Agent Control</h1>
        <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-lg">
          <span className="text-neutral-400">Active Agents</span>
          <span className="bg-zinc-700 text-white text-sm font-bold px-2 py-1 rounded">{dashboardData.myAgents.length}</span>
        </div>
      </div>

      {/* Seção de Estatísticas com dados dinâmicos */}
      {/* CORREÇÃO: Removida a div de grid duplicada e props ajustadas para 'children' */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard 
          title="Accumulated Revenue" 
          chartData={dashboardData.chartData.revenue} 
        >
          <p className="text-4xl font-bold text-white">${dashboardData.summary.accumulatedRevenue}</p>
        </StatCard>
        
        <StatCard 
          title="Total Queries" 
          chartData={dashboardData.chartData.queries} 
        >
          <p className="text-4xl font-bold text-white">{dashboardData.summary.totalQueries}</p>
        </StatCard>

        <StatCard 
          title="Average Score" 
          chartData={dashboardData.chartData.score} 
        >
          <p className="text-4xl font-bold text-white">{dashboardData.summary.averageScore}</p>
        </StatCard>
      </div>

      {/* Seção da Lista de Agentes */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">My Agents</h2>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="!border-primary text-white text-lg hover:bg-primary/10 hover:text-primary rounded-lg px-8 py-5">
                Create Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-zinc-900 border-zinc-800 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl">Create New Agent</DialogTitle>
                <DialogDescription>Fill in the details to register a new AI agent.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateAgent} className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" onChange={handleInputChange} placeholder="e.g., Contract Analyzer" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" onChange={handleInputChange} placeholder="Describe what your agent does." required />
                </div>
                <div className="space-y-2">
                  <Label>Agent Image (Optional)</Label>
                  <label htmlFor="image-upload-modal" className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-zinc-700 border-dashed rounded-lg cursor-pointer bg-zinc-800/50 hover:bg-zinc-800">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Image Preview" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-neutral-400">
                        <UploadCloud className="w-8 h-8 mb-4" />
                        <p className="mb-2 text-sm">Click to upload or drag and drop</p>
                        <p className="text-xs">PNG, JPG or GIF</p>
                      </div>
                    )}
                    <Input id="image-upload-modal" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input id="specialty" onChange={handleInputChange} placeholder="e.g., Legal, Finance" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricePerCall">Price per Call ($)</Label>
                    <Input id="pricePerCall" type="number" step="0.001" min="0" onChange={handleInputChange} placeholder="0.05" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endpoint">Endpoint URL</Label>
                  <Input id="endpoint" type="url" onChange={handleInputChange} placeholder="https://your-agent-api.com/process" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="useCases">Use Cases</Label>
                  <Textarea id="useCases" onChange={handleInputChange} placeholder="Describe the main use cases, separated by commas." required />
                </div>
                <DialogFooter className="pt-4 bg-zinc-900">
                  <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Agent
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <AgentList agents={dashboardData.myAgents} />
      </div>
    </div>
  );
}