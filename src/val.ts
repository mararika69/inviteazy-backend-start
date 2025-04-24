// console.log("Validate")

import { z } from 'zod';

const nameSchema = z.string();
nameSchema.parse("John"); // ✅
nameSchema.parse(42);     // ❌ throws ZodError

const portSchema = z.number().int().positive();

z.string().min(3).max(10);
z.number().min(1).max(100);
