// import { CreditCard } from "lucide-react";

// /**
//  * Aplica máscara visual al número de tarjeta.
//  * No altera el valor original del formulario.
//  */
// function maskCardNumber(cardNumber = "") {
//   const digits = String(cardNumber || "").replace(/\D/g, "").slice(0, 16);

//   if (!digits) {
//     return "•••• •••• •••• ••••";
//   }

//   const padded = digits.padEnd(16, "•");
//   return padded.replace(/(.{4})/g, "$1 ").trim();
// }

// /**
//  * Renderiza un logo textual simple por franquicia.
//  * Mantiene la estética del proyecto sin depender de archivos externos.
//  */
// function CardBrandLogo({ brandName = "Tarjeta" }) {
//   if (brandName === "Visa") {
//     return (
//       <div className="flex items-center justify-end">
//         <span className="text-lg font-black italic tracking-tight text-white">
//           VISA
//         </span>
//       </div>
//     );
//   }

//   if (brandName === "Mastercard") {
//     return (
//       <div className="flex items-center gap-2">
//         <div className="relative h-6 w-10">
//           <span className="absolute left-0 top-0 h-6 w-6 rounded-full bg-red-500/90" />
//           <span className="absolute left-4 top-0 h-6 w-6 rounded-full bg-orange-400/90" />
//         </div>
//         <span className="text-xs font-semibold text-white/95">
//           mastercard
//         </span>
//       </div>
//     );
//   }

//   if (brandName === "American Express") {
//     return (
//       <div className="rounded-md border border-white/30 bg-white/15 px-2 py-1">
//         <span className="text-[10px] font-bold tracking-wider text-white">
//           AMERICAN
//         </span>
//         <div className="text-[10px] font-bold tracking-wider text-white">
//           EXPRESS
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-end">
//       <CreditCard className="size-5 text-white/85" />
//     </div>
//   );
// }

// export default function SaleCardPreview({
//   cardNumber,
//   cardHolder,
//   cardExpiry,
//   bankName = "Tarjeta bancaria",
//   brandName = "Tarjeta",
//   gradientClasses = "from-slate-800 to-slate-500",
//   issuerLabel = "Red bancaria",
//   accentText = "Pago seguro",
//   chipToneClasses = "from-slate-200 to-slate-400",
//   textToneClasses = "text-white",
//   productLabel = "Débito",
//   cardType = "debit",
// }) {
//   const maskedNumber = maskCardNumber(cardNumber);
//   const safeHolder = cardHolder?.trim() || "NOMBRE DEL TITULAR";
//   const safeExpiry = cardExpiry?.trim() || "MM/YY";

//   return (
//     <section
//   className={`
//     relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradientClasses}
//     shadow-xl p-6 min-h-[220px] xl:min-h-[205px]
//     transition-all duration-300
//   `}
// >
//       <div className="absolute inset-0 bg-white/5 pointer-events-none" />
//       <div className="absolute -top-10 -right-10 size-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />
//       <div className="absolute -bottom-10 -left-10 size-28 rounded-full bg-black/10 blur-2xl pointer-events-none" />

//       <div className={`relative z-10 h-full flex flex-col justify-between ${textToneClasses}`}>
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <p className="text-xs uppercase tracking-[0.26em] opacity-85">
//               {bankName}
//             </p>
//             <p className="mt-1 text-[11px] opacity-75">
//               {accentText}
//             </p>
//           </div>

//           <div className="text-right">
//             <CardBrandLogo brandName={brandName} />
//             <p className="mt-1 text-[11px] opacity-75">
//               {issuerLabel}
//             </p>
//           </div>
//         </div>

//         <div className="mt-6 flex items-center justify-between">
//           <div
//             className={`
//               h-11 w-16 rounded-xl border border-white/30 shadow-inner
//               bg-gradient-to-br ${chipToneClasses}
//             `}
//           />

//           <div className="flex items-center gap-2">
//             <span className="text-xs font-medium uppercase tracking-wider opacity-80">
//               {productLabel}
//             </span>
//             <CreditCard className="size-5 opacity-80" />
//           </div>
//         </div>

//         <div className="mt-6">
//           <p className="text-xl md:text-2xl font-semibold tracking-[0.18em]">
//             {maskedNumber}
//           </p>
//         </div>

//         <div className="mt-6 flex items-end justify-between gap-4">
//           <div>
//             <p className="text-[10px] uppercase opacity-70">
//               Titular
//             </p>
//             <p className="text-sm font-medium tracking-wide">
//               {safeHolder.toUpperCase()}
//             </p>
//           </div>

