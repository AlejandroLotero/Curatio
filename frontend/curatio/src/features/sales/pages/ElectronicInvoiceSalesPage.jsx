// import Input from "@/shared/components/Input";
// import Buttom from "@/shared/components/Button";
// import Select from "@/shared/components/Select";
// import { useEffect, useState } from "react";
// import { getStateSaleTypes, getPaymentsTypes } from "../services/selectServices";

// export default function ElectronicInvoiceSalesPage() {
//   const [stateSaleTypes, setStateSaleTypes] = useState([]);
//   const [paymentsTypes, setPaymentsTypes] = useState([]);

//   useEffect(() => {
//     getStateSaleTypes().then(setStateSaleTypes);
//   }, []);

//   useEffect(() => {
//     getPaymentsTypes().then(setPaymentsTypes);
//   }, []);

//   return (
//     <div className="flex items-center justify-center min-h-screen text-label px-4 py-6 sm:px-6 sm:py-8 w-full min-w-0 overflow-x-hidden">
//       <form
//         className="
//           w-full max-w-full sm:max-w-xl md:max-w-2xl
//           min-w-0
//           px-4 py-8 sm:px-6 sm:py-12
//           grid grid-cols-1 gap-4
//           bg-white/70 dark:bg-neutral-900/20
//           backdrop-blur-md
//           shadow-xl
//           ring-1
//           rounded-2xl sm:rounded-3xl
//         "
//       >
//         <h2
//           className="
//             text-center
//             text-base sm:text-lg md:text-subtittles
//             font-bold
//             text-label
//             col-span-full
//             mb-2 sm:mb-4
//             wrap-break-word
//           "
//         >
//           RECIBO DE VENTA
//         </h2>

//         {/* Campos en columna única */}
//         <div className="flex flex-col gap-4 w-full max-w-full sm:max-w-[320px] mx-auto min-w-0">
//           <Input
//             label="Número de factura"
//             placeholder="FEV00001"
//             name="invoiceNumber"
//           />
//           <Input
//             label="Fecha y hora de la venta"
//             placeholder="2025-11-30 19:40:55"
//             name="saleDateTime"
//           />
//           <Input label="Cliente" placeholder="Juan Pérez" name="customer" />
//           <Input label="Farmaceuta" placeholder="Ana Vázquez" name="pharmacist" />
//         </div>

//         {/* Campos financieros en grid 2 columnas */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-full sm:max-w-130 mx-auto min-w-0 items-start">
//           <Input
//             label="Subtotal"
//             placeholder="100000,00"
//             name="subtotal"
//             type="number"
//             wrapperClassName="w-full min-w-0"
//           />
//           <Input
//             label="IVA"
//             placeholder="19"
//             name="iva"
//             type="number"
//             wrapperClassName="w-full min-w-0"
//           />
//           <Input
//             label="Descuento"
//             placeholder="25"
//             name="discount"
//             type="number"
//             wrapperClassName="w-full min-w-0"
//           />
//           <Input
//             label="Total"
//             placeholder="750000,00"
//             name="total"
//             type="number"
//             wrapperClassName="w-full min-w-0"
//           />
//         </div>

//         {/* Selects en grid 2 columnas */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-full sm:max-w-130 mx-auto min-w-0 items-start">
//           <Select
//             label="Tipo de pago"
//             name="paymentType"
//             options={paymentsTypes}
//             placeholder="Tipo de pago"
//             wrapperClassName="w-full min-w-0"
//           />
//           <Select
//             label="Estado de venta"
//             name="saleStatus"
//             options={stateSaleTypes}
//             placeholder="Estado de venta"
//             wrapperClassName="w-full min-w-0"
//           />
//         </div>

//         {/* Botones */}
//         <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-0 w-full max-w-full sm:max-w-130 mx-auto mt-6 min-w-0">
//           <Buttom variant="secondary" size="sm" type="button">
//             Cancelar
//           </Buttom>
//           <Buttom variant="primary" size="sm" type="button">
//             Ver carrito
//           </Buttom>
//         </div>
//       </form>
//     </div>
//   );
// }

// =========================
// IMPORTS PRINCIPALES
// =========================
// React
import { useEffect, useMemo, useState } from "react";

// Router
import { useNavigate } from "react-router-dom";

// Design system actual del proyecto
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import Modal from "@/shared/components/Modal";

// Contextos reales ya existentes
import { useCart } from "@/features/cartshop/context/CartContext";
import { useAuth } from "@/features/auth/context/AuthContext";

// Iconografía ya alineada con el proyecto
import {
  CreditCard,
  Landmark,
  ReceiptText,
  ShieldCheck,
  Store,
  Truck,
  Wallet,
  CircleAlert,
  BadgeCheck,
} from "lucide-react";

/**
 * =========================
 * CONSTANTES LOCALES DE UI
 * =========================
 * Se dejan dentro del archivo porque:
 * - aún no vamos a tocar services/*
 * - aún no vamos a tocar api_views.py
 * - aún no vamos a tocar models.py
 *
 * Más adelante estas constantes pueden moverse a:
 * features/sales/constants/*
 */

// Métodos de entrega
const DELIVERY_METHODS = [
  {
    id: "delivery",
    value: "delivery",
    label: "Domicilio",
    description: "Entrega en la dirección registrada por el cliente.",
    icon: Truck,
  },
  {
    id: "pickup",
    value: "pickup",
    label: "Retirar en punto",
    description: "Recoge tu pedido en uno de nuestros puntos de entrega.",
    icon: Store,
  },
];

