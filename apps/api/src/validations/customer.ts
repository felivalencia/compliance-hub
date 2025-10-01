import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  curp: z
    .string()
    .regex(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]\d$/, "Invalid CURP format")
    .optional(),
  rfc: z
    .string()
    .regex(/^[A-Z]{3,4}\d{6}[0-9A-Z]{3}$/, "Invalid RFC format")
    .optional(),
  country: z.string().length(2).default("MX"),
  occupation: z.string().max(255).optional(),
});

export const updateCustomerSchema = createCustomerSchema.partial();

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
