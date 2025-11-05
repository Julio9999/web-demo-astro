import { z } from "zod";

export const ProductFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es requerido" })
    .max(100, { message: "El nombre es demasiado largo" }),

  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Precio inválido" }),

  image: z
    .instanceof(File, { message: "Debe ser un archivo de imagen válido" })
    .refine(file => file.type.startsWith("image/"), {
      message: "El archivo debe ser una imagen (png, jpg, jpeg, etc.)",
    }),

  description: z
    .string()
    .max(500, { message: "La descripción es demasiado larga" })
    .optional(),
});

export type ProductFormType = z.infer<typeof ProductFormSchema>;
