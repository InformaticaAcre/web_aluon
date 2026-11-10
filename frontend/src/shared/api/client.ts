import type { ApiError } from "./types";

const API_BASE = (import.meta.env.VITE_API_BASE ?? "").replace(/\/$/, "");

export class HttpError extends Error {
  status: number;
  body?: ApiError;
  constructor(status: number, message: string, body?: ApiError) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem("aluon_token");
  const url = API_BASE ? `${API_BASE}${path}` : path;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  if (res.ok) {
    return (await res.json()) as T;
  }

  let body: ApiError | undefined;
  try {
    body = (await res.json()) as ApiError;
  } catch {
    body = undefined;
  }
  throw new HttpError(res.status, body?.detail ?? "Error de red", body);
}
