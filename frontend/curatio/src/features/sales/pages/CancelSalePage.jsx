import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";

import {
  fetchSaleDetail,
  cancelSale,
} from "@/lib/http/sales";
import { mapSaleDetailResponse } from "@/lib/adapters/salesAdapter";

/**
 * Pantalla para anular una venta con motivo obligatorio.
 */
export default function CancelSalePage() {
  const navigate = useNavigate();
  const { saleId } = useParams();

  const [sale, setSale] = useState(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadSale = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetchSaleDetail(saleId);
        const detail = mapSaleDetailResponse(response);

        if (!cancelled) {
          setSale(detail);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
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

  const handleSubmit = async () => {
    if (!reason.trim()) {
      setError("El motivo de anulación es obligatorio.");
      setIsConfirmOpen(false);
      return;
    }

    setSaving(true);
    setError("");

    try {
      await cancelSale(saleId, reason.trim());
      setIsConfirmOpen(false);
      setIsSuccessOpen(true);
    } catch (error) {
      setError(
        error?.error?.message || "No se pudo anular la venta."
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

  if (!sale) {
    return (
      <div className="min-h-screen px-4 py-8 text-label">
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <p className="text-red-600">{error || "Venta no disponible."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 text-label">
      <div className="max-w-4xl mx-auto space-y-6">
        <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6">
          <h1 className="text-2xl font-bold mb-2">Anular venta</h1>
          <p className="text-sm text-label/80">
            Factura {sale.invoiceNumber}
          </p>
        </section>

        <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6 space-y-4">
          <Input
            label="Motivo de anulación"
            name="reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            error={error}
            wrapperClassName="w-full"
          />

          <div className="flex flex-wrap justify-end gap-3">
            <Link to={`/sales/detalle/${sale.id}`}>
              <Button variant="secondary" size="sm">
                Volver
              </Button>
            </Link>

            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={() => setIsConfirmOpen(true)}
            >
              Confirmar anulación
            </Button>
          </div>
        </section>
      </div>

      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Confirmar anulación"
        message="¿Está seguro que desea anular esta venta?"
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
            Anular
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Venta anulada"
        message="La venta fue anulada correctamente."
      >
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={() => navigate("/sales/list")}
          >
            Volver al listado
          </Button>
        </div>
      </Modal>
    </div>
  );
}