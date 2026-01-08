/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";

type ApiError = {
  message?: string;
  error?: string;
};

type InfoForm = {
  name: string;
  phone: number;
  email: string;
  message: string;
};

export default function Home() {
  const { register, handleSubmit, formState } = useForm<InfoForm>();
  const [users, setUsers] = useState([]);

  const onSubmit = async (data: InfoForm) => {
    try {
      const response = await axios.post("api/leads", data);

      toast("Cadastrado com sucesso!");

      await allUsers();
      return response.data;
    } catch (err: any) {
      console.error("submit failed: ", err);
    }
  };

  const allUsers = async () => {
    try {
      const response = await axios.get("api/users");
      const data = await response.data;

      setUsers(data);
    } catch (err: any) {
      console.error("submit failed: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center px-4">
      <main className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-8">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            Formulário Inteligente
          </h1>
          <p className="text-sm text-gray-600">
            Envio de leads integrado com n8n e Supabase
          </p>
        </header>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              {...register("name")}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="number"
              {...register("phone")}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Mensagem
            </label>
            <textarea
              {...register("message")}
              rows={4}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              className="h-11 px-6 bg-black text-white hover:bg-gray-800"
              type="submit"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? "Enviando..." : "Enviar Lead"}
            </Button>

            <Button
              className="h-11 px-6 border border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
              type="button"
              onClick={allUsers}
            >
              Carregar Usuários
            </Button>
          </div>
        </form>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900">
            Usuários cadastrados
          </h2>

          {users.length === 0 ? (
            <div className="text-sm text-gray-500 border border-dashed border-gray-300 rounded-lg p-6 text-center">
              Nenhum usuário carregado
            </div>
          ) : (
            <div className="max-h-60 overflow-y-auto space-y-2">
              {users.map((user: any, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-3 text-sm"
                >
                  <span className="font-medium text-gray-800">
                    {user?.name ?? "name"}
                  </span>
                  <span className="text-gray-600">
                    {user?.email ?? "email"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
