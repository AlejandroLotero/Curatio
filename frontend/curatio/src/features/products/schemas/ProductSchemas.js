// import { z } from "zod";

// // Schema pensado para el formulario de `ProductsPage.jsx`.
// // Importante: los inputs tipo `number` y `date` suelen llegar como string desde el DOM,
// // por eso usamos `z.coerce` para aceptar números en string.
// export const ProductSchema = z.object({
//   visualId: z
//     .string()
//     .min(1, "El ID del medicamento es obligatorio"),

//   nombre: z
//     .string()
//     .min(3, "El nombre debe tener al menos 3 caracteres")
//     .max(120, "El nombre no puede tener más de 120 caracteres"),

//   formaFarmaceutica: z
//     .string()
//     .min(1, "La forma farmacéutica es obligatoria"),

//   presentacion: z
//     .string()
//     .min(1, "La presentación es obligatoria"),

//   concentracion: z
//     .string()
//     .min(1, "La concentración es obligatoria"),

//   descripcion: z
//     .string()
//     .min(1, "La descripción es obligatoria")
//     .max(500, "La descripción no puede tener más de 500 caracteres"),

//   viaAdministracion: z
//     .string()
//     .min(1, "La vía de administración es obligatoria"),

//   laboratorio: z
//     .string()
//     .min(1, "El laboratorio es obligatorio"),

//   lote: z
//     .string()
//     .min(1, "El lote es obligatorio"),

//   // El formulario usa placeholder "AAAA-MM-DD". Lo validamos como string.
//   fechaFabricacion: z
//     .string()
//     .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha de fabricación debe tener formato AAAA-MM-DD"),

//   fechaVencimiento: z
//     .string()
//     .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha de vencimiento debe tener formato AAAA-MM-DD"),

//   stock: z
//     .coerce
//     .number({
//       invalid_type_error: "El stock debe ser un número",
//     })
//     .nonnegative("El stock no puede ser negativo"),

//   precioCompra: z
//     .coerce
//     .number({
//       invalid_type_error: "El precio de compra debe ser un número",
//     })
//     .nonnegative("El precio de compra no puede ser negativo"),

//   precioVenta: z
//     .coerce
//     .number({
//       invalid_type_error: "El precio de venta debe ser un número",
//     })
//     .nonnegative("El precio de venta no puede ser negativo"),

//   proveedor: z
//     .string()
//     .min(1, "El proveedor es obligatorio"),

//   estado: z
//     .string()
//     .min(1, "El estado es obligatorio"),
// });

import { z } from "zod";

export const ProductSchema = z.object({
  nombre: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(120, "El nombre no puede tener más de 120 caracteres"),

  formaFarmaceutica: z
    .string()
    .min(1, "La forma farmacéutica es obligatoria"),

  presentacion: z
    .string()
    .min(1, "La presentación es obligatoria"),

  concentracion: z
    .string()
    .min(1, "La concentración es obligatoria"),

  descripcion: z
    .string()
    .min(1, "La descripción es obligatoria")
    .max(500, "La descripción no puede tener más de 500 caracteres"),

  viaAdministracion: z
    .string()
    .min(1, "La vía de administración es obligatoria"),

  laboratorio: z
    .string()
    .min(1, "El laboratorio es obligatorio"),

  lote: z
    .string()
    .min(1, "El lote es obligatorio"),

  fechaFabricacion: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha de fabricación debe tener formato AAAA-MM-DD"),

  fechaVencimiento: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha de vencimiento debe tener formato AAAA-MM-DD"),

  stock: z.coerce
    .number({
      invalid_type_error: "El stock debe ser un número",
    })
    .min(0, "El stock no puede ser negativo")
    .max(999, "El stock no puede ser mayor a 999"),

  precioCompra: z.coerce
    .number({
      invalid_type_error: "El precio de compra debe ser un número",
    })
    .min(0, "El precio de compra no puede ser negativo"),

  precioVenta: z.coerce
    .number({
      invalid_type_error: "El precio de venta debe ser un número",
    })
    .min(0, "El precio de venta no puede ser negativo"),

  proveedor: z
    .string()
    .min(1, "El proveedor es obligatorio"),

  estado: z
    .string()
    .min(1, "El estado es obligatorio"),
}).refine(
  (data) => data.fechaVencimiento > data.fechaFabricacion,
  {
    message: "La fecha de vencimiento debe ser posterior a la fecha de fabricación",
    path: ["fechaVencimiento"],
  }
);
