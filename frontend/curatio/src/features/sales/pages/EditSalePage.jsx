import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Button from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import Modal from "@/shared/components/Modal";

import {
  fetchSaleDetail,
  updateSale,
} from "@/lib/http/sales";
import {
  mapSaleDetailResponse,
  buildUpdateSaleBody,
} from "@/lib/adapters/salesAdapter";

const PAYMENT_TYPE_OPTIONS = [
  { id: "Efectivo", value: "Efectivo", label: "Efectivo" },
  { id: "Tarjeta débito", value: "Tarjeta débito", label: "Tarjeta débito" },
  { id: "Tarjeta crédito", value: "Tarjeta crédito", label: "Tarjeta crédito" },
  { id: "Transferencia", value: "Transferencia", label: "Transferencia" },
];

const SALE_STATUS_OPTIONS = [
  { id: "Pendiente", value: "Pendiente", label: "Pendiente" },
  { id: "Anulada", value: "Anulada", label: "Anulada" },
];

/**
 * Pantalla para actualizar campos permitidos de una venta.
 *
 * Campos editables según la API actual:
 * - tipo de pago
 * - estado (sin permitir forzar Completada)
 */
export default function EditSalePage() {
  const navigate = useNavigate();
  const { saleId } = useParams();

  const [sale, setSale] = useState(null);
  const [formData, setFormData] = useState({
    paymentType: "",
    status: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [apiError, setApiError] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadSale = async () => {
      setLoading(true);
      setLoadError("");

      try {
        const response = await fetchSaleDetail(saleId);
        const detail = mapSaleDetailResponse(response);

        if (!cancelled) {
          setSale(detail);
          setFormData({
            paymentType: detail.paymentType || "",
            status: detail.status || "",
          });
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            error?.error?.message || "No se pudo cargar la venta."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadSale();

    return () => {
      cancelled = true;
    };
  }, [saleId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setApiError("");
  };

  const handleSubmit = async () => {
    setSaving(true);
    setApiError("");

    try {
      await updateSale(
        saleId,
        buildUpdateSaleBody(formData)
      );

      setIsConfirmOpen(false);
      setIsSuccessOpen(true);
    } catch (error) {
      setApiError(
        error?.error?.message || "No se pudo actualizar la venta."
      );
      setIsConfirmOpen(false);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-8 text-label">
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <p>Cargando venta...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen px-4 py-8 text-label">
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <p className="text-red-600">{loadError}</p>
          <div className="mt-6">
            <Link to="/sales/list">
              <Button variant="secondary" size="sm">
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!sale) {
    return null;
  }

  return (
    <div className="min-h-screen px-4 py-8 text-label">
      <div className="max-w-4xl mx-auto space-y-6">
        <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6">
          <h1 className="text-2xl font-bold mb-2">Editar venta</h1>
          <p className="text-sm text-label/80">
            Factura {sale.invoiceNumber}
          </p>
        </section>

        <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Tipo de pago"
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
              options={PAYMENT_TYPE_OPTIONS}
              placeholder="Selecciona un tipo"
              wrapperClassName="w-full"
            />

            <Select
              label="Estado"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={SALE_STATUS_OPTIONS}
              placeholder="Selecciona un estado"
              wrapperClassName="w-full"
            />
          </div>

          {apiError ? (
            <p className="text-sm text-red-600">{apiError}</p>
          ) : null}

          <div className="flex flex-wrap justify-end gap-3">
            <Link to={`/sales/detalle/${sale.id}`}>
              <Button variant="secondary" size="sm">
                Cancelar
              </Button>
            </Link>

            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={() => setIsConfirmOpen(true)}
            >
              Guardar cambios
            </Button>
          </div>
        </section>
      </div>

      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Confirmar actualización"
        message="¿Desea guardar los cambios realizados en la venta?"
      >
        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => setIsConfirmOpen(false)}
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={handleSubmit}
            disabled={saving}
          >
            Guardar
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Venta actualizada"
        message="La venta se actualizó correctamente."
      >
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={() => navigate(`/sales/detalle/${sale.id}`)}
          >
            Ver detalle
          </Button>
        </div>
      </Modal>
    </div>
  );
}