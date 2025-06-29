"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Rocket, Loader2 } from "lucide-react"
import { useAuth } from "@/providers/AuthProvider"
import { registerAgent } from "@/services/agentService"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function RegisterAgentPage() {
    const router = useRouter();
    const { token } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        technicalDescription: "",
        specialty: "",
        useCases: "",
        url: "",
        price: "",
        image: null as File | null,
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!token) {
            toast.error("You need to be logged in to register an agent.");
            router.push('/login');
            return;
        }

        setIsSubmitting(true);

        try {
            const apiData = {
                name: formData.name,
                description: formData.technicalDescription,
                specialty: formData.specialty,
                useCases: formData.useCases,
                endpoint: formData.url,
                pricePerCall: formData.price,
                image: formData.image,
            };

            const result = await registerAgent(apiData, token);

            toast.success(`Agent "${result.name}" registered successfully!`);
            router.push('/dashboard');

        } catch (error: any) {
            console.error("Error registering agent:", error);
            toast.error(error.message || "An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16 max-w-2xl">
                {/* Header */}
                <div className="text mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Agent Registration</h1>
                    <p className="text-gray-400 text-lg">
                        Describe your agent so buyers can easily find it.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Agent Name */}
                    <div className="space-y-3">
                        <Label htmlFor="name" className="text-white text-xl font-semibold">Agent Name</Label>
                        <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} className="!bg-[#1E1E1E] border-zinc-700 text-white h-14" placeholder="E.g.: Contract Analyzer" required />
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <Label htmlFor="technicalDescription" className="text-white text-xl font-semibold">Description</Label>
                        <Textarea id="technicalDescription" value={formData.technicalDescription} onChange={(e) => handleInputChange("technicalDescription", e.target.value)} className="!bg-[#1E1E1E] border-zinc-700 text-white min-h-32" placeholder="Describe your agent's features." required />
                    </div>
                    
                    {/* Specialty */}
                    <div className="space-y-3">
                        <Label htmlFor="specialty" className="text-white text-xl font-semibold">Specialty</Label>
                        <Input id="specialty" value={formData.specialty} onChange={(e) => handleInputChange("specialty", e.target.value)} className="!bg-[#1E1E1E] border-zinc-700 text-white h-14" placeholder="E.g.: Law, Finance, Marketing" required />
                    </div>

                    {/* Use Cases */}
                    <div className="space-y-3">
                        <Label htmlFor="useCases" className="text-white text-xl font-semibold">Use Cases</Label>
                        <Textarea id="useCases" value={formData.useCases} onChange={(e) => handleInputChange("useCases", e.target.value)} className="!bg-[#1E1E1E] border-zinc-700 text-white min-h-32" placeholder="List the main use cases separated by commas. E.g.: Contract Analysis, Clause Verification" required />
                    </div>

                    {/* Agent URL */}
                    <div className="space-y-3">
                        <Label htmlFor="url" className="text-white text-xl font-semibold">Endpoint URL</Label>
                        <Input id="url" type="url" value={formData.url} onChange={(e) => handleInputChange("url", e.target.value)} className="!bg-[#1E1E1E] border-zinc-700 text-white h-14" placeholder="https://your-agent.com/api" required />
                    </div>
                    
                    {/* Price */}
                    <div className="space-y-3">
                        <Label htmlFor="price" className="text-white text-xl font-semibold">Price per Call</Label>
                        <Input id="price" type="number" step="0.01" value={formData.price} onChange={(e) => handleInputChange("price", e.target.value)} className="!bg-[#1E1E1E] border-zinc-700 text-white h-14" placeholder="0.05" required />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-4">
                        <Label className="text-white text-xl font-semibold text-center block">Agent Image (Optional)</Label>
                        <div className="flex justify-center">
                            <label htmlFor="image-upload" className="cursor-pointer group">
                                <div className="w-48 h-48 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors border-2 border-dashed border-zinc-600 group-hover:border-primary">
                                    {formData.image ? (
                                        <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-full h-full object-cover rounded-full" />
                                    ) : (
                                        <Plus className="w-12 h-12 text-zinc-500 group-hover:text-zinc-400" />
                                    )}
                                </div>
                                <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                        </div>
                    </div>

                    {/* Register Button */}
                    <div className="pt-10 flex justify-center">
                        <Button
                            type="submit"
                            variant="outline"
                            className="w-full max-w-md h-14 text-lg !border-primary text-white hover:bg-primary/10 hover:text-primary rounded-full flex items-center justify-center font-semibold"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <Rocket className="mr-3 h-5 w-5" />
                            )}
                            {isSubmitting ? "Registering..." : "Register Agent"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
