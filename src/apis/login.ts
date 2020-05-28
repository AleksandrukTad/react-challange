import { LoginModel } from "models/login";
import { API_URL } from "utils/constants";

export async function login(login: LoginModel): Promise<Response> {
  const response = await fetch(`${API_URL}/login`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: login ? JSON.stringify(login) : undefined,
    method: "POST"
  });

  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw response;
  }
}
