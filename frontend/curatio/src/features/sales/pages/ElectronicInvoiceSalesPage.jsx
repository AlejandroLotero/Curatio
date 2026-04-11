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
  Store,
  Truck,
  Wallet,
  CircleAlert,
  BadgeCheck,
} from "lucide-react";

// Cliente HTTP y adapters del módulo de ventas
import {
  createSale,
  confirmSalePayment,
  downloadSaleInvoice,
  fetchSalesCustomerByDocument,
} from "@/lib/http/sales";
import {
  buildCreateSaleBody,
  mapSaleDetailResponse,
  mapSalesCustomerLookupResponse,
} from "@/lib/adapters/salesAdapter";

// Subcomponente visual separado para la simulación de tarjeta
import SaleCardPreview from "@/features/sales/components/SaleCardPreview";

/**
 * =========================
 * CONSTANTES LOCALES DE UI
 * =========================
 */

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

const PAYMENT_METHODS = [
  {
    id: "cash",
    value: "cash",
    label: "Efectivo",
    description: "Pago en efectivo validado por el personal.",
    icon: Wallet,
  },
  {
    id: "card",
    value: "card",
    label: "Tarjeta débito / crédito",
    description: "Visa, Mastercard, American Express y otras redes.",
    icon: CreditCard,
  },
  {
    id: "transfer",
    value: "transfer",
    label: "Transferencia / PSE",
    description: "Transferencia bancaria o débito por PSE.",
    icon: Landmark,
  },
];

const TRANSFER_BANK_OPTIONS = [
  { id: "bancolombia", value: "bancolombia", label: "Bancolombia" },
  { id: "bbva", value: "bbva", label: "BBVA" },
  { id: "davivienda", value: "davivienda", label: "Davivienda" },
  { id: "bogota", value: "bogota", label: "Banco de Bogotá" },
  { id: "occidente", value: "occidente", label: "Banco de Occidente" },
  { id: "avvillas", value: "avvillas", label: "AV Villas" },
  { id: "itau", value: "itau", label: "Itaú" },
  { id: "nequi", value: "nequi", label: "Nequi" },
];

const DOCUMENT_TYPE_OPTIONS = [
  { id: "CC", value: "CC", label: "CC" },
  { id: "CE", value: "CE", label: "CE" },
  { id: "TI", value: "TI", label: "TI" },
  { id: "NIT", value: "NIT", label: "NIT" },
  { id: "PEP", value: "PEP", label: "PEP" },
  { id: "PPT", value: "PPT", label: "PPT" },
];

const INSTALLMENT_OPTIONS = [
  { id: "1", value: "1", label: "1 cuota" },
  { id: "2", value: "2", label: "2 cuotas" },
  { id: "3", value: "3", label: "3 cuotas" },
  { id: "6", value: "6", label: "6 cuotas" },
  { id: "12", value: "12", label: "12 cuotas" },
];

