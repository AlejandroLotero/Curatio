import { CreditCard, ShieldCheck } from "lucide-react";

/**
 * Vista previa visual de la tarjeta.
 *
 * Se mantiene desacoplada del formulario principal para:
 * - mejorar la lectura del checkout
 * - permitir reuso futuro
 * - cumplir el requerimiento visual de separar la simulación
 */
export default function SaleCardPreview({
  cardNumber,
  cardHolder,
  cardExpiry,
  bankName,
  brandName,
  gradientClasses,
}) {
  return (
    <section className="rounded-3xl bg-white/70 backdrop-blur-md shadow-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <CreditCard className="size-5" />
        <div>
          <h3 className="text-lg font-bold">Vista previa de la tarjeta</h3>
          <p className="text-sm text-label/80">
            Simulación visual del medio de pago.
          </p>
        </div>
      </div>

      <div
        className={`
          rounded-3xl p-6 text-white shadow-lg bg-gradient-to-br
          ${gradientClasses}
        `}
      >
        <div className="flex items-center justify-between mb-8">
          <span className="text-sm font-semibold opacity-90">{bankName}</span>
          <span className="text-sm font-semibold opacity-90">{brandName}</span>
        </div>

        <div className="mb-8">
          <p className="tracking-[0.30em] text-lg sm:text-xl font-semibold">
            {cardNumber || "0000 0000 0000 0000"}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase opacity-80">Titular</p>
            <p className="text-sm font-medium">
              {cardHolder || "NOMBRE DEL TITULAR"}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] uppercase opacity-80">Vence</p>
            <p className="text-sm font-medium">{cardExpiry || "MM/YY"}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-label/80">
        <ShieldCheck className="size-4" />
        <span>
          Simulación visual de la entidad detectada por los primeros dígitos.
        </span>
      </div>
    </section>
  );
}