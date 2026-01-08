/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { N8N_WEBHOOK_URL, SERVICE_ROLE, SUPABASE_URL } from "./constants";
import { useState } from "react";

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
    // console.log(data);

    try {
      const response = await axios.post("api/leads", data);

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
    <div className="flex min-h-screen items-center justify-center ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2  ">
            <label>Nome: </label>
            <input
              type="text"
              className="border border-gray-500 rounded-md"
              {...register("name")}
            />
          </div>
          <div className="flex gap-2">
            <label>Telefone: </label>
            <input
              type="number"
              {...register("phone")}
              className="border border-gray-500 rounded-md"
            />
          </div>
          <div className="flex gap-2">
            <label>Email: </label>
            <input
              type="email"
              {...register("email")}
              className="border border-gray-500 rounded-md"
            />
          </div>
          <div className="flex gap-2">
            <label>Mensagem: </label>
            <textarea
              {...register("message")}
              className="border border-gray-500 rounded-md"
            />
          </div>
          <Button
            className="bg-red-500 p-8"
            type="submit"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </form>

        <Button className="bg-red-500 p-8" type="submit" onClick={allUsers}>
          Trazendo usuarios
        </Button>

        <div className="flex flex-col">
          {users.map((user: any, index) => (
            <div className="flex justify-center gap-4 items-center" key={index}>
              <p>{user?.name ?? "name"}</p>
              <p>{user?.email ?? "email"}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
