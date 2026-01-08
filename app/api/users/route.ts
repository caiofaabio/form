import { NextResponse } from "next/server";

import axios from "axios";
import { SERVICE_ROLE, SUPABASE_URL } from "@/app/constants";

export async function GET() {
  try {
    const url =
      SUPABASE_URL + "/rest/v1/lead_submissions?select=*&order=created_at.desc";

    const res = await axios.get(url, {
      headers: {
        apikey: SERVICE_ROLE,
        Authorization: `Bearer ${SERVICE_ROLE}`,
      },
    });

    return NextResponse.json(res.data);
  } catch (e) {
    console.log(e);
  }
}
