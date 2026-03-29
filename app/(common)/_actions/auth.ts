"use server";

import { cookies } from "next/headers";

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  gender?: string;
  profilePhoto?: string;
}

export async function loginAction(payload: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Login failed",
      };
    }
    const { accessToken, refreshToken, user } = data.data;
    const cookieOptions = await cookies();

    cookieOptions.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    cookieOptions.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    cookieOptions.set({
      name: "user",
      value: JSON.stringify(user),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error,
      message: "Login failed",
    };
  }
}

export async function registerAction(payload: RegisterPayload) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Registration failed",
      };
    }

    return {
      success: true,
      message: "Registration successful",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error,
      message: "An error occurred during registration",
    };
  }
}
