import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Button from "@/shared/components/Button";

import {
  fetchSaleDetail,
  downloadSaleInvoice,
} from "@/lib/http/sales";
import { mapSaleDetailResponse } from "@/lib/adapters/salesAdapter";

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
 * Dispara la descarga del archivo en navegador.
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

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={strong ? "font-bold text-label" : "text-gray-700"}>
        {label}
      </span>
      <span className={strong ? "font-bold text-label text-right" : "text-gray-700 text-right"}>
        {value}
      </span>
    </div>
  );
}

/**
 * Pantalla de detalle de venta.
 *
 * Funcionalidades:
 * - consulta detalle real
 * - muestra líneas e historial
 * - permite descargar factura PDF
 */
export default function SaleDetailPage() {
  const { saleId } = useParams();

  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [downloading, setDownloading] = useState(false);

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
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            error?.error?.message || "No se pudo cargar el detalle de la venta."
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

  const handleDownloadInvoice = async () => {
    if (!sale?.id) return;

    setDownloading(true);

    try {
      const response = await downloadSaleInvoice(sale.id);
      const blob = await extractBlobPayload(response);

      triggerBlobDownload(
        blob,
        `factura_${sale.invoiceNumber || sale.id}.pdf`
      );
    } catch (error) {
      setLoadError(
        error?.error?.message || "No se pudo descargar la factura."
      );
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-8 text-label">
        <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <p>Cargando detalle de la venta...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen px-4 py-8 text-label">
        <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <p className="text-red-600">{loadError}</p>

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

  if (!sale) {
    return null;
  }

  return (
    <div className="min-h-screen px-4 py-8 text-label">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Encabezado */}
        <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Detalle de venta</h1>
              <p className="text-sm mt-1">
                Factura {sale.invoiceNumber}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/sales/list">
                <Button variant="secondary" size="sm">
                  Volver
                </Button>
              </Link>

              <Link to={`/sales/editar/${sale.id}`}>
                <Button variant="secondary" size="sm">
                  Editar
                </Button>
              </Link>

              <Link to={`/sales/anular/${sale.id}`}>
                <Button variant="secondary" size="sm">
                  Anular
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
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-6">
          {/* Resumen */}
          <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6 space-y-3">
            <h2 className="text-lg font-bold">Resumen</h2>

            <SummaryRow label="Factura" value={sale.invoiceNumber} />
            <SummaryRow label="Fecha y hora" value={sale.saleDateTime} />
            <SummaryRow label="Cliente" value={sale.customer} />
            <SummaryRow label="Correo cliente" value={sale.customerEmail} />
            <SummaryRow label="Farmaceuta" value={sale.pharmacist} />
            <SummaryRow label="Aprobador" value={sale.approver || "—"} />
            <SummaryRow label="Tipo de pago" value={sale.paymentType} />
            <SummaryRow label="Estado" value={sale.status} />
            <SummaryRow label="Subtotal" value={`$${Number(sale.subtotal).toLocaleString("es-CO")}`} />
            <SummaryRow label="IVA" value={`$${Number(sale.iva).toLocaleString("es-CO")}`} />
            <SummaryRow label="Descuento" value={`$${Number(sale.discount).toLocaleString("es-CO")}`} />
            <SummaryRow
              label="Total"
              value={`$${Number(sale.total).toLocaleString("es-CO")}`}
              strong={true}
            />
          </section>

          {/* Líneas */}
          <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6">
            <h2 className="text-lg font-bold mb-4">Medicamentos</h2>

            <div className="space-y-3">
              {sale.lines.map((line) => (
                <div
                  key={line.id}
                  className="rounded-2xl border border-border-strong p-4 bg-white/60"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="font-semibold">{line.medicationName}</p>
                      <p className="text-sm text-label/80">
                        Cantidad: {line.quantity}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-label/80">
                        Unitario: ${Number(line.unitPrice).toLocaleString("es-CO")}
                      </p>
                      <p className="font-semibold">
                        Subtotal: ${Number(line.lineSubtotal).toLocaleString("es-CO")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Historial */}
        <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6">
          <h2 className="text-lg font-bold mb-4">Historial</h2>

          <div className="space-y-3">
            {sale.history.map((entry) => (
              <div
                key={entry.id}
                className="rounded-2xl border border-border-strong p-4 bg-white/60"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
                  <div>
                    <p className="font-semibold">{entry.action}</p>
                    <p className="text-sm text-label/80">{entry.detail}</p>
                  </div>

                  <div className="text-sm text-label/70 lg:text-right">
                    <p>{entry.date}</p>
                    <p>{entry.userName}</p>
                    <p>{entry.userEmail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}