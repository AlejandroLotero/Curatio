import { useNavigate, useParams } from "react-router-dom";
import SupplierDetailComponent from "@/features/suppliers/components/SupplierDetailComponent";

export default function SupplierDetailPage() {
  const { nit } = useParams();
  const navigate = useNavigate();

  const mockSupplier = {
    nit: nit || "80000000-0",
    nombreProveedor: "Juan Rivera",
    razonSocial: "Mi Empresa S.A.S.",
    nombreContacto: "Juan Rivera",
    telefonoContacto: "3000000000",
    correo: "example@gmail.com",
    direccion: "Barrio Dss Mz 44 Cs 88",
    ciudad: "Medellín",
    estado: "Activo",
  };

  return (
    <SupplierDetailComponent
      supplier={mockSupplier}
      onCancel={() => navigate("/suppliers/listar-proveedores")}
      onEdit={() => navigate(`/suppliers/datos-basicos?nit=${mockSupplier.nit}`)}
    />
  );
}

