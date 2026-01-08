import { NextRequest, NextResponse } from "next/server";

import axios, { AxiosError } from "axios";
import { N8N_WEBHOOK_URL } from "@/app/constants";

type ApiError = { message?: string; error?: string };

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const url = new URL("/webhook-test/lead", N8N_WEBHOOK_URL).toString();

    const payload = {
      name: String(data.name ?? "").trim(),
      email: String(data.email ?? "")
        .trim()
        .toLowerCase(),
      phone: data?.phone ? Number(data?.phone) : null,
      message: data?.message ? String(data.message)?.trim() : null,
      type: "lead" as const,
    };

    if (!payload.name || !payload.email) {
      return NextResponse.json(
        { ok: false, message: "name e email são obrigatórios" },
        { status: 400 }
      );
    }

    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 15000,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    const e = err as AxiosError<ApiError>;
    const status = e.response?.status ?? 500;
    const msg =
      e.response?.data?.message ||
      e.response?.data?.error ||
      e.message ||
      "Erro interno";

    return NextResponse.json({ ok: false, message: msg }, { status });
  }
}