const CARD_BANK_VISUALS = {
  bancolombia: {
    code: "bancolombia",
    bankName: "Bancolombia",
    displayName: "Bancolombia",
    issuerLabel: "Visa / Mastercard",
    gradientClasses: "from-[#F9C606] via-[#0F5DAA] to-[#003B7A]",
    chipToneClasses: "from-yellow-100 to-yellow-300",
    textToneClasses: "text-white",
    accentText: "Tu mano amiga",
  },
  bbva: {
    code: "bbva",
    bankName: "BBVA",
    displayName: "BBVA",
    issuerLabel: "Visa / Mastercard",
    gradientClasses: "from-[#072146] via-[#004481] to-[#2DCCCD]",
    chipToneClasses: "from-slate-100 to-slate-300",
    textToneClasses: "text-white",
    accentText: "Creando oportunidades",
  },
  davivienda: {
    code: "davivienda",
    bankName: "Davivienda",
    displayName: "Davivienda",
    issuerLabel: "Visa / Mastercard",
    gradientClasses: "from-[#8B0000] via-[#C62828] to-[#E57373]",
    chipToneClasses: "from-red-100 to-red-300",
    textToneClasses: "text-white",
    accentText: "Lugar de su dinero",
  },
  bogota: {
    code: "bogota",
    bankName: "Banco de Bogotá",
    displayName: "Banco de Bogotá",
    issuerLabel: "Visa / Mastercard",
    gradientClasses: "from-[#9E0B0F] via-[#C62828] to-[#F28B82]",
    chipToneClasses: "from-rose-100 to-rose-300",
    textToneClasses: "text-white",
    accentText: "Grupo Aval",
  },
  occidente: {
    code: "occidente",
    bankName: "Banco de Occidente",
    displayName: "Banco de Occidente",
    issuerLabel: "Visa / Mastercard",
    gradientClasses: "from-[#7B1FA2] via-[#8E24AA] to-[#CE93D8]",
    chipToneClasses: "from-fuchsia-100 to-fuchsia-300",
    textToneClasses: "text-white",
    accentText: "Grupo Aval",
  },
  avvillas: {
    code: "avvillas",
    bankName: "AV Villas",
    displayName: "AV Villas",
    issuerLabel: "Visa / Mastercard",
    gradientClasses: "from-[#1E3A8A] via-[#2563EB] to-[#93C5FD]",
    chipToneClasses: "from-blue-100 to-blue-300",
    textToneClasses: "text-white",
    accentText: "Grupo Aval",
  },
  itau: {
    code: "itau",
    bankName: "Itaú",
    displayName: "Itaú",
    issuerLabel: "Visa / Mastercard",
    gradientClasses: "from-[#FF6F00] via-[#EF6C00] to-[#6D4C41]",
    chipToneClasses: "from-orange-100 to-orange-300",
    textToneClasses: "text-white",
    accentText: "Hecho para ti",
  },
  nequi: {
    code: "nequi",
    bankName: "Nequi",
    displayName: "Nequi",
    issuerLabel: "Mastercard",
    gradientClasses: "from-[#1F102E] via-[#7B1FA2] to-[#E91E63]",
    chipToneClasses: "from-purple-100 to-pink-300",
    textToneClasses: "text-white",
    accentText: "Saca tu plata",
  },
  amex: {
    code: "amex",
    bankName: "American Express",
    displayName: "American Express",
    issuerLabel: "American Express",
    gradientClasses: "from-[#0A3D62] via-[#1E88E5] to-[#7FDBFF]",
    chipToneClasses: "from-cyan-100 to-cyan-300",
    textToneClasses: "text-white",
    accentText: "Membership Rewards",
  },
  visa_generic: {
    code: "visa_generic",
    bankName: "Visa",
    displayName: "Visa",
    issuerLabel: "Visa",
    gradientClasses: "from-[#1A1F71] via-[#1434CB] to-[#5C6BC0]",
    chipToneClasses: "from-indigo-100 to-indigo-300",
    textToneClasses: "text-white",
    accentText: "Secure card",
  },
  mastercard_generic: {
    code: "mastercard_generic",
    bankName: "Mastercard",
    displayName: "Mastercard",
    issuerLabel: "Mastercard",
    gradientClasses: "from-[#111827] via-[#EA580C] to-[#F59E0B]",
    chipToneClasses: "from-orange-100 to-orange-300",
    textToneClasses: "text-white",
    accentText: "Priceless",
  },
  generic: {
    code: "generic",
    bankName: "Entidad financiera",
    displayName: "Tarjeta bancaria",
    issuerLabel: "Red bancaria",
    gradientClasses: "from-slate-800 via-slate-700 to-slate-500",
    chipToneClasses: "from-slate-200 to-slate-400",
    textToneClasses: "text-white",
    accentText: "Pago seguro",
  },
};

const CARD_BIN_RULES = [
  { bank: "bbva", pattern: /^(457562|4558|4110|450995)/ },
  { bank: "bancolombia", pattern: /^(528209|530373|552244|451714|438935)/ },
  { bank: "davivienda", pattern: /^(402360|451760|457659|409171)/ },
  { bank: "bogota", pattern: /^(457676|457677|427099|450851)/ },
  { bank: "occidente", pattern: /^(450942|529612)/ },
  { bank: "avvillas", pattern: /^(454812|491602|498765)/ },
  { bank: "itau", pattern: /^(451357|406984|637095)/ },
  { bank: "nequi", pattern: /^(529899|524347|636143)/ },
];



function formatCurrency(value) {
  return Number(value || 0).toLocaleString("es-CO");
}

function onlyDigits(value = "") {
  return String(value).replace(/\D/g, "");
}

function formatCardNumber(value = "") {
  const digits = onlyDigits(value).slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value = "") {
  const digits = onlyDigits(value).slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
}

