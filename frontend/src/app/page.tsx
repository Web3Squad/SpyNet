import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-6 sm:p-12 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-xl w-full flex flex-col items-center gap-8 bg-white/80 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          SpyAgents
        </h1>
        <p className="text-center text-base text-muted-foreground mb-6">
          Uma plataforma marketplace para compra de APIs de agentes.
        </p>
        <Button className="w-full max-w-xs text-base py-6">
          <a href="/login" className="w-full block text-center">
            Fazer Login
          </a>
        </Button>
      </div>
    </div>
  );
}
