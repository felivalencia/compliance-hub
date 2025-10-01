const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";
const API_KEY = import.meta.env.VITE_API_KEY ?? "dev-admin-123";

interface ApiError {
  error: string;
  statusCode?: number;
  details?: unknown;
}

class ApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const headers = new Headers(init.headers || {});
    headers.set("x-api-key", this.apiKey);
    headers.set("content-type", "application/json");

    const url = `${this.baseUrl}${path}`;

    try {
      const res = await fetch(url, { ...init, headers });

      if (!res.ok) {
        const error: ApiError = await res.json().catch(() => ({
          error: res.statusText,
          statusCode: res.status,
        }));
        throw new Error(error.error || "API request failed");
      }

      return res.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unknown error occurred");
    }
  }

  async get<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: "GET" });
  }

  async post<T>(path: string, data: unknown): Promise<T> {
    return this.request<T>(path, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(path: string, data: unknown): Promise<T> {
    return this.request<T>(path, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient(BASE_URL, API_KEY);

export const api = <T>(path: string, init?: RequestInit): Promise<T> => {
  const headers = new Headers(init?.headers || {});
  headers.set("x-api-key", API_KEY);
  headers.set("content-type", "application/json");

  return fetch(`${BASE_URL}${path}`, { ...init, headers }).then((res) => {
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  });
};