// Métodos de pago
const PAYMENT_METHODS = [
  {
    id: "card",
    value: "card",
    label: "Tarjeta débito / crédito",
    description: "Visa, Mastercard, American Express y otras redes.",
    icon: CreditCard,
  },
  {
    id: "pse",
    value: "pse",
    label: "PSE",
    description: "Débito desde cuenta bancaria.",
    icon: Landmark,
  },
  {
    id: "paypal",
    value: "paypal",
    label: "PayPal",
    description: "Pago con cuenta PayPal.",
    icon: Wallet,
  },
];

// Bancos para PSE
const PSE_BANK_OPTIONS = [
  { id: "bancolombia", value: "bancolombia", label: "Bancolombia" },
  { id: "bbva", value: "bbva", label: "BBVA" },
  { id: "davivienda", value: "davivienda", label: "Davivienda" },
  { id: "bogota", value: "bogota", label: "Banco de Bogotá" },
  { id: "occidente", value: "occidente", label: "Banco de Occidente" },
  { id: "avvillas", value: "avvillas", label: "AV Villas" },
  { id: "itau", value: "itau", label: "Itaú" },
  { id: "nequi", value: "nequi", label: "Nequi" },
];

// Tipos de documento para PSE / validaciones
const DOCUMENT_TYPE_OPTIONS = [
  { id: "CC", value: "CC", label: "CC" },
  { id: "CE", value: "CE", label: "CE" },
  { id: "TI", value: "TI", label: "TI" },
  { id: "NIT", value: "NIT", label: "NIT" },
  { id: "PEP", value: "PEP", label: "PEP" },
  { id: "PPT", value: "PPT", label: "PPT" },
];

// Cuotas de tarjeta de crédito
const INSTALLMENT_OPTIONS = [
  { id: "1", value: "1", label: "1 cuota" },
  { id: "2", value: "2", label: "2 cuotas" },
  { id: "3", value: "3", label: "3 cuotas" },
  { id: "6", value: "6", label: "6 cuotas" },
  { id: "12", value: "12", label: "12 cuotas" },
];

/**
 * =========================
 * UTILIDADES LOCALES
 * =========================
 * Se dejan aquí por ahora para no tocar utils.py del backend
 * ni crear una capa de servicios aún.
 */

// Formatea valores a moneda COP
function formatCurrency(value) {
  return Number(value || 0).toLocaleString("es-CO");
}

// Limpia cualquier cosa que no sea número
function onlyDigits(value = "") {
  return String(value).replace(/\D/g, "");
}

