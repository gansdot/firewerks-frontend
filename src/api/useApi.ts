import { useUser } from "../context/UserContext";
const BASE_URL = "http://localhost:8000/api";
export const useApi = () => {
  const { user } = useUser();

  // Centralized request handler
  const request = async <T = any>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any
  ): Promise<T> => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      //...(user?.token ? { Authorization: `Bearer ${user?.token}` } : {}),
    };

    const options: RequestInit = {
      method,
      headers,
    };


    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    // If unauthorized, handle automatically
    if (response.status === 401) {
      console.warn("Unauthorized request — please log in again.");
      throw new Error("Unauthorized");
    }

    // Handle error responses
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    // Safely parse JSON if applicable
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }

    return {} as T;
  };

  return { request };
};
