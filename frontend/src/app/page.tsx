"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RocketIcon, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Find Or Monetize Agents
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              We Connect Specialized Agents To Companies That Need Fast And Secure Solutions
            </p>
            <Button
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg border-2 border-primary/80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              asChild
            >
              <Link href="/saiba-mais" className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Learn More
              </Link>
            </Button>
          </div>

          {/* Right Content */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md bg-[#3B3B3B] border-gray-700">
              <CardContent className="p-0">
                <div className="aspect-video bg-[#C4C4C4] rounded-t-lg"></div>
                <div className="p-6 space-y-2">
                  <h3 className="text-xl font-semibold text-white">A Universe Of Agents</h3>
                  <p className="text-gray-400">Find, Create and Monetize AI Agents</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Companies Section */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="space-y-12">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">For Companies</h2>
            <p className="text-xl text-gray-300">Find Your New Collaborator!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Legal Agent */}
            <Card className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-0">
                <div className="aspect-square bg-[#C4C4C4] rounded-t-lg"></div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-white">Legal Agent</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-400">NW Advogados Associados</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Marketing Agent */}
            <Card className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-0">
                <div className="aspect-square bg-[#C4C4C4] rounded-t-lg"></div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-white">Marketing Agent</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-400">RJ Solutions</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Developer Agent */}
            <Card className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-0">
                <div className="aspect-square bg-[#C4C4C4] rounded-t-lg"></div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-white">Developer Agent</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-400">Prisma Software</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              className="bg-transparent hover:bg-[#32ADE6]/10 text-white text-lg px-10 py-5 border-2 border-[#32ADE6] rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-3 w-full max-w-sm mx-auto"
              asChild
            >
              <Link href="/apis">
                <RocketIcon className="h-5 w-5 text-[#32ADE6]" />
                <span className="font-semibold">Find Agents</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* For Creators Section */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="space-y-12">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              For Creators
            </h2>
            <p className="text-2xl text-gray-300">
              Easily Set Up Your Agent And Start Earning Money!
            </p>
          </div>

          <div className="bg-[#1E1E1E] rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="w-full max-w-md aspect-square bg-[#C4C4C4] rounded-2xl"></div>
              </div>

              {/* Right Content */}
              <div className="space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
                <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Register Your AI Agent Now!
                </h3>
                <p className="text-xl text-gray-300">
                  Monetize Your Expertise Quickly!
                </p>

                <Button
                  className="bg-transparent hover:bg-[#32ADE6]/10 text-white text-lg px-10 py-5 border-2 border-[#32ADE6] rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-3 w-full max-w-sm mx-auto"
                  asChild
                >
                  <Link href="/cadastrar-agente">
                    <RocketIcon className="h-5 w-5 text-[#32ADE6]" />
                    <span className="font-semibold">Learn More</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