//           <div className="text-right">
//             <p className="text-[10px] uppercase opacity-70">
//               Vence
//             </p>
//             <p className="text-sm font-medium">
//               {safeExpiry}
//             </p>
//           </div>
//         </div>

//         <div className="mt-5 flex items-center justify-between text-[11px] opacity-75">
//           <span>{cardType === "debit" ? "Tarjeta débito" : "Tarjeta crédito"}</span>
//           <span>2026 ©</span>
//         </div>
//       </div>
//     </section>
//   );
// }
import { CreditCard } from "lucide-react";

/**
 * Aplica máscara visual al número de tarjeta.
 * No altera el valor original del formulario.
 */
function maskCardNumber(cardNumber = "") {
  const digits = String(cardNumber || "").replace(/\D/g, "").slice(0, 16);

  if (!digits) {
    return "•••• •••• •••• ••••";
  }

  const padded = digits.padEnd(16, "•");
  return padded.replace(/(.{4})/g, "$1 ").trim();
}

/**
 * Máscara visual del CVV para el reverso.
 */
function maskCvv(cvv = "") {
  const digits = String(cvv || "").replace(/\D/g, "").slice(0, 4);

  if (!digits) {
    return "•••";
  }

  return digits.padEnd(3, "•");
}

/**
 * Renderiza un logo visual simple por franquicia.
 */
function CardBrandLogo({ brandName = "Tarjeta" }) {
  if (brandName === "Visa") {
    return (
      <div className="flex items-center justify-end">
        <span className="text-base sm:text-lg font-black italic tracking-tight text-white">
          VISA
        </span>
      </div>
    );
  }

  if (brandName === "Mastercard") {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="relative h-5 w-8 sm:h-6 sm:w-10">
          <span className="absolute left-0 top-0 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-red-500/90" />
          <span className="absolute left-3 top-0 sm:left-4 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-orange-400/90" />
        </div>

        <span className="text-[10px] sm:text-xs font-semibold text-white/95">
          mastercard
        </span>
      </div>
    );
  }

  if (brandName === "American Express") {
    return (
      <div className="rounded-md border border-white/30 bg-white/15 px-2 py-1">
        <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-white">
          AMERICAN
        </span>
        <div className="text-[9px] sm:text-[10px] font-bold tracking-wider text-white">
          EXPRESS
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end">
      <CreditCard className="size-4 sm:size-5 text-white/85" />
    </div>
  );
}

/**
 * Cara frontal de la tarjeta.
 */
