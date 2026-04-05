//Creación de Formulario de Creación de Proveedores - Datos básicos
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import { CircleArrowLeft } from "lucide-react";
import { useState } from "react";
import { SupplierSchema } from "../schemas/SupplierSchemas";

export default function CreateFormSuppliers() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nit: "",
    fullnames: "",
    supplierSocialReason: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const basicSchema = SupplierSchema.pick({
      nit: true,
      fullnames: true,
      supplierSocialReason: true,
    });

    const result = basicSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    navigate("../datos-contacto", { state: result.data });
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-label px-3 sm:px-4 py-4 sm:py-8">
      <form
        onSubmit={handleSubmit}
        className="
      w-full max-w-md
      px-4 sm:px-6 py-8 sm:py-12 
      grid grid-cols-1 gap-4 
      bg-white/70 dark:bg-neutral-900/20 
      backdrop-blur-md 
      shadow-xl 
      ring-1 
      rounded-2xl sm:rounded-3xl"
      >

        <Link
        to="/"
        className="absolute left-3 flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/20 transition-colors group"
      >
        <CircleArrowLeft className="size-8 text-label group-hover:text-white transition-colors" />
      </Link>

        {/* DATOS BÁSICOS */}
        <section className="flex flex-col items-center gap-4 p-4 border rounded-xl">
          <h2
            className="
          text-center 
          text-lg sm:text-xl md:text-2xl font-bold 
          text-label"
          >
            Datos básicos
          </h2>
          <div className="space-y-6 grid grid-cols-1 w-full max-w-[320px]">
            <Input
              label="NIT: Ejemplo: 80000000-0"
              placeholder="80000000-0"
              name="nit"
              value={formData.nit}
              onChange={handleChange}
              error={errors.nit}
            />
            <Input
              label="Nombre del proveedor"
              placeholder="Juan Rivera"
              name="fullnames"
              value={formData.fullnames}
              onChange={handleChange}
              error={errors.fullnames}
            />
            <Input
              label="Razón social"
              placeholder="Mi Empresa S.A.S."
              name="supplierSocialReason"
              value={formData.supplierSocialReason}
              onChange={handleChange}
              error={errors.supplierSocialReason}
            />
            {/* <Select label="Tipos de documento" name="documentType" options={documentTypes}></Select> */}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-between w-full max-w-[320px] mt-6">
            <Link to= "/suppliers/listar-proveedores">
                <Button
              variant="secondary"
              size="sm"
              onClick={() => console.log("Oprimió cancelar")}
            >
              Cancelar
            </Button>
            </Link>

            
            

            <Button variant="primary" size="sm" type="submit">
              Siguiente
            </Button>
          </div>
        </section>
      </form>
    </div>
  );
}