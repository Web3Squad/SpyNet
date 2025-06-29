"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Rocket } from "lucide-react"

export default function RegisterAgentPage() {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form data:", formData)
        // Here you would implement the submit logic
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16 max-w-2xl">
                {/* Header */}
                <div className="text mb-12">
                    <h1 className="text-5xl md:text-5xl font-bold text-white mb-6">Agent Registration</h1>
                    <p className="text-gray-400 text-xl">
                        Describe your agent so buyers can easily find it
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Agent Name */}
                    <div className="space-y-3">
                        <Label htmlFor="name" className="text-white text-2xl font-semibold">
                            Agent Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="!bg-[#1E1E1E] border-zinc-700 text-white placeholder:text-gray-500 h-20 text-2xl rounded-[25px]"
                            placeholder="Enter your agent's name"
                            required
                        />
                    </div>

                    {/* Technical Description */}
                    <div className="space-y-3">
                        <Label htmlFor="technicalDescription" className="text-white text-2xl font-semibold">
                            Technical Description
                        </Label>
                        <Textarea
                            id="technicalDescription"
                            value={formData.technicalDescription}
                            onChange={(e) => handleInputChange("technicalDescription", e.target.value)}
                            className="!bg-[#1E1E1E] border-zinc-700 text-white placeholder:text-gray-500 min-h-40 text-2xl rounded-[25px] resize-none"
                            placeholder="Describe your agent's technical features"
                            required
                        />
                    </div>

                    {/* Specialty */}
                    <div className="space-y-3">
                        <Label htmlFor="specialty" className="text-white text-2xl font-semibold">
                            Specialty
                        </Label>
                        <Textarea
                            id="specialty"
                            value={formData.specialty}
                            onChange={(e) => handleInputChange("specialty", e.target.value)}
                            className="!bg-[#1E1E1E] border-zinc-700 text-white placeholder:text-gray-500 min-h-32 text-2xl rounded-[25px] resize-none"
                            placeholder="What is your agent's specialty?"
                            required
                        />
                    </div>

                    {/* Use Cases */}
                    <div className="space-y-3">
                        <Label htmlFor="useCases" className="text-white text-2xl font-semibold">
                            Use Cases
                        </Label>
                        <Textarea
                            id="useCases"
                            value={formData.useCases}
                            onChange={(e) => handleInputChange("useCases", e.target.value)}
                            className="!bg-[#1E1E1E] border-zinc-700 text-white placeholder:text-gray-500 min-h-32 text-2xl rounded-[25px] resize-none"
                            placeholder="Describe the main use cases"
                            required
                        />
                    </div>

                    {/* Agent URL */}
                    <div className="space-y-3">
                        <Label htmlFor="url" className="text-white text-2xl font-semibold">
                            Agent URL
                        </Label>
                        <Input
                            id="url"
                            type="url"
                            value={formData.url}
                            onChange={(e) => handleInputChange("url", e.target.value)}
                            className="!bg-[#1E1E1E] border-zinc-700 text-white placeholder:text-gray-500 h-20 text-2xl rounded-[25px] focus:border-primary focus:ring-primary"
                            placeholder="https://your-agent.com"
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-3">
                        <div className="flex justify-center">
                            <Label className="text-white text-2xl font-semibold text-center">
                                Upload an Agent Image
                            </Label>
                        </div>
                        <div className="flex justify-center">
                            <label htmlFor="image-upload" className="cursor-pointer group">
                                <div className="w-64 h-64 bg-[#C4C4C4] rounded-3xl flex items-center justify-center hover:bg-gray-700 transition-colors border-2 borderborder-gray-700 group-hover:border-primary">
                                    {formData.image ? (
                                        <img
                                            src={URL.createObjectURL(formData.image)}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-3xl"
                                        />
                                    ) : (
                                        <Plus className="w-16 h-16 text-gray-600 group-hover:text-gray-500" />
                                    )}
                                </div>
                                <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="space-y-3">
                        <Label htmlFor="price" className="text-white text-2xl font-semibold">
                            How Do You Want to Charge?
                        </Label>
                        <p className="text-gray-400 text-base">Enter the price per consultation...</p>
                        <Input
                            id="price"
                            type="text"
                            value={formData.price}
                            onChange={(e) => handleInputChange("price", e.target.value)}
                            className="!bg-[#1E1E1E] border-zinc-700 text-white placeholder:text-gray-500 h-20 text-2xl rounded-[25px] focus:border-primary focus:ring-primary"
                            placeholder="$0.00"
                            required
                        />
                    </div>

                    {/* Register Button */}
                    <div className="pt-10 flex justify-center">
                        <Button
                            type="submit"
                            variant="outline"
                            className="w-75 max-w-md h-15 text-2xl !border-primary text-white hover:bg-primary/10 hover:text-primary rounded-[25px] flex items-center justify-center font-bold"
                        >
                            <Rocket className="mr-3 h-5 w-5" />
                            Register Agent
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}