import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/shared/components";

/**
 * Estado que envía PaymentsView al navegar tras "Pagar" en el modal.
 * @typedef {Object} PaymentConfirmationState
 * @property {string} [transactionStatus]
 * @property {string} [merchantName]
 * @property {string} [paymentDate]
 * @property {string} [concept]
 * @property {string} [paymentMethod]
 * @property {number} [subtotal]
 * @property {number} [total]
 */

/**
 * ConfirmPayment
 * --------------
 * Pantalla de transacción exitosa (resumen tipo pasarela).
 * Recibe los datos por `location.state` desde PaymentsView.
 */
export default function ConfirmPayment() {
  const location = useLocation();
  const navigate = useNavigate();

  /** @type {PaymentConfirmationState | null} */
  const data = location.state ?? null;

  useEffect(() => {
    if (!location.state) {
      navigate("/sales/pagos", { replace: true });
    }
  }, [location.state, navigate]);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sky-100/80 text-label">
        <p className="text-sm">Redirigiendo…</p>
      </div>
    );
  }

  const {
    transactionStatus = "Aprobada",
    merchantName = " Curatio",
    paymentDate = "",
    concept = "—",
    paymentMethod = "—",
    subtotal = 0,
    total = 0,
  } = data;

  const fmt = (n) => `$${Number(n || 0).toLocaleString("es-CO")}`;

  const rows = [
    { label: "Estado de la transacción", value: transactionStatus },
    { label: "Nombre del comercio", value: merchantName },
    { label: "Fecha de pago", value: paymentDate },
    { label: "Concepto", value: concept },
    { label: "Método de pago", value: paymentMethod },
    { label: "Costo subtotal", value: fmt(subtotal) },
  ];

  return (
    <div // Div principal que contiene el contenido de la página
      className="
        min-h-screen px-4 py-10 text-label
        sm:px-6 sm:py-12
      ">
        <div //Din que comtiene la informacion de la transaccion
          className=" mx-auto max-w-lg
            rounded-2xl border-1 border-border-strong bg-white px-6 py-8 shadow-lg
            sm:px-10 sm:py-10
          "
        >
          <div className="mb-6 flex flex-col items-center text-center"> {/* Div que contiene el titulo y el icono de la transaccion exitosa */}  
            <div // Div que contiene el icono de la transaccion exitosa
              className=" 
                mb-4 flex h-16 w-16 items-center justify-center rounded-full
                bg-emerald-500 text-white shadow-md
              "
              aria-hidden // Oculta el icono de la transaccion exitosa para que no se muestre en el HTML
            >
              <Check className="h-9 w-9 stroke-[3]" />
            </div>
            <h1 className="text-xl font-semibold text-label sm:text-2xl">
              Transacción exitosa
            </h1>
          </div>

          <dl className="space-y-3 text-sm sm:text-base"> {/* Lista de datos de la transaccion */}
            {rows.map(({ label, value }) => (
              <div // Div que contiene el label y el valor de la transaccion
                key={label} 
                className="flex flex-row items-baseline justify-between gap-3" 
              > 
                <dt className="max-w-[48%] shrink-0 font-normal text-label/85"> {/* Label de la transaccion */}
                  {label}:
                </dt>
                <dd className="min-w-0 text-right font-medium text-label"> {/* Valor de la transaccion */}
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="my-5 border-t border-border-strong" /> {/* Linea horizontal que separa el titulo de la transaccion del total de la transaccion */}

          <div className="mb-8 flex items-center justify-between text-base font-bold text-label sm:text-lg"> {/* Div que contiene el total de la transaccion */}
            <span>Total</span>
            <span>{fmt(total)}</span>
          </div>

          <div className="flex justify-center"> {/* Div que contiene el boton de finalizar */}
            <Button
              variant="primary"
              size="md"
              type="button"
              onClick={() => navigate("/", { replace: true })}
            >
              Finalizar
            </Button>
          </div>
        </div>
    </div>
  );
}
