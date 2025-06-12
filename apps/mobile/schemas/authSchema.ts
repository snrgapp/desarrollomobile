import { z } from "zod/v4-mini";

export const validateEmail = (email: string) => {
  return z
    .string()
    .check(
      z.minLength(5, "Email must be at least 5 characters long"),
      z.refine((val) => val.includes("@"), "Must be a valid email"),
      z.trim()
    )
    .safeParse(email);
};

export const validatePassword = (password: string) => {
  return z
    .string()
    .check(
      z.minLength(6, "Password must be at least 6 characters long"),
      z.trim()
    )
    .safeParse(password);
};

export const validatePhone = (phone: string) => {
  z.regex(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number format");
  z.string().check(
    z.minLength(10, "Phone number must be at least 10 characters long"),
    z.maxLength(15, "Phone number must be at most 15 characters long")
  );
  return z.string().safeParse(phone);
};
