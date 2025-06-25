import { Button } from "@/components/ui/button";

export default function CreatorPage(){
    return(
        <div>
            <h1>Tela do criador de APIS</h1>
            <Button>
                <a href="/creator/register-api" className="w-full block text-center">
                    Cadastrar nova API
                </a>
            </Button>
        </div>
    );

}