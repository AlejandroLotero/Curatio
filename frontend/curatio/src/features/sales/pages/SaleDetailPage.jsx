import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";

import {
  fetchSaleDetail,
  approveSaleInternal,
  downloadSaleInvoice,
} from "@/lib/http/sales";
import { mapSaleDetailResponse } from "@/lib/adapters/salesAdapter";

import { useToast } from "@/shared/components/ToastContext";
import { useSalesNotifications } from "@/features/sales/context/SalesNotificationsContext";

/**
 * Extrae un Blob desde la respuesta del cliente HTTP.
 */
async function extractBlobPayload(response) {
  if (!response) return null;
  if (response instanceof Blob) return response;
  if (response.data instanceof Blob) return response.data;
  if (typeof response.blob === "function") return await response.blob();
  if (response.body instanceof Blob) return response.body;
  return null;
}

/**
 * Fuerza descarga del archivo en navegador.
 */
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

/**
 * Página de detalle de venta.
 *
 * Aquí se concentra la aprobación manual de compras pendientes,
 * sin modificar la lógica actual del listado.
 */
export default function SaleDetailPage() {
  const { id } = useParams();

  const { pushToast } = useToast();
  const { loadNotifications } = useSalesNotifications();

  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [approving, setApproving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

  /**
   * Carga el detalle de la venta desde backend.
   */
  const loadSale = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setLoadError("");

    try {
      const response = await fetchSaleDetail(id);
      const mapped = mapSaleDetailResponse(response);
      setSale(mapped);
    } catch (error) {
      setLoadError(
        error?.error?.message || "No se pudo cargar el detalle de la venta."
      );
      setSale(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadSale();
  }, [loadSale]);

  /**
   * Aprueba manualmente una compra web pendiente.
   */
  const handleApproveSale = async () => {
    if (!sale?.id) return;

    try {
      setApproving(true);

      await approveSaleInternal(sale.id);

      pushToast({
        type: "success",
        title: "Compra aprobada",
        message:
          sale?.delivery?.method === "delivery"
            ? "La venta fue aprobada y el cliente fue notificado de que su pedido será despachado."
            : "La venta fue aprobada y el cliente fue notificado para recoger su pedido después de 45 minutos.",
      });

      setIsApproveModalOpen(false);

      await Promise.all([loadSale(), loadNotifications()]);
    } catch (error) {
      pushToast({
        type: "error",
        title: "No se pudo aprobar",
        message:
          error?.error?.message || "Ocurrió un error al aprobar la compra.",
      });
    } finally {
      setApproving(false);
    }
  };

  /**
   * Descarga la factura PDF.
   */
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
    } catch (error) {
      pushToast({
        type: "error",
        title: "No se pudo descargar",
        message:
          error?.error?.message || "No se pudo descargar la factura.",
      });
    } finally {
      setDownloading(false);
    }
  };

  const canApprove = sale?.status === "Pendiente";

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-8 text-label">
        <div className="max-w-5xl mx-auto rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-md text-center">
          Cargando detalle de la venta...
        </div>
      </div>
    );
  }

  if (loadError || !sale) {
    return (
      <div className="min-h-screen px-4 py-8 text-label">
        <div className="max-w-5xl mx-auto rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-md">
          <h1 className="text-2xl font-bold mb-4">Detalle de venta</h1>
          <p className="text-red-600">
            {loadError || "No se encontró la venta solicitada."}
          </p>

          <div className="mt-6">
            <Link to="/sales/list">
              <Button variant="secondary" size="sm">
                Volver al listado
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 text-label">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Encabezado */}
        <div className="rounded-3xl bg-white/70 p-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Detalle de venta</h1>
              <p className="text-sm text-label/80 mt-1">
                Consulta completa de la venta y acciones operativas.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link to="/sales/list">
                <Button variant="secondary" size="sm">
                  Volver
                </Button>
              </Link>

              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={handleDownloadInvoice}
                disabled={downloading}
              >
                Descargar factura
              </Button>

              {canApprove ? (
                <Button
                  variant="primary"
                  size="sm"
                  type="button"
                  onClick={() => setIsApproveModalOpen(true)}
                  disabled={approving}
                >
                  Aprobar compra
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Información general */}
        <section className="rounded-3xl bg-white/70 p-6 shadow-xl backdrop-blur-md">
          <h2 className="text-lg font-bold mb-4">Información general</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SummaryRow label="Factura" value={sale.invoiceNumber} />
            <SummaryRow label="Fecha y hora" value={sale.saleDateTime} />
            <SummaryRow label="Estado" value={sale.status} />
            <SummaryRow label="Tipo de pago" value={sale.paymentType} />
            <SummaryRow label="Cliente" value={sale.customer} />
            <SummaryRow label="Farmaceuta" value={sale.pharmacist} />
            <SummaryRow label="Aprobador" value={sale.approver || "—"} />
          </div>
        </section>

        {/* Entrega */}
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

        {/* Productos */}
        <section className="rounded-3xl bg-white/70 p-6 shadow-xl backdrop-blur-md">
          <h2 className="text-lg font-bold mb-4">Productos de la venta</h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-sm text-label/80">
                  <th className="py-2">Medicamento</th>
                  <th className="py-2">Cantidad</th>
                  <th className="py-2">Precio unitario</th>
                  <th className="py-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {(sale.lines || []).map((line) => (
                  <tr key={line.id} className="bg-white/80">
                    <td className="rounded-l-2xl px-4 py-3">
                      {line.medication}
                    </td>
                    <td className="px-4 py-3">{line.quantity}</td>
                    <td className="px-4 py-3">
                      ${Number(line.unitPrice || 0).toLocaleString("es-CO")}
                    </td>
                    <td className="rounded-r-2xl px-4 py-3">
                      ${Number(line.lineSubtotal || 0).toLocaleString("es-CO")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Resumen económico */}
        <section className="rounded-3xl bg-white/70 p-6 shadow-xl backdrop-blur-md">
          <h2 className="text-lg font-bold mb-4">Resumen económico</h2>

          <div className="space-y-3 max-w-md">
            <SummaryRow
              label="Subtotal"
              value={`$${Number(sale.subtotal || 0).toLocaleString("es-CO")}`}
            />
            <SummaryRow
              label="IVA"
              value={`$${Number(sale.iva || 0).toLocaleString("es-CO")}`}
            />
            <SummaryRow
              label="Descuento"
              value={`$${Number(sale.discount || 0).toLocaleString("es-CO")}`}
            />
            <SummaryRow
              label="Total"
              value={`$${Number(sale.total || 0).toLocaleString("es-CO")}`}
              strong={true}
            />
          </div>
        </section>

        {/* Historial */}
        <section className="rounded-3xl bg-white/70 p-6 shadow-xl backdrop-blur-md">
          <h2 className="text-lg font-bold mb-4">Historial</h2>

          <div className="space-y-3">
            {(sale.history || []).length > 0 ? (
              sale.history.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-border-strong bg-white/60 px-4 py-3"
                >
                  <p className="font-semibold">{item.action}</p>
                  <p className="text-sm text-label/80 mt-1">{item.detail}</p>
                  <p className="text-xs text-label/60 mt-2">
                    {item.date} · {item.user?.name || "Sistema"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-label/70">
                No hay historial disponible para esta venta.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Confirmación de aprobación */}
      <Modal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        title="Confirmar aprobación"
        message="¿Está seguro de aprobar esta compra? Esta acción completará la venta y notificará al cliente."
      >
        <div className="flex justify-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => setIsApproveModalOpen(false)}
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={handleApproveSale}
            disabled={approving}
          >
            Aprobar
          </Button>
        </div>
      </Modal>
    </div>
  );
}

/**
 * Fila simple de resumen.
 */
function SummaryRow({ label, value, strong = false }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className={strong ? "font-bold text-label" : "text-label"}>
        {label}
      </span>
      <span className={strong ? "font-bold text-label text-right" : "text-label text-right"}>
        {value}
      </span>
    </div>
  );
}