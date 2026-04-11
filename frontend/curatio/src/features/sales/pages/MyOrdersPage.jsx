import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "@/shared/components/Button";
import { fetchSalesList } from "@/lib/http/sales";
import { mapSalesListResponse } from "@/lib/adapters/salesAdapter";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetchSalesList();
        const mapped = mapSalesListResponse(response);
        setOrders(mapped);
      } catch (err) {
        setError(err?.error?.message || "No se pudieron cargar tus pedidos.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-8 text-label">
        <div className="max-w-5xl mx-auto rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-md text-center">
          Cargando tus pedidos...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen px-4 py-8 text-label">
        <div className="max-w-5xl mx-auto rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-md">
          <h1 className="text-2xl font-bold mb-4">Mis pedidos</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 text-label">
      <div className="max-w-5xl mx-auto rounded-3xl bg-white/70 p-6 shadow-xl backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-6">Mis pedidos</h1>

        {orders.length === 0 ? (
          <p>No tienes pedidos registrados.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-border-strong bg-white/70 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">
                      Factura: {order.invoiceNumber || `#${order.id}`}
                    </p>
                    <p className="text-sm text-label">
                      Fecha: {order.saleDateTime || "—"}
                    </p>
                    <p className="text-sm text-label">
                      Estado: {order.status || "—"}
                    </p>
                    <p className="text-sm text-label">
                      Total: ${Number(order.total || 0).toLocaleString("es-CO")}
                    </p>
                  </div>

                  <Link to={`/my-orders/${order.id}`}>
                    <Button variant="primary" size="sm">
                      Ver detalle
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}