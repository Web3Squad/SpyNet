import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-[#3B3B3B] py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-white">LOGO</h4>
            <p className="text-gray-400">Find, Create and Monetize AI Agents</p>
            <div className="text-gray-500 text-sm">Social Media</div>
            <div className="flex gap-4">
              <Link href="#" className="w-8 h-8 bg-gray-600 rounded hover:bg-primary transition-colors"></Link>
              <Link href="#" className="w-8 h-8 bg-gray-600 rounded hover:bg-primary transition-colors"></Link>
              <Link href="#" className="w-8 h-8 bg-gray-600 rounded hover:bg-primary transition-colors"></Link>
              <Link href="#" className="w-8 h-8 bg-gray-600 rounded hover:bg-primary transition-colors"></Link>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Explore</h4>
            <div className="space-y-2">
              <Link href="/marketplace" className="block text-gray-400 hover:text-primary transition-colors">
                Marketplace
              </Link>
              <Link href="/empresas" className="block text-gray-400 hover:text-primary transition-colors">
                Companies
              </Link>
              <Link href="/criadores" className="block text-gray-400 hover:text-primary transition-colors">
                Creators
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Join Our Weekly Digest</h4>
            <p className="text-gray-400 text-sm">Get exclusive promotions & updates straight to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-background border-gray-600 text-white placeholder:text-gray-400"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}
