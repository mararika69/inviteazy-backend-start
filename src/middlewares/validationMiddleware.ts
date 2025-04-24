import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const userSchema = z.object({
  full_name: z.string().min(3, "Full name must be at least 3 characters"),

  email: z.string()
    .email("Invalid email address")
    .transform((val) => val.trim().toLowerCase()),

  password: z.string()
    .trim()
    .min(8, "Password must be at least 8 characters"),

  phone_number: z
    .string()
    .refine(
      (val) => !val || (/^\d+$/.test(val) && val.length >= 10),
      { message: "Phone number must contain only digits and be at least 10 digits" }
    )
    .optional(),

    profile_picture: z
    .string()
    .url("Invalid profile picture URL")
    .optional()
    .or(z.literal('')),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .optional()
    .or(z.literal('')),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const idParamSchema = z.object({
  id: z.string(),
});

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateIdInURLParam = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    idParamSchema.parse(req.params);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};
