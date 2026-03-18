import {z} from "zod"

export const UserSchema = z.object({
    fullnames: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(60, "El nombre no puede tener más de 50 caracteres"),

    documentType: z
    .string()
    .min(1, "Debe seleccionar un tipo de documento"),

    documentNumber: z
    .string()
    .min(5, "Numero de dovumento invalido")
    .max(20, "Numero de documento demasiado largo"),

    address: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(100, "La dirección no puede tener más de 100 caracteres"),
    
    phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "El número de teléfono debe tener 10 dígitos"),

    email: z
    .email("El correo electrónico no es válido"),

    confirmEmail: z
    .string()
    .min(1, "Debe confirmar el correo electrónico")
    .max(100, "El correo electrónico no puede tener más de 100 caracteres")
    .email("El correo electrónico no es válido"),

    roles: z
    .string()
    .min(1, "Debe seleccionar un rol"),

    startDate: z
    .date("La fecha de inicio no es válida use el formato DD/MM/YYYY"),

    endDate: z
    .date("La fecha de fin no es válida use el formato DD/MM/YYYY"),

    nit: z
    .string()
    .min(1, "El NIT no puede estar vacío")
    .max(10, "El NIT no puede tener más de 10 caracteres"),

    supplierSocialReason: z
    .string()
    .min(1, "La razón social no puede estar vacío")
    .max(100, "La razón social no puede tener más de 100 caracteres"),

    password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "La contraseña debe contener al menos un carácter especial"),

    avatarUrl: z
    .url("La URL del avatar no es válida")
    .nullable()
    .optional()

})