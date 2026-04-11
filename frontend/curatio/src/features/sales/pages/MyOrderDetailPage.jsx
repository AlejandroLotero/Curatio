import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Button from "@/shared/components/Button";
import {
  fetchSaleDetail,
  confirmSalePayment,
  downloadSaleInvoice,
} from "@/lib/http/sales";
import { mapSaleDetailResponse } from "@/lib/adapters/salesAdapter";
import { useToast } from "@/shared/components/ToastContext";

async function extractBlobPayload(response) {
  if (!response) return null;
  if (response instanceof Blob) return response;
  if (response.data instanceof Blob) return response.data;
  if (typeof response.blob === "function") return await response.blob();
  if (response.body instanceof Blob) return response.body;
  return null;
}

function triggerBlobDownload(blob, filename) {
  if (!blob) return;

  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  window.URL.revokeObjectURL(url);
}

export default function MyOrderDetailPage() {
  const { id } = useParams();
  const { pushToast } = useToast();

  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const loadSale = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetchSaleDetail(id);
      const mapped = mapSaleDetailResponse(response);
      setSale(mapped);
    } catch (err) {
      setError(err?.error?.message || "No se pudo cargar el pedido.");
      setSale(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadSale();
  }, [loadSale]);

  const handleConfirmPayment = async () => {
    if (!sale?.id) return;

    try {
      setConfirming(true);

      await confirmSalePayment(sale.id);

      pushToast({
        type: "success",
        title: "Pago confirmado",
        message: "Tu confirmación de pago fue registrada correctamente.",
      });

      await loadSale();
    } catch (err) {
      pushToast({
        type: "error",
        title: "No se pudo confirmar el pago",
        message:
          err?.error?.message || "Ocurrió un error al confirmar el pago.",
      });
    } finally {
      setConfirming(false);
    }
  };

  const handleDownloadInvoice = async () => {
    if (!sale?.id) return;

    try {
      setDownloading(true);

      const response = await downloadSaleInvoice(sale.id);
      const blob = await extractBlobPayload(response);

      triggerBlobDownload(
        blob,
        `factura_${sale.invoiceNumber || sale.id}.pdf`
      );
    } catch (err) {
      pushToast({
        type: "error",
        title: "No se pudo descargar",
        message:
          err?.error?.message || "No se pudo descargar la factura.",
      });
    } finally {
      setDownloading(false);
    }
  };

  const canConfirmPayment =
    sale?.status === "Pendiente" && !sale?.customerConfirmationAt;

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-8 text-label">
        <div className="max-w-5xl mx-auto rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-md text-center">
          Cargando detalle del pedido...
        </div>
      </div>
    );
  }

  if (error || !sale) {
    return (
      <div className="min-h-screen px-4 py-8 text-label">
        <div className="max-w-5xl mx-auto rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-md">
          <h1 className="text-2xl font-bold mb-4">Detalle de mi pedido</h1>
          <p className="text-red-600">
            {error || "No se encontró el pedido solicitado."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 text-label">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="rounded-3xl bg-white/70 p-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Detalle de mi pedido</h1>
              <p className="text-sm text-label mt-1">
                 Revisa el estado de tu compra, la factura y el avance de aprobación.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link to="/my-orders">
                <Button variant="secondary" size="sm">
                  Volver
                </Button>
              </Link>

              <Button
                variant="primary"
                size="sm"
                type="button"
                onClick={handleDownloadInvoice}
                disabled={downloading}
              >
                Descargar factura
              </Button>

              {canConfirmPayment ? (
                <Button
                    variant="primary"
                    size="sm"
                    type="button"
                    onClick={handleConfirmPayment}
                    disabled={confirming}
                >
                    Confirmar pago
                </Button>
                ) : null}

              {sale?.customerConfirmationAt ? (
                <p className="text-sm text-emerald-700 mt-3">
                    Tu pago ya fue registrado correctamente. Tu pedido está pendiente de aprobación interna.
                </p>
                ) : sale?.status === "Pendiente" ? (
                <p className="text-sm text-amber-700 mt-3">
                    Tu pedido aún no tiene confirmación de pago registrada.
                </p>
                ) : null}
            </div>
          </div>
        </div>

        <section className="rounded-3xl bg-white/70 p-6 shadow-xl backdrop-blur-md">
          <h2 className="text-lg font-bold mb-4">Información general</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SummaryRow label="Factura" value={sale.invoiceNumber || "—"} />
            <SummaryRow label="Fecha y hora" value={sale.saleDateTime || "—"} />
            <SummaryRow label="Estado" value={sale.status || "—"} />
            <SummaryRow label="Tipo de pago" value={sale.paymentType || "—"} />
            <SummaryRow label="Total" value={`$${Number(sale.total || 0).toLocaleString("es-CO")}`} />
            <SummaryRow
              label="Confirmación de pago"
              value={sale.customerConfirmationAt || "Pendiente"}
            />
          </div>
        </section>

        <section className="rounded-3xl bg-white/70 p-6 shadow-xl backdrop-blur-md">
          <h2 className="text-lg font-bold mb-4">Información de entrega</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SummaryRow
              label="Método de entrega"
              value={sale?.delivery?.methodLabel || "—"}
            />
            <SummaryRow
              label="Dirección"
              value={sale?.delivery?.deliveryAddress || "—"}
            />
            <SummaryRow
              label="Ciudad"
              value={sale?.delivery?.deliveryCity || "—"}
            />
            <SummaryRow
              label="Teléfono"
              value={sale?.delivery?.deliveryPhone || "—"}
            />
            <SummaryRow
              label="Punto de retiro"
              value={sale?.delivery?.pickupPoint || "—"}
            />
            <SummaryRow
              label="Contacto retiro"
              value={sale?.delivery?.pickupContactName || "—"}
            />
            <SummaryRow
              label="Teléfono retiro"
              value={sale?.delivery?.pickupContactPhone || "—"}
            />
          </div>
        </section>

        <section className="rounded-3xl bg-white/70 p-6 shadow-xl backdrop-blur-md">
          <h2 className="text-lg font-bold mb-4">Productos</h2>

          <div className="space-y-3">
            {(sale.lines || []).map((line) => (
              <div
                key={line.id}
                className="rounded-2xl border border-border-strong bg-white/60 px-4 py-3"
              >
                <p className="font-semibold">{line.medication}</p>
                <p className="text-sm text-label/80">Cantidad: {line.quantity}</p>
                <p className="text-sm text-label/80">
                  Precio unitario: ${Number(line.unitPrice || 0).toLocaleString("es-CO")}
                </p>
                <p className="text-sm text-label/80">
                  Subtotal: ${Number(line.lineSubtotal || 0).toLocaleString("es-CO")}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-label">{label}</span>
      <span className="text-label text-right">{value}</span>
    </div>
  );
}