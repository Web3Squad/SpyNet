"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
    const [form, setForm] = useState({
        nome: "",
        descricao: "",
        endpoint: "",
        preco: ""
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Adicione aqui a lógica para enviar os dados
        console.log(form);
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-6 sm:p-12 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-xl w-full flex flex-col items-center gap-8 bg-white/80 rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
                    Cadastrar nova API
                </h1>
                <p className="text-center text-base text-muted-foreground mb-6">
                    Preencha os dados abaixo para cadastrar sua API no marketplace.
                </p>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome
                        </label>
                        <input
                            type="text"
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descrição
                        </label>
                        <textarea
                            name="descricao"
                            value={form.descricao}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Endpoint da API real
                        </label>
                        <input
                            type="url"
                            name="endpoint"
                            value={form.endpoint}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Preço por chamada
                        </label>
                        <input
                            type="number"
                            name="preco"
                            value={form.preco}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <Button type="submit" className="w-full max-w-xs text-base py-6 self-center">
                        Cadastrar
                    </Button>
                </form>
            </div>
        </div>
    );
}