function CardFront({
  cardNumber,
  cardHolder,
  cardExpiry,
  bankName,
  brandName,
  issuerLabel,
  accentText,
  chipToneClasses,
  textToneClasses,
  productLabel,
  cardType,
}) {
  const maskedNumber = maskCardNumber(cardNumber);
  const safeHolder = cardHolder?.trim() || "NOMBRE DEL TITULAR";
  const safeExpiry = cardExpiry?.trim() || "MM/YY";

  return (
    <div
      className={`
        absolute inset-0 rounded-3xl
        p-4 sm:p-5 lg:p-6
        ${textToneClasses}
      `}
      style={{ backfaceVisibility: "hidden" }}
    >
      <div className="absolute inset-0 rounded-3xl bg-white/5 pointer-events-none" />
      <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 pointer-events-none" />
      <div className="absolute -top-8 -right-8 sm:-top-10 sm:-right-10 size-24 sm:size-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 sm:-bottom-10 sm:-left-10 size-20 sm:size-28 rounded-full bg-black/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Encabezado */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.24em] opacity-85 truncate">
              {bankName}
            </p>
            <p className="mt-1 text-[10px] sm:text-[11px] opacity-75 truncate">
              {accentText}
            </p>
          </div>

          <div className="text-right shrink-0">
            <CardBrandLogo brandName={brandName} />
            <p className="mt-1 text-[9px] sm:text-[10px] opacity-75">
              {issuerLabel}
            </p>
          </div>
        </div>

        {/* Zona media */}
        <div className="mt-4 sm:mt-5 flex items-center justify-between gap-3">
          <div
            className={`
              relative h-9 w-14 sm:h-10 sm:w-16
              rounded-xl border border-white/25 shadow-inner
              bg-gradient-to-br ${chipToneClasses}
              shrink-0
            `}
          >
            <div className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-white/20" />
            <div className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-white/15" />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-right">
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider opacity-80">
              {productLabel}
            </span>
            <CreditCard className="size-4 sm:size-5 opacity-80 shrink-0" />
          </div>
        </div>

        {/* Número */}
        <div className="mt-4 sm:mt-5">
          <p className="text-[18px] sm:text-[22px] lg:text-[24px] font-semibold tracking-[0.10em] sm:tracking-[0.14em] leading-none">
            {maskedNumber}
          </p>
        </div>

        {/* Datos inferiores */}
        <div className="mt-4 sm:mt-5 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] uppercase opacity-70">
              Titular
            </p>
            <p className="mt-1 text-xs sm:text-sm font-medium tracking-wide truncate max-w-[150px] sm:max-w-[220px] md:max-w-[260px]">
              {safeHolder.toUpperCase()}
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-[9px] sm:text-[10px] uppercase opacity-70">
              Vence
            </p>
            <p className="mt-1 text-xs sm:text-sm font-medium">
              {safeExpiry}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 sm:pt-4 flex items-center justify-between gap-3 text-[10px] sm:text-[11px] opacity-75">
          <span className="truncate">
            {cardType === "debit" ? "Tarjeta débito" : "Tarjeta crédito"}
          </span>
          <span className="shrink-0">2026 ©</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Cara posterior de la tarjeta.
 */
function CardBack({ cvv, brandName, textToneClasses }) {
  return (
    <div
      className={`
        absolute inset-0 rounded-3xl
        p-4 sm:p-5 lg:p-6
        ${textToneClasses}
      `}
      style={{
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
      }}
    >
      <div className="absolute inset-0 rounded-3xl bg-black/10 pointer-events-none" />
      <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          {/* Banda magnética */}
          <div className="mt-2 sm:mt-3 h-9 sm:h-10 w-full rounded-md bg-black/75" />

          {/* Banda CVV */}
          <div className="mt-4 sm:mt-5 flex justify-end">
            <div className="w-full max-w-[165px] sm:max-w-[210px] rounded-lg bg-white/90 p-2.5 sm:p-3 text-right text-slate-900 shadow-md">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-slate-500 mb-1">
                CVV
              </p>
              <p className="text-sm sm:text-base font-bold tracking-[0.22em]">
                {maskCvv(cvv)}
              </p>
            </div>
          </div>

          {/* Texto y logo */}
          <div className="mt-5 sm:mt-6 flex items-start justify-between gap-4">
            <div className="max-w-[68%]">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wide opacity-75">
                Reverso de seguridad
              </p>
              <p className="mt-1 text-[10px] sm:text-[11px] opacity-70 leading-relaxed">
                Esta es una simulación visual del reverso de la tarjeta.
              </p>
            </div>

            <div className="shrink-0 mt-1">
              <CardBrandLogo brandName={brandName} />
            </div>
          </div>
        </div>

        <div className="pt-3 sm:pt-4 text-[10px] sm:text-[11px] opacity-70">
          Código de seguridad protegido
        </div>
      </div>
    </div>
  );
}

export default function SaleCardPreview({
  cardNumber,
  cardHolder,
  cardExpiry,
  cardCvv = "",
  bankName = "Tarjeta bancaria",
  brandName = "Tarjeta",
  gradientClasses = "from-slate-800 to-slate-500",
  issuerLabel = "Red bancaria",
  accentText = "Pago seguro",
  chipToneClasses = "from-slate-200 to-slate-400",
  textToneClasses = "text-white",
  productLabel = "Débito",
  cardType = "debit",
  showBack = false,
}) {
  return (
    <section className="w-full mx-auto">
      <div
        key={`${bankName}-${brandName}-${gradientClasses}`}
        className={`
          relative w-full rounded-3xl bg-gradient-to-br ${gradientClasses}
          shadow-[0_18px_45px_rgba(0,0,0,0.18)]
          aspect-[1.62/1]
          min-h-[210px] sm:min-h-[230px]
          transition-all duration-500 ease-out
          [perspective:1200px]
          overflow-hidden
        `}
      >
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: showBack ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <CardFront
            cardNumber={cardNumber}
            cardHolder={cardHolder}
            cardExpiry={cardExpiry}
            bankName={bankName}
            brandName={brandName}
            issuerLabel={issuerLabel}
            accentText={accentText}
            chipToneClasses={chipToneClasses}
            textToneClasses={textToneClasses}
            productLabel={productLabel}
            cardType={cardType}
          />

          <CardBack
            cvv={cardCvv}
            brandName={brandName}
            textToneClasses={textToneClasses}
          />
        </div>
      </div>
    </section>
  );
}