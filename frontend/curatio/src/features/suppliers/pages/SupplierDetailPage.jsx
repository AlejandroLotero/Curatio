import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SupplierDetailComponent from "@/features/suppliers/components/SupplierDetailComponent";
import {
  fetchSupplierDetail,
  mapSupplierDetailResponse,
} from "@/lib/http/suppliers";
import { Button } from "@/shared/components";

export default function SupplierDetailPage() {
  const [searchParams] = useSearchParams();
  const nit = searchParams.get("nit");
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!nit) {
      setSupplier(null);
      setLoadError("");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setLoadError("");

    fetchSupplierDetail(nit)
      .then((res) => {
        if (!cancelled) setSupplier(mapSupplierDetailResponse(res));
      })
      .catch((e) => {
        if (!cancelled) {
          setLoadError(e?.error?.message || "No se pudo cargar el proveedor.");
          setSupplier(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [nit]);

  if (!nit) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-label">
        <p className="text-center">
          Falta el NIT en la URL. Abra el detalle desde el listado de proveedores.
        </p>
        <Button
          variant="secondary"
          size="sm"
          type="button"
          onClick={() => navigate("/suppliers/listar-proveedores")}
        >
          Ir al listado
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 text-label">
        Cargando proveedor…
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
        <p className="text-center text-red-600 dark:text-red-400" role="alert">
          {loadError}
        </p>
        <Button
          variant="secondary"
          size="sm"
          type="button"
          onClick={() => navigate("/suppliers/listar-proveedores")}
        >
          Volver al listado
        </Button>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-label">
        <p>No se encontró información del proveedor.</p>
        <Button
          variant="secondary"
          size="sm"
          type="button"
          onClick={() => navigate("/suppliers/listar-proveedores")}
        >
          Volver al listado
        </Button>
      </div>
    );
  }

  return (
    <SupplierDetailComponent
      supplier={supplier}
      onCancel={() => navigate("/suppliers/listar-proveedores")}
      onEdit={() =>
        navigate(`/suppliers/datos-basicos?nit=${encodeURIComponent(nit)}`)
      }
    />
  );
}