// Formato visual de número de tarjeta
function formatCardNumber(value = "") {
  const digits = onlyDigits(value).slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

// Formato MM/YY
function formatExpiry(value = "") {
  const digits = onlyDigits(value).slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
}

// Detecta red de tarjeta por prefijo
function detectCardBrand(cardNumber = "") {
  const digits = onlyDigits(cardNumber);

  if (/^4/.test(digits)) {
    return "Visa";
  }

  if (/^(5[1-5]|2[2-7])/.test(digits)) {
    return "Mastercard";
  }

  if (/^3[47]/.test(digits)) {
    return "American Express";
  }

  return "Tarjeta";
}

// Detecta banco por BIN de forma simulada pero realista
function detectCardBank(cardNumber = "") {
  const digits = onlyDigits(cardNumber);

  // Prefijos simulados de ejemplo para experiencia visual
  if (/^(457562|4558|4110)/.test(digits)) {
    return "BBVA";
  }

  if (/^(528209|530373|552244)/.test(digits)) {
    return "Bancolombia";
  }

  if (/^(402360|450995|451760)/.test(digits)) {
    return "Davivienda";
  }

  if (/^(451714|438935)/.test(digits)) {
    return "Banco de Bogotá";
  }

  return "Entidad financiera";
}

// Color visual de la tarjeta según red / banco detectado
function getCardPreviewClasses(cardNumber = "") {
  const bank = detectCardBank(cardNumber);
  const brand = detectCardBrand(cardNumber);

  if (bank === "BBVA") {
    return "from-blue-900 to-sky-500";
  }

  if (bank === "Bancolombia") {
    return "from-yellow-500 to-blue-700";
  }

  if (bank === "Davivienda") {
    return "from-red-700 to-red-400";
  }

  if (bank === "Banco de Bogotá") {
    return "from-red-900 to-rose-500";
  }

  if (brand === "American Express") {
    return "from-slate-800 to-cyan-600";
  }

  if (brand === "Visa") {
    return "from-indigo-900 to-blue-500";
  }

  if (brand === "Mastercard") {
    return "from-zinc-900 to-orange-500";
  }

  return "from-slate-800 to-slate-500";
}

// Simula respuesta de pasarela
// Regla de prueba:
// - si el número de tarjeta termina en 0 => rechazado
// - si el documento PSE termina en 0 => rechazado
// - en los demás casos => aprobado
function simulateGatewayDecision({ paymentMethod, cardNumber, documentNumber }) {
  const safeCardNumber = onlyDigits(cardNumber);
  const safeDocumentNumber = onlyDigits(documentNumber);

  if (paymentMethod === "card" && safeCardNumber.endsWith("0")) {
    return "rejected";
  }

  if (paymentMethod === "pse" && safeDocumentNumber.endsWith("0")) {
    return "rejected";
  }

  return "approved";
}

// Crea un número de referencia de factura simulado
function buildInvoiceNumber() {
  const stamp = Date.now().toString().slice(-8);
  return `FEV-${stamp}`;
}

// Crea un identificador de transacción simulado
function buildTransactionId() {
  return `TX-${Date.now()}`;
}

// Devuelve fecha/hora legible
function buildDateTimeLabel() {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
}

/**
 * =========================
 * COMPONENTE PRINCIPAL
 * =========================
 */
export default function ElectronicInvoiceSalesPage() {
  const navigate = useNavigate();

  /**
   * =========================
   * CONTEXTOS REALES
   * =========================
   * - carrito actual
   * - usuario autenticado
   */
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    clearActiveCart,
  } = useCart();

  const { user, isAuthenticated } = useAuth();

  /**
   * =========================
   * ESTADOS DE CHECKOUT
   * =========================
   */

  // Paso actual del flujo:
  // 1 = entrega
  // 2 = pago
  // 3 = resultado
  const [currentStep, setCurrentStep] = useState(1);

  // Método de entrega seleccionado
  const [deliveryMethod, setDeliveryMethod] = useState("");

  // Datos del bloque de entrega
  const [deliveryForm, setDeliveryForm] = useState({
    // Datos para domicilio
    deliveryAddress: user?.address || "",
    deliveryCity: "Bogotá",
    deliveryPhone: user?.phone || "",

    // Datos para retiro
    pickupPoint: "",
    pickupContactName: user?.name || "",
    pickupContactPhone: user?.phone || "",
  });

  // Método de pago seleccionado
  const [paymentMethod, setPaymentMethod] = useState("");

  // Datos del formulario de pago
  const [paymentForm, setPaymentForm] = useState({
    // Tarjeta
    cardType: "debit",
    cardNumber: "",
    cardHolder: "",
    cardExpiry: "",
    cardCvv: "",
    cardDocumentType: "CC",
    cardDocumentNumber: "",
    installments: "1",

    // PSE
    pseBank: "",
    pseDocumentType: "CC",
    pseDocumentNumber: "",
    psePhone: user?.phone || "",

    // PayPal
    paypalEmail: user?.email || "",
    paypalFullName: user?.name || "",
  });

  // Errores por campo
  const [errors, setErrors] = useState({});

  // Modal de proceso / resultado
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // Estado del pago:
  // idle | pending_validation | approved | rejected
  const [paymentStatus, setPaymentStatus] = useState("idle");

  // Mensaje de estado
  const [statusMessage, setStatusMessage] = useState("");

  // Snapshot del comprobante para mostrar al finalizar
  const [receiptData, setReceiptData] = useState(null);

  // Estado local de "correo enviado" simulado
  const [emailSentMessage, setEmailSentMessage] = useState("");

  /**
   * =========================
   * EFFECTS DE SEGURIDAD / UX
   * =========================
   */

  // Si el carrito está vacío, regresamos al carrito operativo
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cartshop/ver-carrito", { replace: true });
    }
  }, [cartItems, navigate]);

  // Si no hay sesión activa, esta vista no debería usarse.
  // Aun así dejamos la validación por seguridad defensiva.
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        replace: true,
        state: {
          from: "/sales/factura-electronica",
          reason: "checkout_required",
        },
      });
    }
  }, [isAuthenticated, navigate]);

  /**
   * =========================
   * CÁLCULOS DE RESUMEN
   * =========================
   * Aquí dejamos la lógica en frontend por ahora.
   * Más adelante esto debe venir desde backend para que:
   * - IVA
   * - descuentos
   * - envío
   * - totales
   * queden validados de forma centralizada.
   */

  // Descuento promocional simulado:
  // si el subtotal supera 100.000, se otorgan 5.000
  const discountValue = useMemo(() => {
    if (cartSubtotal >= 100000) {
      return 5000;
    }

    return 0;
  }, [cartSubtotal]);

  // Costo de envío simulado:
  // domicilio cobra 8000, retiro no cobra envío
  const deliveryFee = useMemo(() => {
    if (deliveryMethod === "delivery") {
      return 8000;
    }

    if (deliveryMethod === "pickup") {
      return 0;
    }

    return 0;
  }, [deliveryMethod]);

  // IVA calculado sobre subtotal - descuento
  const ivaValue = useMemo(() => {
    const taxableBase = Math.max(cartSubtotal - discountValue, 0);
    return Math.round(taxableBase * 0.19);
  }, [cartSubtotal, discountValue]);

  // Total final
  const grandTotal = useMemo(() => {
    return Math.max(cartSubtotal - discountValue, 0) + ivaValue + deliveryFee;
  }, [cartSubtotal, discountValue, ivaValue, deliveryFee]);

  /**
   * =========================
   * CAMBIOS DE FORMULARIOS
   * =========================
   */

  // Cambios bloque entrega
  const handleDeliveryInputChange = (event) => {
    const { name, value } = event.target;

    setDeliveryForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpia error del campo al editar
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Cambios bloque pago
  const handlePaymentInputChange = (event) => {
    const { name, value } = event.target;

    let nextValue = value;

    // Formato visual del número de tarjeta
    if (name === "cardNumber") {
      nextValue = formatCardNumber(value);
    }

    // Formato visual MM/YY
    if (name === "cardExpiry") {
      nextValue = formatExpiry(value);
    }

    // CVV solo numérico y máximo 4
    if (name === "cardCvv") {
      nextValue = onlyDigits(value).slice(0, 4);
    }

    // Documento y teléfono solo numéricos en los campos que corresponden
    if (
      [
        "cardDocumentNumber",
        "pseDocumentNumber",
        "psePhone",
      ].includes(name)
    ) {
      nextValue = onlyDigits(value);
    }

    setPaymentForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    // Limpia error del campo al editar
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /**
   * =========================
   * VALIDACIONES DE ENTREGA
   * =========================
   */
  const validateDeliveryStep = () => {
    const nextErrors = {};

    if (!deliveryMethod) {
      nextErrors.deliveryMethod = "Debes seleccionar una forma de entrega.";
    }

    if (deliveryMethod === "delivery") {
      if (!deliveryForm.deliveryAddress.trim()) {
        nextErrors.deliveryAddress = "La dirección de entrega es obligatoria.";
      }

      if (!deliveryForm.deliveryCity.trim()) {
        nextErrors.deliveryCity = "La ciudad es obligatoria.";
      }

      if (!deliveryForm.deliveryPhone.trim()) {
        nextErrors.deliveryPhone = "El teléfono de contacto es obligatorio.";
      }
    }

    if (deliveryMethod === "pickup") {
      if (!deliveryForm.pickupPoint.trim()) {
        nextErrors.pickupPoint = "Debes seleccionar un punto de entrega.";
      }

      if (!deliveryForm.pickupContactName.trim()) {
        nextErrors.pickupContactName = "El nombre de contacto es obligatorio.";
      }

      if (!deliveryForm.pickupContactPhone.trim()) {
        nextErrors.pickupContactPhone = "El teléfono de contacto es obligatorio.";
      }
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  /**
   * =========================
   * VALIDACIONES DE PAGO
   * =========================
   */
  const validatePaymentStep = () => {
    const nextErrors = {};

    if (!paymentMethod) {
      nextErrors.paymentMethod = "Debes seleccionar un método de pago.";
    }

    // Validación para tarjeta
    if (paymentMethod === "card") {
      if (!paymentForm.cardNumber.trim()) {
        nextErrors.cardNumber = "El número de tarjeta es obligatorio.";
      }

      if (onlyDigits(paymentForm.cardNumber).length < 16) {
        nextErrors.cardNumber = "La tarjeta debe tener 16 dígitos.";
      }

      if (!paymentForm.cardHolder.trim()) {
        nextErrors.cardHolder = "El titular de la tarjeta es obligatorio.";
      }

      if (!paymentForm.cardExpiry.trim() || paymentForm.cardExpiry.length < 5) {
        nextErrors.cardExpiry = "La fecha de vencimiento es obligatoria.";
      }

      if (!paymentForm.cardCvv.trim()) {
        nextErrors.cardCvv = "El CVV es obligatorio.";
      }

      if (paymentForm.cardCvv.length < 3) {
        nextErrors.cardCvv = "El CVV debe tener al menos 3 dígitos.";
      }

      if (!paymentForm.cardDocumentType) {
        nextErrors.cardDocumentType = "El tipo de documento es obligatorio.";
      }

      if (!paymentForm.cardDocumentNumber.trim()) {
        nextErrors.cardDocumentNumber = "El número de documento es obligatorio.";
      }

      if (
        paymentForm.cardType === "credit" &&
        !paymentForm.installments
      ) {
        nextErrors.installments = "Debes seleccionar el número de cuotas.";
      }
    }

    // Validación para PSE
    if (paymentMethod === "pse") {
      if (!paymentForm.pseBank) {
        nextErrors.pseBank = "Debes seleccionar un banco.";
      }

      if (!paymentForm.pseDocumentType) {
        nextErrors.pseDocumentType = "El tipo de documento es obligatorio.";
      }

      if (!paymentForm.pseDocumentNumber.trim()) {
        nextErrors.pseDocumentNumber = "El número de documento es obligatorio.";
      }

      if (!paymentForm.psePhone.trim()) {
        nextErrors.psePhone = "El teléfono es obligatorio.";
      }
    }

    // Validación para PayPal
    if (paymentMethod === "paypal") {
      if (!paymentForm.paypalEmail.trim()) {
        nextErrors.paypalEmail = "El correo de PayPal es obligatorio.";
      }

      if (!paymentForm.paypalFullName.trim()) {
        nextErrors.paypalFullName = "El nombre completo es obligatorio.";
      }
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  /**
   * =========================
   * AVANZAR A PAGO
   * =========================
   */
  const handleContinueToPayment = () => {
    const isValid = validateDeliveryStep();

    if (!isValid) {
      return;
    }

    setCurrentStep(2);
  };

  /**
   * =========================
   * VOLVER A ENTREGA
   * =========================
   */
  const handleBackToDelivery = () => {
    setCurrentStep(1);
    setErrors({});
  };

  /**
   * =========================
   * CONFIRMAR PAGO
   * =========================
   * Aquí todavía NO se conecta con backend real.
   * Se deja el punto exacto para conectar después:
   *
   * - sales/services.py
   * - sales/api_views.py
   * - sales/emails.py
   * - sales/models.py
   *
   * Flujo actual:
   * 1. valida formulario
   * 2. muestra estado pendiente de validación
   * 3. simula respuesta de pasarela
   * 4. si aprueba, crea comprobante local y vacía carrito
   * 5. si rechaza, deja volver al carrito
   */
  const handleProcessPayment = async () => {
    const isValid = validatePaymentStep();

    if (!isValid) {
      return;
    }

    // Abre modal de estado
    setIsStatusModalOpen(true);

    // Estado intermedio solicitado por negocio
    setPaymentStatus("pending_validation");
    setStatusMessage("Tu pago está pendiente de validación.");

    // Aquí más adelante debe ir:
    // 1. creación de la venta en backend
    // 2. creación del detalle / carrito asociado
    // 3. llamada a la pasarela real
    // 4. actualización a pendiente / aprobada / anulada
    // 5. envío de correos
    await new Promise((resolve) => {
      setTimeout(resolve, 2200);
    });

    // Decisión simulada de la pasarela
    const decision = simulateGatewayDecision({
      paymentMethod,
      cardNumber: paymentForm.cardNumber,
      documentNumber:
        paymentMethod === "card"
          ? paymentForm.cardDocumentNumber
          : paymentForm.pseDocumentNumber,
    });

    // Rechazado
    if (decision === "rejected") {
      setPaymentStatus("rejected");
      setStatusMessage(
        "La transacción fue rechazada. Puedes volver al carrito o intentar nuevamente."
      );
      return;
    }

    // Construcción del comprobante local
    const nextReceipt = {
      invoiceNumber: buildInvoiceNumber(),
      transactionId: buildTransactionId(),
      createdAt: buildDateTimeLabel(),
      customerName: user?.name || "Cliente",
      customerEmail: user?.email || "",
      paymentMethod,
      deliveryMethod,
      items: [...cartItems],
      subtotal: cartSubtotal,
      discount: discountValue,
      iva: ivaValue,
      deliveryFee,
      total: grandTotal,
      paymentStatus: "confirmed",
    };

    setReceiptData(nextReceipt);

    // Pago aprobado
    setPaymentStatus("approved");
    setStatusMessage(
      "La transacción fue aprobada. La compra quedó confirmada."
    );

    // Paso 3 del flujo
    setCurrentStep(3);

    // Aquí más adelante debe ir:
    // - persistencia de factura
    // - persistencia de detalle
    // - envío de email real
    // - generación PDF real desde backend
    await clearActiveCart();
  };

  /**
   * =========================
   * DESCARGA DE COMPROBANTE
   * =========================
   * Placeholder funcional:
   * - hoy usa impresión del navegador
   * - mañana se reemplaza por PDF real desde backend
   *
   * Punto de conexión futuro:
   * - sales/services.py
   * - sales/api_views.py
   */
  const handleDownloadPdf = () => {
    window.print();
  };

  /**
   * =========================
   * ENVÍO DE COMPROBANTE
   * =========================
   * Placeholder visual:
   * - hoy solo informa que se simularía
   * - mañana debe llamar a backend
   *
   * Punto de conexión futuro:
   * - sales/emails.py
   * - sales/services.py
   */
  const handleSendReceiptByEmail = async () => {
    setEmailSentMessage("");

    await new Promise((resolve) => {
      setTimeout(resolve, 900);
    });

    setEmailSentMessage(
      "Simulación completada: el comprobante quedaría encolado para envío al correo del cliente."
    );
  };

  /**
   * =========================
   * CERRAR MODAL DE ESTADO
   * =========================
   */
  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);

    // Si fue rechazado, regresamos al flujo de pago
    if (paymentStatus === "rejected") {
      setPaymentStatus("idle");
      setStatusMessage("");
      return;
    }

    // Si fue aprobado, regresamos al carrito ya vacío
    if (paymentStatus === "approved") {
      navigate("/cartshop/ver-carrito", { replace: true });
    }
  };

  /**
   * =========================
   * VALIDACIÓN DE ROL CLIENTE
   * =========================
   * RFINV09 exige que quien pague sea CLIENTE.
   * Si más adelante deseas permitir otras reglas,
   * se cambia aquí y luego se replica en backend.
   */
  const isClientRole = user?.role === "Cliente";

  if (!isClientRole) {
    return (
      <div className="min-h-screen px-4 py-8 text-label">
        <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <CircleAlert className="size-6" />
            <h1 className="text-2xl font-bold">
              Pago restringido para este rol
            </h1>
          </div>

          <p className="mb-6">
            Esta pasarela de pago está habilitada para el rol Cliente.
            Puedes volver al carrito o continuar con otro flujo operativo.
          </p>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => navigate("/cartshop/ver-carrito")}
            >
              Volver al carrito
            </Button>

            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={() => navigate("/")}
            >
              Ir al inicio
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * =========================
   * RENDER PRINCIPAL
   * =========================
   */
  return (
    <div className="min-h-screen px-4 py-8 text-label">
      <div className="max-w-7xl mx-auto">
        {/* =========================
            ENCABEZADO DE LA PASARELA
           ========================= */}
        <div className="mb-6 rounded-3xl bg-white/70 backdrop-blur-md shadow-xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                Checkout y confirmación de pago
              </h1>
              <p className="text-sm mt-1">
                Completa la entrega, selecciona tu método de pago y confirma la compra.
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <StepBadge
                active={currentStep === 1}
                completed={currentStep > 1}
                label="Entrega"
              />
              <StepBadge
                active={currentStep === 2}
                completed={currentStep > 2}
                label="Pago"
              />
              <StepBadge
                active={currentStep === 3}
                completed={currentStep >= 3 && paymentStatus === "approved"}
                label="Confirmación"
              />
            </div>
          </div>
        </div>

        {/* =========================
            LAYOUT PRINCIPAL
           ========================= */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-6">
          {/* =========================
              COLUMNA IZQUIERDA
             ========================= */}
          <div className="space-y-6">
            {/* =========================
                PASO 1: ENTREGA
               ========================= */}
            <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <PackageSectionIcon currentStep={currentStep} />
                <div>
                  <h2 className="text-xl font-bold">
                    1. Método de entrega
                  </h2>
                  <p className="text-sm">
                    Selecciona cómo deseas recibir tu pedido.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DELIVERY_METHODS.map((option) => {
                  const Icon = option.icon;
                  const isSelected = deliveryMethod === option.value;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setDeliveryMethod(option.value);
                        setErrors((prev) => ({
                          ...prev,
                          deliveryMethod: "",
                        }));
                      }}
                      className={`
                        rounded-2xl border p-4 text-left transition
                        ${isSelected
                          ? "border-border-strong bg-white/80 shadow-md"
                          : "border-border hover:bg-white/60"}
                      `}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="size-5" />
                        <span className="font-semibold">{option.label}</span>
                      </div>

                      <p className="text-sm">{option.description}</p>
                    </button>
                  );
                })}
              </div>

              {errors.deliveryMethod ? (
                <p className="text-mostsmall text-red-600 mt-2">
                  {errors.deliveryMethod}
                </p>
              ) : null}

              {/* =========================
                  FORMULARIO DE ENTREGA
                 ========================= */}
              {deliveryMethod === "delivery" && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Dirección de entrega"
                    name="deliveryAddress"
                    value={deliveryForm.deliveryAddress}
                    onChange={handleDeliveryInputChange}
                    error={errors.deliveryAddress}
                    wrapperClassName="w-full"
                  />

                  <Input
                    label="Ciudad"
                    name="deliveryCity"
                    value={deliveryForm.deliveryCity}
                    onChange={handleDeliveryInputChange}
                    error={errors.deliveryCity}
                    wrapperClassName="w-full"
                  />

                  <Input
                    label="Teléfono de contacto"
                    name="deliveryPhone"
                    value={deliveryForm.deliveryPhone}
                    onChange={handleDeliveryInputChange}
                    error={errors.deliveryPhone}
                    wrapperClassName="w-full"
                  />
                </div>
              )}

              {deliveryMethod === "pickup" && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Punto de entrega"
                    name="pickupPoint"
                    value={deliveryForm.pickupPoint}
                    onChange={handleDeliveryInputChange}
                    options={[
                      { id: "north", value: "north", label: "Punto Norte" },
                      { id: "center", value: "center", label: "Punto Centro" },
                      { id: "south", value: "south", label: "Punto Sur" },
                    ]}
                    placeholder="Selecciona un punto"
                    error={errors.pickupPoint}
                    wrapperClassName="w-full"
                  />

                  <Input
                    label="Nombre de quien retira"
                    name="pickupContactName"
                    value={deliveryForm.pickupContactName}
                    onChange={handleDeliveryInputChange}
                    error={errors.pickupContactName}
                    wrapperClassName="w-full"
                  />

                  <Input
                    label="Teléfono de contacto"
                    name="pickupContactPhone"
                    value={deliveryForm.pickupContactPhone}
                    onChange={handleDeliveryInputChange}
                    error={errors.pickupContactPhone}
                    wrapperClassName="w-full"
                  />
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <Button
                  variant="primary"
                  size="sm"
                  type="button"
                  onClick={handleContinueToPayment}
                  disabled={!deliveryMethod}
                >
                  Continuar al pago
                </Button>
              </div>
            </section>

            {/* =========================
                PASO 2: PAGO
               ========================= */}
            {currentStep >= 2 && (
              <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ReceiptText className="size-5" />
                  <div>
                    <h2 className="text-xl font-bold">
                      2. Método de pago
                    </h2>
                    <p className="text-sm">
                      Selecciona el medio de pago y completa la información requerida.
                    </p>
                  </div>
                </div>

                {/* =========================
                    SELECTOR DE MÉTODO DE PAGO
                   ========================= */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PAYMENT_METHODS.map((option) => {
                    const Icon = option.icon;
                    const isSelected = paymentMethod === option.value;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setPaymentMethod(option.value);
                          setErrors((prev) => ({
                            ...prev,
                            paymentMethod: "",
                          }));
                        }}
                        className={`
                          rounded-2xl border p-4 text-left transition
                          ${isSelected
                            ? "border-border-strong bg-white/80 shadow-md"
                            : "border-border hover:bg-white/60"}
                        `}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className="size-5" />
                          <span className="font-semibold">{option.label}</span>
                        </div>

                        <p className="text-sm">{option.description}</p>
                      </button>
                    );
                  })}
                </div>

                {errors.paymentMethod ? (
                  <p className="text-mostsmall text-red-600 mt-2">
                    {errors.paymentMethod}
                  </p>
                ) : null}

                {/* =========================
                    FORMULARIO TARJETA
                   ========================= */}
                {paymentMethod === "card" && (
                  <div className="mt-6 grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
                    {/* Formulario izquierdo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Tipo de tarjeta"
                        name="cardType"
                        value={paymentForm.cardType}
                        onChange={handlePaymentInputChange}
                        options={[
                          { id: "debit", value: "debit", label: "Débito" },
                          { id: "credit", value: "credit", label: "Crédito" },
                        ]}
                        placeholder="Selecciona tipo"
                        error={errors.cardType}
                        wrapperClassName="w-full"
                      />

                      <Input
                        label="Número de tarjeta"
                        name="cardNumber"
                        value={paymentForm.cardNumber}
                        onChange={handlePaymentInputChange}
                        error={errors.cardNumber}
                        placeholder="1234 5678 9012 3456"
                        wrapperClassName="w-full"
                      />

                      <Input
                        label="Titular de la tarjeta"
                        name="cardHolder"
                        value={paymentForm.cardHolder}
                        onChange={handlePaymentInputChange}
                        error={errors.cardHolder}
                        placeholder="Nombre completo"
                        wrapperClassName="w-full md:col-span-2"
                      />

                      <Input
                        label="Fecha de vencimiento"
                        name="cardExpiry"
                        value={paymentForm.cardExpiry}
                        onChange={handlePaymentInputChange}
                        error={errors.cardExpiry}
                        placeholder="MM/YY"
                        wrapperClassName="w-full"
                      />

                      <Input
                        label="CVV"
                        name="cardCvv"
                        value={paymentForm.cardCvv}
                        onChange={handlePaymentInputChange}
                        error={errors.cardCvv}
                        placeholder="123"
                        wrapperClassName="w-full"
                      />

                      <Select
                        label="Tipo de documento"
                        name="cardDocumentType"
                        value={paymentForm.cardDocumentType}
                        onChange={handlePaymentInputChange}
                        options={DOCUMENT_TYPE_OPTIONS}
                        placeholder="Tipo"
                        error={errors.cardDocumentType}
                        wrapperClassName="w-full"
                      />

                      <Input
                        label="Número de documento"
                        name="cardDocumentNumber"
                        value={paymentForm.cardDocumentNumber}
                        onChange={handlePaymentInputChange}
                        error={errors.cardDocumentNumber}
                        placeholder="Número de identificación"
                        wrapperClassName="w-full"
                      />

                      {paymentForm.cardType === "credit" && (
                        <Select
                          label="Cuotas"
                          name="installments"
                          value={paymentForm.installments}
                          onChange={handlePaymentInputChange}
                          options={INSTALLMENT_OPTIONS}
                          placeholder="Selecciona cuotas"
                          error={errors.installments}
                          wrapperClassName="w-full"
                        />
                      )}
                    </div>

                    {/* Vista previa derecha */}
                    <div className="flex flex-col gap-4">
                      <div className="rounded-3xl border border-border-strong bg-white/50 p-4">
                        <h3 className="text-lg font-bold mb-4">
                          Vista previa de la tarjeta
                        </h3>

                        <div
                          className={`
                            min-h-[220px]
                            rounded-3xl
                            bg-gradient-to-br ${getCardPreviewClasses(paymentForm.cardNumber)}
                            text-white
                            p-6
                            shadow-xl
                            flex
                            flex-col
                            justify-between
                          `}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-xs uppercase tracking-widest opacity-80">
                                Banco detectado
                              </p>
                              <p className="text-lg font-semibold">
                                {detectCardBank(paymentForm.cardNumber)}
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="text-xs uppercase tracking-widest opacity-80">
                                Red
                              </p>
                              <p className="text-lg font-semibold">
                                {detectCardBrand(paymentForm.cardNumber)}
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-widest opacity-80 mb-1">
                              Número
                            </p>
                            <p className="text-xl tracking-[0.2em] font-semibold">
                              {paymentForm.cardNumber || "0000 0000 0000 0000"}
                            </p>
                          </div>

                          <div className="flex justify-between items-end gap-4">
                            <div>
                              <p className="text-xs uppercase tracking-widest opacity-80 mb-1">
                                Titular
                              </p>
                              <p className="font-semibold uppercase">
                                {paymentForm.cardHolder || "NOMBRE DEL TITULAR"}
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="text-xs uppercase tracking-widest opacity-80 mb-1">
                                Vence
                              </p>
                              <p className="font-semibold">
                                {paymentForm.cardExpiry || "MM/YY"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-sm">
                          <ShieldCheck className="size-4" />
                          <span>
                            Simulación visual de la entidad detectada por los primeros dígitos.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* =========================
                    FORMULARIO PSE
                   ========================= */}
                {paymentMethod === "pse" && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Banco"
                      name="pseBank"
                      value={paymentForm.pseBank}
                      onChange={handlePaymentInputChange}
                      options={PSE_BANK_OPTIONS}
                      placeholder="Selecciona un banco"
                      error={errors.pseBank}
                      wrapperClassName="w-full"
                    />

                    <Select
                      label="Tipo de documento"
                      name="pseDocumentType"
                      value={paymentForm.pseDocumentType}
                      onChange={handlePaymentInputChange}
                      options={DOCUMENT_TYPE_OPTIONS}
                      placeholder="Tipo"
                      error={errors.pseDocumentType}
                      wrapperClassName="w-full"
                    />

                    <Input
                      label="Número de documento"
                      name="pseDocumentNumber"
                      value={paymentForm.pseDocumentNumber}
                      onChange={handlePaymentInputChange}
                      error={errors.pseDocumentNumber}
                      wrapperClassName="w-full"
                    />

                    <Input
                      label="Teléfono"
                      name="psePhone"
                      value={paymentForm.psePhone}
                      onChange={handlePaymentInputChange}
                      error={errors.psePhone}
                      wrapperClassName="w-full"
                    />
                  </div>
                )}

                {/* =========================
                    FORMULARIO PAYPAL
                   ========================= */}
                {paymentMethod === "paypal" && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Correo de PayPal"
                      name="paypalEmail"
                      value={paymentForm.paypalEmail}
                      onChange={handlePaymentInputChange}
                      error={errors.paypalEmail}
                      wrapperClassName="w-full"
                    />

                    <Input
                      label="Nombre completo"
                      name="paypalFullName"
                      value={paymentForm.paypalFullName}
                      onChange={handlePaymentInputChange}
                      error={errors.paypalFullName}
                      wrapperClassName="w-full"
                    />
                  </div>
                )}

                {/* =========================
                    BOTONES DEL PASO PAGO
                   ========================= */}
                <div className="mt-6 flex flex-col-reverse sm:flex-row justify-between gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={handleBackToDelivery}
                  >
                    Volver a entrega
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    type="button"
                    onClick={handleProcessPayment}
                  >
                    Pagar ahora
                  </Button>
                </div>
              </section>
            )}
          </div>

          {/* =========================
              COLUMNA DERECHA: RESUMEN
             ========================= */}
          <aside className="space-y-6">
            <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-4">
                <ReceiptText className="size-5" />
                <div>
                  <h2 className="text-xl font-bold">
                    Tu carrito de compras
                  </h2>
                  <p className="text-sm">
                    Resumen consolidado de la orden.
                  </p>
                </div>
              </div>

              {/* Listado de items */}
              <div className="space-y-3 max-h-[320px] overflow-auto pr-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-border bg-white/40 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">
                          {item.productName}
                        </p>
                        <p className="text-sm">
                          Cantidad: {item.quantity}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm">
                          ${formatCurrency(item.unitPrice)}
                        </p>
                        <p className="font-semibold">
                          ${formatCurrency(item.subtotal)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="mt-6 space-y-3 border-t border-border-strong pt-4">
                <SummaryRow label="Items" value={`${cartCount}`} />
                <SummaryRow
                  label="Subtotal"
                  value={`$${formatCurrency(cartSubtotal)}`}
                />
                <SummaryRow
                  label="Descuento"
                  value={`$${formatCurrency(discountValue)}`}
                />
                <SummaryRow
                  label="IVA"
                  value={`$${formatCurrency(ivaValue)}`}
                />
                <SummaryRow
                  label="Entrega"
                  value={`$${formatCurrency(deliveryFee)}`}
                />

                <div className="border-t border-border-strong pt-3">
                  <SummaryRow
                    label="Total"
                    value={`$${formatCurrency(grandTotal)}`}
                    strong
                  />
                </div>
              </div>

              {/* Aviso de activación del pago */}
              <div className="mt-6 rounded-2xl border border-border-strong bg-white/50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BadgeCheck className="size-4" />
                  <p className="font-semibold">
                    Activación del pago
                  </p>
                </div>

                <p className="text-sm">
                  El botón de pago se habilita funcionalmente después de seleccionar
                  la forma de entrega y completar el método de pago.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </div>

      {/* =========================
          MODAL DE ESTADO / RESULTADO
         ========================= */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={handleCloseStatusModal}
        title={
          paymentStatus === "pending_validation"
            ? "Pendiente de validación"
            : paymentStatus === "approved"
            ? "Pago aprobado"
            : paymentStatus === "rejected"
            ? "Pago rechazado"
            : "Estado del pago"
        }
        message={statusMessage}
      >
        {/* Estado pendiente */}
        {paymentStatus === "pending_validation" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full border-4 border-border-strong border-t-transparent animate-spin" />
            <p className="text-sm text-gray-600">
              Validando la transacción con la pasarela de pago.
            </p>
          </div>
        )}

        {/* Estado rechazado */}
        {paymentStatus === "rejected" && (
          <div className="flex justify-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => {
                setIsStatusModalOpen(false);
                setPaymentStatus("idle");
              }}
            >
              Intentar nuevamente
            </Button>

            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={() => navigate("/cartshop/ver-carrito")}
            >
              Volver al carrito
            </Button>
          </div>
        )}

        {/* Estado aprobado + comprobante */}
        {paymentStatus === "approved" && receiptData && (
          <div className="space-y-4 text-left">
            <div className="rounded-2xl border border-border-strong bg-white/60 p-4">
              <h3 className="font-bold text-label mb-3">
                Comprobante de pago
              </h3>

              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-label">Factura:</span>{" "}
                  {receiptData.invoiceNumber}
                </p>
                <p>
                  <span className="font-semibold text-label">Transacción:</span>{" "}
                  {receiptData.transactionId}
                </p>
                <p>
                  <span className="font-semibold text-label">Fecha:</span>{" "}
                  {receiptData.createdAt}
                </p>
                <p>
                  <span className="font-semibold text-label">Cliente:</span>{" "}
                  {receiptData.customerName}
                </p>
                <p>
                  <span className="font-semibold text-label">Correo:</span>{" "}
                  {receiptData.customerEmail}
                </p>
                <p>
                  <span className="font-semibold text-label">Método de pago:</span>{" "}
                  {paymentMethod === "card"
                    ? "Tarjeta"
                    : paymentMethod === "pse"
                    ? "PSE"
                    : "PayPal"}
                </p>
                <p>
                  <span className="font-semibold text-label">Entrega:</span>{" "}
                  {deliveryMethod === "delivery" ? "Domicilio" : "Retiro en punto"}
                </p>
                <p>
                  <span className="font-semibold text-label">Total:</span>{" "}
                  ${formatCurrency(receiptData.total)}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white/40 p-4">
              <h4 className="font-semibold mb-2 text-label">
                Facturación electrónica y envío
              </h4>

              <p className="text-sm text-gray-600">
                Este bloque ya deja preparado el espacio para:
              </p>

              <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
                <li>generación real de factura electrónica,</li>
                <li>descarga en PDF,</li>
                <li>envío al correo del cliente,</li>
                <li>actualización de historial y auditoría.</li>
              </ul>
            </div>

            {emailSentMessage ? (
              <div className="rounded-2xl border border-border bg-white/40 p-3 text-sm text-gray-700">
                {emailSentMessage}
              </div>
            ) : null}

            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={handleDownloadPdf}
              >
                Guardar PDF
              </Button>

              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={handleSendReceiptByEmail}
              >
                Enviar al correo
              </Button>

              <Button
                variant="primary"
                size="sm"
                type="button"
                onClick={handleCloseStatusModal}
              >
                Finalizar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

/**
 * =========================
 * SUBCOMPONENTES LOCALES
 * =========================
 * Se dejan en el mismo archivo para no tocar todavía
 * la estructura de reports/* ni services/*.
 */

// Badge visual del paso
function StepBadge({ label, active, completed }) {
  return (
    <div
      className={`
        px-4 py-2 rounded-full text-sm font-semibold border
        ${completed
          ? "bg-white border-border-strong"
          : active
          ? "bg-white border-border-strong"
          : "bg-white/40 border-border"}
      `}
    >
      {label}
    </div>
  );
}

// Fila del resumen
function SummaryRow({ label, value, strong = false }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={strong ? "font-bold text-label" : "text-gray-700"}>
        {label}
      </span>
      <span className={strong ? "font-bold text-label" : "text-gray-700"}>
        {value}
      </span>
    </div>
  );
}

// Icono visual de la sección entrega
function PackageSectionIcon({ currentStep }) {
  if (currentStep > 1) {
    return <BadgeCheck className="size-5" />;
  }

  return <ReceiptText className="size-5" />;
}