function detectCardBrand(cardNumber = "") {
  const digits = onlyDigits(cardNumber);

  if (/^4/.test(digits)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "American Express";

  return "Tarjeta";
}

function detectCardBankCode(cardNumber = "") {
  const digits = onlyDigits(cardNumber);

  for (const rule of CARD_BIN_RULES) {
    if (rule.pattern.test(digits)) {
      return rule.bank;
    }
  }

  const brand = detectCardBrand(digits);

  if (brand === "American Express") return "amex";
  if (brand === "Visa") return "visa_generic";
  if (brand === "Mastercard") return "mastercard_generic";

  return "generic";
}

function getCardVisualConfig(cardNumber = "") {
  const bankCode = detectCardBankCode(cardNumber);
  return CARD_BANK_VISUALS[bankCode] || CARD_BANK_VISUALS.generic;
}

function getCardProductLabel({ cardType = "debit", cardNumber = "" }) {
  const brand = detectCardBrand(cardNumber);
  const bankCode = detectCardBankCode(cardNumber);

  if (cardType === "debit") {
    if (bankCode === "nequi") return "Débito digital";
    return "Débito";
  }

  if (brand === "American Express") return "Gold";
  if (bankCode === "bancolombia") return "Clásica";
  if (bankCode === "bbva") return "Gold";
  if (bankCode === "davivienda") return "Platinum";
  if (brand === "Visa") return "Classic";
  if (brand === "Mastercard") return "Gold";

  return "Crédito";
}

function simulateGatewayDecision({ paymentMethod, cardNumber, documentNumber }) {
  const safeCardNumber = onlyDigits(cardNumber);
  const safeDocumentNumber = onlyDigits(documentNumber);

  if (paymentMethod === "card") {
    if (safeCardNumber.endsWith("00")) {
      return "rejected";
    }

    if (safeCardNumber.endsWith("13")) {
      return "manual_review";
    }
  }

  if (paymentMethod === "transfer" && safeDocumentNumber.endsWith("0")) {
    return "rejected";
  }

  return "approved";
}

function buildInvoiceNumber() {
  const stamp = Date.now().toString().slice(-8);
  return `FEV-${stamp}`;
}

function buildDateTimeLabel() {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
}

function getUserRole(user) {
  return user?.rol || user?.role || "";
}

function getUserName(user) {
  return user?.nombre || user?.name || "";
}

function mapCheckoutPaymentToBackend({ paymentMethod, cardType }) {
  if (paymentMethod === "cash") {
    return "Efectivo";
  }

  if (paymentMethod === "transfer") {
    return "Transferencia";
  }

  if (paymentMethod === "card" && cardType === "debit") {
    return "Tarjeta débito";
  }

  return "Tarjeta crédito";
}

async function extractBlobPayload(response) {
  if (!response) return null;
  if (response instanceof Blob) return response;
  if (response.data instanceof Blob) return response.data;
  if (typeof response.blob === "function") return await response.blob();
  if (response.body instanceof Blob) return response.body;
  return null;
}

function triggerBlobDownload(blob, filename) {
  if (!(blob instanceof Blob)) {
    console.error("La respuesta no es un Blob válido:", blob);
    return;
  }

  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename || "archivo.pdf";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.URL.revokeObjectURL(url);
}

export default function ElectronicInvoiceSalesPage() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartCount,
    cartSubtotal,
    clearActiveCart,
  } = useCart();

  const { user, isAuthenticated } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [isCardBackVisible, setIsCardBackVisible] = useState(false);

  const [customerLookupForm, setCustomerLookupForm] = useState({
    documentType: "CC",
    documentNumber: "",
  });

  const [selectedCustomerMeta, setSelectedCustomerMeta] = useState(null);
  const [customerLookupLoading, setCustomerLookupLoading] = useState(false);
  const [customerLookupError, setCustomerLookupError] = useState("");

  const [deliveryMethod, setDeliveryMethod] = useState("");

  const [deliveryForm, setDeliveryForm] = useState({
    deliveryAddress: "",
    deliveryCity: "Bogotá",
    deliveryPhone: "",
    pickupPoint: "",
    pickupContactName: "",
    pickupContactPhone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");

  const [paymentForm, setPaymentForm] = useState({
    cardType: "debit",
    cardNumber: "",
    cardHolder: "",
    cardExpiry: "",
    cardCvv: "",
    cardDocumentType: "CC",
    cardDocumentNumber: "",
    installments: "1",

    transferBank: "",
    transferDocumentType: "CC",
    transferDocumentNumber: "",
    transferPhone: "",

    cashReceived: "",
  });

  const [errors, setErrors] = useState({});
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [saleRecord, setSaleRecord] = useState(null);
  const [receiptData, setReceiptData] = useState(null);
  const [apiError, setApiError] = useState("");
  const [emailSentMessage, setEmailSentMessage] = useState("");

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cartshop/ver-carrito", { replace: true });
    }
  }, [cartItems, navigate]);

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

  const role = getUserRole(user);
  const isSalesOperator = ["Administrador", "Farmaceuta"].includes(role);

  useEffect(() => {
    if (role === "Cliente") {
      navigate("/checkout", { replace: true });
    }
  }, [role, navigate]);

  const discountValue = useMemo(() => {
    if (cartSubtotal >= 100000) {
      return 5000;
    }
    return 0;
  }, [cartSubtotal]);

  const deliveryFee = useMemo(() => {
    if (deliveryMethod === "delivery") return 8000;
    if (deliveryMethod === "pickup") return 0;
    return 0;
  }, [deliveryMethod]);

  const ivaValue = useMemo(() => {
    const taxableBase = Math.max(cartSubtotal - discountValue, 0);
    return Math.round(taxableBase * 0.19);
  }, [cartSubtotal, discountValue]);

  const grandTotal = useMemo(() => {
    return Math.max(cartSubtotal - discountValue, 0) + ivaValue + deliveryFee;
  }, [cartSubtotal, discountValue, ivaValue, deliveryFee]);

  const cardVisualConfig = useMemo(() => {
    return getCardVisualConfig(paymentForm.cardNumber);
  }, [paymentForm.cardNumber]);

  const cardBrandName = useMemo(() => {
    return detectCardBrand(paymentForm.cardNumber);
  }, [paymentForm.cardNumber]);

  const cardProductLabel = useMemo(() => {
    return getCardProductLabel({
      cardType: paymentForm.cardType,
      cardNumber: paymentForm.cardNumber,
    });
  }, [paymentForm.cardType, paymentForm.cardNumber]);

  const handleDeliveryInputChange = (event) => {
    const { name, value } = event.target;

    setDeliveryForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleCustomerLookupInputChange = (event) => {
    const { name, value } = event.target;

    setCustomerLookupForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setCustomerLookupError("");
    setErrors((prev) => ({
      ...prev,
      customerId: "",
    }));
  };

  const handleSearchCustomer = async () => {
    if (!customerLookupForm.documentNumber.trim()) {
      setCustomerLookupError("Debes ingresar el número de documento.");
      return;
    }

    setCustomerLookupLoading(true);
    setCustomerLookupError("");
    setSelectedCustomerMeta(null);

    try {
      const response = await fetchSalesCustomerByDocument({
        documentType: customerLookupForm.documentType,
        documentNumber: customerLookupForm.documentNumber,
      });

      const customer = mapSalesCustomerLookupResponse(response);
      setSelectedCustomerMeta(customer);

      if (deliveryMethod === "delivery" && customer?.phone) {
        setDeliveryForm((prev) => ({
          ...prev,
          deliveryPhone: prev.deliveryPhone || customer.phone,
          deliveryAddress: prev.deliveryAddress || customer.address || "",
        }));
      }

      if (deliveryMethod === "pickup" && customer?.name) {
        setDeliveryForm((prev) => ({
          ...prev,
          pickupContactName: prev.pickupContactName || customer.name,
          pickupContactPhone: prev.pickupContactPhone || customer.phone || "",
        }));
      }
    } catch (error) {
      setSelectedCustomerMeta(null);
      setCustomerLookupError(
        error?.error?.message || "No se encontró un cliente con ese documento."
      );
    } finally {
      setCustomerLookupLoading(false);
    }
  };

  const handlePaymentInputChange = (event) => {
    const { name, value } = event.target;
    let nextValue = value;

    if (name === "cardNumber") nextValue = formatCardNumber(value);
    if (name === "cardExpiry") nextValue = formatExpiry(value);
    if (name === "cardCvv") nextValue = onlyDigits(value).slice(0, 4);

    if (
      ["cardDocumentNumber", "transferDocumentNumber", "transferPhone", "cashReceived"].includes(name)
    ) {
      nextValue = onlyDigits(value);
    }

    setPaymentForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateDeliveryStep = () => {
    const nextErrors = {};

    if (!selectedCustomerMeta?.id) {
      nextErrors.customerId = "Debes consultar y seleccionar un cliente válido.";
    }

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

  const validatePaymentStep = () => {
    const nextErrors = {};

    if (!paymentMethod) {
      nextErrors.paymentMethod = "Debes seleccionar un método de pago.";
    }

    if (paymentMethod === "card") {
      if (!paymentForm.cardNumber.trim()) {
        nextErrors.cardNumber = "El número de tarjeta es obligatorio.";
      }

      const digitsLength = onlyDigits(paymentForm.cardNumber).length;
      const brand = detectCardBrand(paymentForm.cardNumber);

      if (brand === "American Express") {
        if (digitsLength < 15) {
          nextErrors.cardNumber = "La tarjeta American Express debe tener 15 dígitos.";
        }
      } else if (digitsLength < 16) {
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

      const minCvvLength = brand === "American Express" ? 4 : 3;
      if (paymentForm.cardCvv.length < minCvvLength) {
        nextErrors.cardCvv = `El CVV debe tener al menos ${minCvvLength} dígitos.`;
      }

      if (!paymentForm.cardDocumentType) {
        nextErrors.cardDocumentType = "El tipo de documento es obligatorio.";
      }

      if (!paymentForm.cardDocumentNumber.trim()) {
        nextErrors.cardDocumentNumber = "El número de documento es obligatorio.";
      }

      if (paymentForm.cardType === "credit" && !paymentForm.installments) {
        nextErrors.installments = "Debes seleccionar el número de cuotas.";
      }
    }

    if (paymentMethod === "transfer") {
      if (!paymentForm.transferBank) {
        nextErrors.transferBank = "Debes seleccionar un banco.";
      }
      if (!paymentForm.transferDocumentType) {
        nextErrors.transferDocumentType = "El tipo de documento es obligatorio.";
      }
      if (!paymentForm.transferDocumentNumber.trim()) {
        nextErrors.transferDocumentNumber = "El número de documento es obligatorio.";
      }
      if (!paymentForm.transferPhone.trim()) {
        nextErrors.transferPhone = "El teléfono es obligatorio.";
      }
    }

    if (paymentMethod === "cash") {
      if (!paymentForm.cashReceived.trim()) {
        nextErrors.cashReceived = "Debes indicar el valor recibido.";
      }
      if (Number(paymentForm.cashReceived || 0) < grandTotal) {
        nextErrors.cashReceived = "El valor recibido no puede ser menor al total.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContinueToPayment = () => {
    if (!validateDeliveryStep()) return;
    setCurrentStep(2);
  };

  const handleBackToDelivery = () => {
    setCurrentStep(1);
    setErrors({});
  };

  const handleProcessPayment = async () => {
    if (!validatePaymentStep()) return;

    setApiError("");
    setEmailSentMessage("");
    setIsStatusModalOpen(true);
    setPaymentStatus("pending_validation");
    setStatusMessage("La venta está siendo registrada y el pago está pendiente de validación.");
    setSaving(true);

    try {
      const gatewayDecision = simulateGatewayDecision({
        paymentMethod,
        cardNumber: paymentForm.cardNumber,
        documentNumber:
          paymentMethod === "card"
            ? paymentForm.cardDocumentNumber
            : paymentForm.transferDocumentNumber,
      });

      if (gatewayDecision === "rejected") {
        setPaymentStatus("rejected");
        setStatusMessage(
          "La transacción fue rechazada por la simulación de la pasarela. Puedes corregir los datos e intentarlo de nuevo."
        );
        return;
      }

      if (gatewayDecision === "manual_review") {
        setPaymentStatus("pending_validation");
        setStatusMessage(
          "La transacción quedó en validación manual por la simulación de la pasarela. Revisa la tarjeta ingresada o aprueba el pago desde el flujo administrativo."
        );
        return;
      }

      const invoiceNumber = buildInvoiceNumber();
      const saleSubtotal = Number(cartSubtotal || 0);
      const saleDiscount = 0;
      const saleTotal = saleSubtotal + Number(ivaValue || 0) - saleDiscount;

      const normalizedLines = cartItems.map((item) => ({
        medicationId: Number(
          item.medicationId ??
          item.productId ??
          item.product?.id ??
          item.medication?.id
        ),
        quantity: Number(item.quantity),
      }));

      const hasInvalidMedicationId = normalizedLines.some(
        (line) => !Number.isInteger(line.medicationId) || line.medicationId <= 0
      );

      if (hasInvalidMedicationId) {
        setApiError("No se pudo identificar correctamente uno o más medicamentos del carrito.");
        setPaymentStatus("rejected");
        setStatusMessage("No se pudo identificar correctamente uno o más medicamentos del carrito.");
        setSaving(false);
        return;
      }

      const createBody = buildCreateSaleBody({
        invoiceNumber,
        customerId: Number(selectedCustomerMeta.id),
        subtotal: saleSubtotal,
        iva: ivaValue,
        discount: saleDiscount,
        total: saleTotal,
        paymentType: mapCheckoutPaymentToBackend({
          paymentMethod,
          cardType: paymentForm.cardType,
        }),
        lines: normalizedLines,
      });

      const createdResponse = await createSale(createBody);
      const createdSale = mapSaleDetailResponse(createdResponse);

      const confirmedResponse = await confirmSalePayment(createdSale.id);
      const confirmedSale = mapSaleDetailResponse(confirmedResponse);

      const nextReceipt = {
        saleId: confirmedSale.id,
        invoiceNumber: confirmedSale.invoiceNumber,
        createdAt: confirmedSale.saleDateTime || buildDateTimeLabel(),
        customerName: confirmedSale.customer,
        customerEmail: confirmedSale.customerEmail,
        paymentMethod: confirmedSale.paymentType,
        deliveryMethod,
        items: confirmedSale.lines,
        subtotal: confirmedSale.subtotal,
        discount: confirmedSale.discount,
        iva: confirmedSale.iva,
        deliveryFee,
        total: confirmedSale.total,
        paymentStatus: confirmedSale.status,
      };

      setSaleRecord(confirmedSale);
      setReceiptData(nextReceipt);
      setPaymentStatus("approved");
      setStatusMessage("La venta fue creada y el pago quedó confirmado correctamente.");
      setCurrentStep(3);
      await clearActiveCart();
    } catch (error) {
      console.error("Error completo procesando venta:", error);
      const fields = error?.error?.fields;
      let message =
        error?.error?.message || "No se pudo procesar el pago de la venta.";

      if (fields && typeof fields === "object") {
        const first = Object.values(fields).flat()[0];
        if (first) {
          message = `${message} (${first})`;
        }
      }

      setApiError(message);
      setPaymentStatus("rejected");
      setStatusMessage(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!saleRecord?.id) return;

    try {
      const response = await downloadSaleInvoice(saleRecord.id);
      const blob = await extractBlobPayload(response);
      triggerBlobDownload(
        blob,
        `factura_${saleRecord.invoiceNumber || saleRecord.id}.pdf`
      );
    } catch (error) {
      setEmailSentMessage(
        error?.error?.message || "No se pudo descargar la factura."
      );
    }
  };

  const handleSendReceiptByEmail = async () => {
    setEmailSentMessage(
      "La notificación al cliente se gestiona desde el backend al registrar la venta."
    );
  };

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);

    if (paymentStatus === "rejected" || paymentStatus === "pending_validation") {
      setPaymentStatus("idle");
      setStatusMessage("");
      return;
    }

    if (paymentStatus === "approved") {
      navigate("/sales/list", { replace: true });
    }
  };

  if (!isSalesOperator && role !== "Cliente") {
    return (
      <div className="min-h-screen px-4 py-6 sm:py-8 text-label">
        <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <CircleAlert className="size-5 sm:size-6" />
            <h1 className="text-xl sm:text-2xl font-bold">
              Módulo de ventas restringido
            </h1>
          </div>

          <p className="mb-6 text-sm sm:text-base">
            Esta vista está habilitada para los roles Administrador y Farmaceuta.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
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

  return (
    <div className="min-h-screen px-4 py-6 sm:py-8 text-label">
      <div className="max-w-7xl mx-auto">
        <div className="mb-5 sm:mb-6 rounded-3xl bg-white/70 backdrop-blur-md shadow-xl p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                Checkout y confirmación de pago
              </h1>
              <p className="text-xs sm:text-sm mt-1">
                Registra la venta, valida el pago y genera la factura.
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <StepBadge active={currentStep === 1} completed={currentStep > 1} label="Entrega" />
              <StepBadge active={currentStep === 2} completed={currentStep > 2} label="Pago" />
              <StepBadge
                active={currentStep === 3}
                completed={currentStep >= 3 && paymentStatus === "approved"}
                label="Confirmación"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] xl:grid-cols-[1.3fr_0.9fr] gap-4 md:gap-6 items-start">
          <div className="space-y-5 sm:space-y-6">
            <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <PackageSectionIcon currentStep={currentStep} />
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">
                    1. Cliente y método de entrega
                  </h2>
                  <p className="text-xs sm:text-sm">
                    Consulta el cliente por documento y define cómo se entregará el pedido.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] xl:grid-cols-[180px_1fr_auto] gap-4 mb-2">
                <Select
                  label="Tipo de documento"
                  name="documentType"
                  value={customerLookupForm.documentType}
                  onChange={handleCustomerLookupInputChange}
                  options={DOCUMENT_TYPE_OPTIONS}
                  placeholder="Tipo"
                  wrapperClassName="w-full"
                />

                <Input
                  label="Número de documento"
                  name="documentNumber"
                  value={customerLookupForm.documentNumber}
                  onChange={handleCustomerLookupInputChange}
                  error={customerLookupError || errors.customerId}
                  wrapperClassName="w-full"
                />

                <div className="flex items-end md:col-span-2 xl:col-span-1">
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={handleSearchCustomer}
                    disabled={customerLookupLoading}
                    className="w-full xl:w-auto"
                  >
                    Buscar cliente
                  </Button>
                </div>
              </div>

              {selectedCustomerMeta ? (
                <div className="rounded-2xl border border-border-strong bg-white/60 p-4 mb-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Cliente encontrado</h3>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <p><span className="font-medium">Nombre:</span> {selectedCustomerMeta.name}</p>
                    <p><span className="font-medium">Correo:</span> {selectedCustomerMeta.email}</p>
                    <p>
                      <span className="font-medium">Documento:</span>{" "}
                      {selectedCustomerMeta.documentType} {selectedCustomerMeta.documentNumber}
                    </p>
                    <p><span className="font-medium">Teléfono:</span> {selectedCustomerMeta.phone}</p>
                    <p><span className="font-medium">Dirección:</span> {selectedCustomerMeta.address}</p>
                  </div>
                </div>
              ) : null}

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
                        setErrors((prev) => ({ ...prev, deliveryMethod: "" }));
                      }}
                      className={`
                        rounded-2xl border p-4 sm:p-5 text-left transition
                        ${isSelected
                          ? "border-border-strong bg-white/80 shadow-md"
                          : "border-border hover:bg-white/60"}
                      `}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="size-4 sm:size-5" />
                        <span className="font-semibold text-sm sm:text-base">{option.label}</span>
                      </div>
                      <p className="text-xs sm:text-sm">{option.description}</p>
                    </button>
                  );
                })}
              </div>

              {errors.deliveryMethod ? (
                <p className="text-mostsmall text-red-600 mt-2">
                  {errors.deliveryMethod}
                </p>
              ) : null}

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
                  disabled={!deliveryMethod || !selectedCustomerMeta?.id}
                  className="w-full sm:w-auto"
                >
                  Continuar al pago
                </Button>
              </div>
            </section>

            {currentStep >= 2 && (
              <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ReceiptText className="size-4 sm:size-5" />
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">
                      2. Método de pago
                    </h2>
                    <p className="text-xs sm:text-sm">
                      Selecciona el método y completa la información requerida.
                    </p>
                  </div>
                </div>

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
                          setErrors((prev) => ({ ...prev, paymentMethod: "" }));
                        }}
                        className={`
                          rounded-2xl border p-4 sm:p-5 text-left transition
                          ${isSelected
                            ? "border-border-strong bg-white/80 shadow-md"
                            : "border-border hover:bg-white/60"}
                        `}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className="size-4 sm:size-5" />
                          <span className="font-semibold text-sm sm:text-base">{option.label}</span>
                        </div>
                        <p className="text-xs sm:text-sm">{option.description}</p>
                      </button>
                    );
                  })}
                </div>

                {errors.paymentMethod ? (
                  <p className="text-mostsmall text-red-600 mt-2">
                    {errors.paymentMethod}
                  </p>
                ) : null}

                {paymentMethod === "card" && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Tipo de tarjeta"
                      name="cardType"
                      value={paymentForm.cardType}
                      onChange={handlePaymentInputChange}
                      options={[
                        { id: "debit", value: "debit", label: "Débito" },
                        { id: "credit", value: "credit", label: "Crédito" },
                      ]}
                      placeholder="Tipo"
                      wrapperClassName="w-full"
                    />

                    <Input
                      label="Número de tarjeta"
                      name="cardNumber"
                      value={paymentForm.cardNumber}
                      onChange={handlePaymentInputChange}
                      error={errors.cardNumber}
                      wrapperClassName="w-full"
                    />

                    <Input
                      label="Titular"
                      name="cardHolder"
                      value={paymentForm.cardHolder}
                      onChange={handlePaymentInputChange}
                      error={errors.cardHolder}
                      wrapperClassName="w-full"
                    />

                    <Input
                      label="Vencimiento (MM/YY)"
                      name="cardExpiry"
                      value={paymentForm.cardExpiry}
                      onChange={handlePaymentInputChange}
                      error={errors.cardExpiry}
                      wrapperClassName="w-full"
                    />

                    <Input
                      label="CVV"
                      name="cardCvv"
                      value={paymentForm.cardCvv}
                      onChange={handlePaymentInputChange}
                      onFocus={() => setIsCardBackVisible(true)}
                      onBlur={() => setIsCardBackVisible(false)}
                      error={errors.cardCvv}
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
                      wrapperClassName="w-full"
                    />

                    {paymentForm.cardType === "credit" && (
                      <Select
                        label="Cuotas"
                        name="installments"
                        value={paymentForm.installments}
                        onChange={handlePaymentInputChange}
                        options={INSTALLMENT_OPTIONS}
                        placeholder="Cuotas"
                        error={errors.installments}
                        wrapperClassName="w-full"
                      />
                    )}
                  </div>
                )}

                {paymentMethod === "transfer" && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Banco"
                      name="transferBank"
                      value={paymentForm.transferBank}
                      onChange={handlePaymentInputChange}
                      options={TRANSFER_BANK_OPTIONS}
                      placeholder="Selecciona un banco"
                      error={errors.transferBank}
                      wrapperClassName="w-full"
                    />

                    <Select
                      label="Tipo de documento"
                      name="transferDocumentType"
                      value={paymentForm.transferDocumentType}
                      onChange={handlePaymentInputChange}
                      options={DOCUMENT_TYPE_OPTIONS}
                      placeholder="Tipo"
                      error={errors.transferDocumentType}
                      wrapperClassName="w-full"
                    />

                    <Input
                      label="Número de documento"
                      name="transferDocumentNumber"
                      value={paymentForm.transferDocumentNumber}
                      onChange={handlePaymentInputChange}
                      error={errors.transferDocumentNumber}
                      wrapperClassName="w-full"
                    />

                    <Input
                      label="Teléfono"
                      name="transferPhone"
                      value={paymentForm.transferPhone}
                      onChange={handlePaymentInputChange}
                      error={errors.transferPhone}
                      wrapperClassName="w-full"
                    />
                  </div>
                )}

                {paymentMethod === "cash" && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Valor recibido"
                      name="cashReceived"
                      value={paymentForm.cashReceived}
                      onChange={handlePaymentInputChange}
                      error={errors.cashReceived}
                      wrapperClassName="w-full"
                    />
                  </div>
                )}

                {apiError ? (
                  <p className="mt-4 text-sm text-red-600" role="alert">
                    {apiError}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-col-reverse sm:flex-row justify-between gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={handleBackToDelivery}
                    className="w-full sm:w-auto"
                  >
                    Volver
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    type="button"
                    onClick={handleProcessPayment}
                    disabled={saving}
                    className="w-full sm:w-auto"
                  >
                    Confirmar pago
                  </Button>
                </div>
              </section>
            )}
          </div>

          <div className="self-start order-first lg:order-last">
            <aside className="lg:sticky lg:top-24 xl:top-[120px] ">

              <section
                  className="
                    rounded-3xl
                    border border-white/40
                    bg-white/75
                    backdrop-blur-md
                    shadow-xl
                    p-4 sm:p-5 lg:p-6
                    transition-all duration-300 mb-14
                  "
                >
                  <div className="flex items-center gap-3 mb-4 sm:mb-5">
                    <div className="flex size-9 sm:size-10 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
                      <Wallet className="size-4 sm:size-5" />
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold tracking-tight">
                        Resumen de la venta
                      </h3>
                      <p className="text-xs sm:text-sm text-label/70">
                        Información consolidada del checkout.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    <SummaryRow
                      label="Cliente"
                      value={selectedCustomerMeta?.name || "—"}
                    />
                    <SummaryRow
                      label="Vendedor"
                      value={getUserName(user) || "—"}
                    />
                    <SummaryRow
                      label="Ítems"
                      value={String(cartCount)}
                    />
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
                      label="Envío"
                      value={`$${formatCurrency(deliveryFee)}`}
                    />

                    <div className="pt-3 mt-3 sm:pt-4 sm:mt-4 border-t border-border-strong">
                      <SummaryRow
                        label="Total"
                        value={`$${formatCurrency(grandTotal)}`}
                        strong={true}
                      />
                    </div>
                  </div>

                  {paymentMethod && (
                    <div className="mt-4 sm:mt-5 rounded-2xl bg-white/70 border border-white/40 p-3 sm:p-4">
                      <p className="text-[11px] sm:text-xs uppercase tracking-wide text-label/60 mb-2">
                        Método seleccionado
                      </p>
                      <p className="text-sm font-medium text-label">
                        {paymentMethod === "card"
                          ? `Tarjeta ${paymentForm.cardType === "debit" ? "débito" : "crédito"}`
                          : paymentMethod === "transfer"
                          ? "Transferencia / PSE"
                          : paymentMethod === "cash"
                          ? "Efectivo"
                          : "Sin definir"}
                      </p>
                    </div>
                  )}
                </section>

              <div className="space-y-4 md:space-y-5 lg:pr-2">
                {currentStep >= 2 && paymentMethod === "card" && (
                  <div className="transition-all duration-300">
                    <div className="w-full mx-auto">
                      <SaleCardPreview
                        cardNumber={paymentForm.cardNumber}
                        cardHolder={paymentForm.cardHolder}
                        cardExpiry={paymentForm.cardExpiry}
                        cardCvv={paymentForm.cardCvv}
                        bankName={cardVisualConfig.displayName}
                        brandName={cardBrandName}
                        gradientClasses={cardVisualConfig.gradientClasses}
                        issuerLabel={cardVisualConfig.issuerLabel}
                        accentText={cardVisualConfig.accentText}
                        chipToneClasses={cardVisualConfig.chipToneClasses}
                        textToneClasses={cardVisualConfig.textToneClasses}
                        productLabel={cardProductLabel}
                        cardType={paymentForm.cardType}
                        showBack={isCardBackVisible}
                      />
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isStatusModalOpen}
        onClose={handleCloseStatusModal}
        title={
          paymentStatus === "approved"
            ? "Pago confirmado"
            : paymentStatus === "rejected"
            ? "Pago rechazado"
            : "Procesando venta"
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-label/80">{statusMessage}</p>

          {paymentStatus === "approved" && receiptData ? (
            <div className="rounded-2xl border border-border-strong bg-white/60 p-4">
              <h4 className="font-bold text-label mb-3">
                Comprobante de la venta
              </h4>

              <div className="space-y-2 text-sm">
                <SummaryRow label="Factura" value={receiptData.invoiceNumber} />
                <SummaryRow label="Fecha" value={receiptData.createdAt} />
                <SummaryRow label="Cliente" value={receiptData.customerName} />
                <SummaryRow label="Método de pago" value={receiptData.paymentMethod} />
                <SummaryRow label="Estado" value={receiptData.paymentStatus} />
                <SummaryRow
                  label="Total"
                  value={`$${formatCurrency(receiptData.total)}`}
                  strong={true}
                />
              </div>

              {emailSentMessage ? (
                <p className="mt-3 text-xs text-label/80">
                  {emailSentMessage}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row flex-wrap justify-end gap-3">
            {paymentStatus === "approved" && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={handleDownloadPdf}
                  className="w-full sm:w-auto"
                >
                  Descargar factura
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={handleSendReceiptByEmail}
                  className="w-full sm:w-auto"
                >
                  Ver estado del correo
                </Button>
              </>
            )}

            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={handleCloseStatusModal}
              className="w-full sm:w-auto"
            >
              Finalizar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function StepBadge({ label, active, completed }) {
  return (
    <div
      className={`
        px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border
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

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span
        className={
          strong
            ? "font-bold text-label text-sm sm:text-[15px]"
            : "text-gray-700 text-sm sm:text-[15px]"
        }
      >
        {label}
      </span>

      <span
        className={
          strong
            ? "font-bold text-label text-right text-sm sm:text-[15px]"
            : "text-gray-700 text-right text-sm sm:text-[15px]"
        }
      >
        {value}
      </span>
    </div>
  );
}

function PackageSectionIcon({ currentStep }) {
  if (currentStep > 1) {
    return <BadgeCheck className="size-4 sm:size-5" />;
  }

  return <ReceiptText className="size-4 sm:size-5" />;
}