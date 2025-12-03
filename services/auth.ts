import { signUpTypes, loginTypes, verifyEmailTypes } from "@/types/type";

const BASE_URL = "https://uber-clone-backend-kappa.vercel.app"


// In your services/auth.ts file
export const fetchLoginApi = async ({ email, password }: loginTypes) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok && response.status !== 403) {
      throw new Error(data.message || "Login failed");
    }

    return {
      ...data,
      statusCode: response.status, 
    };
  } catch (error: any) {
    throw error;
  }
};

export const fetchSignUpApi = async ({ username, email, password, role }:signUpTypes) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      role,
    }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to sign up");
  }

  return data;
};


export const fetchVerifyEmailAPI = async ({ token, email }: verifyEmailTypes) => {
  const res = await fetch(`${BASE_URL}/api/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      email,
    }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to verify email");
  }

  return data;
};


