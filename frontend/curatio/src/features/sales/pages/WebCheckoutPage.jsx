// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import Input from "@/shared/components/Input";
// import Button from "@/shared/components/Button";
// import Select from "@/shared/components/Select";
// import Modal from "@/shared/components/Modal";

// import { useCart } from "@/features/cartshop/context/CartContext";
// import { useAuth } from "@/features/auth/context/AuthContext";

// import {
//   CreditCard,
//   Landmark,
//   ReceiptText,
//   Store,
//   Truck,
//   Wallet,
//   CircleAlert,
//   BadgeCheck,
// } from "lucide-react";

// import {
//   createCustomerCheckout,
//   downloadSaleInvoice,
// } from "@/lib/http/sales";
// import {
//   buildCustomerCheckoutBody,
//   mapCustomerCheckoutResponse,
// } from "@/lib/adapters/salesAdapter";

// import SaleCardPreview from "@/features/sales/components/SaleCardPreview";

// // Métodos de entrega
// const DELIVERY_METHODS = [
//   {
//     id: "delivery",
//     value: "delivery",
//     label: "Domicilio",
//     description: "Entrega en la dirección registrada por el cliente.",
//     icon: Truck,
//   },
//   {
//     id: "pickup",
//     value: "pickup",
//     label: "Retirar en punto",
//     description: "Recoge tu pedido en uno de nuestros puntos de entrega.",
//     icon: Store,
//   },
// ];

// // Métodos de pago para cliente
// const PAYMENT_METHODS = [
//   {
//     id: "card",
//     value: "card",
//     label: "Tarjeta débito / crédito",
//     description: "Visa, Mastercard y otras redes.",
//     icon: CreditCard,
//   },
//   {
//     id: "transfer",
//     value: "transfer",
//     label: "Transferencia / PSE",
//     description: "Débito desde cuenta bancaria.",
//     icon: Landmark,
//   },
// ];

// const TRANSFER_BANK_OPTIONS = [
//   { id: "bancolombia", value: "bancolombia", label: "Bancolombia" },
//   { id: "bbva", value: "bbva", label: "BBVA" },
//   { id: "davivienda", value: "davivienda", label: "Davivienda" },
//   { id: "bogota", value: "bogota", label: "Banco de Bogotá" },
//   { id: "occidente", value: "occidente", label: "Banco de Occidente" },
//   { id: "avvillas", value: "avvillas", label: "AV Villas" },
//   { id: "itau", value: "itau", label: "Itaú" },
//   { id: "nequi", value: "nequi", label: "Nequi" },
// ];

// const DOCUMENT_TYPE_OPTIONS = [
//   { id: "CC", value: "CC", label: "CC" },
//   { id: "CE", value: "CE", label: "CE", label: "CE" },
//   { id: "TI", value: "TI", label: "TI" },
//   { id: "PEP", value: "PEP", label: "PEP" },
//   { id: "PPT", value: "PPT", label: "PPT" },
// ];

// const INSTALLMENT_OPTIONS = [
//   { id: "1", value: "1", label: "1 cuota" },
//   { id: "2", value: "2", label: "2 cuotas" },
//   { id: "3", value: "3", label: "3 cuotas" },
//   { id: "6", value: "6", label: "6 cuotas" },
//   { id: "12", value: "12", label: "12 cuotas" },
// ];

// function formatCurrency(value) {
//   return Number(value || 0).toLocaleString("es-CO");
// }

// function onlyDigits(value = "") {
//   return String(value).replace(/\D/g, "");
// }

// function formatCardNumber(value = "") {
//   const digits = onlyDigits(value).slice(0, 16);
//   return digits.replace(/(.{4})/g, "$1 ").trim();
// }

// function formatExpiry(value = "") {
//   const digits = onlyDigits(value).slice(0, 4);

//   if (digits.length <= 2) {
//     return digits;
//   }

//   return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
// }

// function detectCardBrand(cardNumber = "") {
//   const digits = onlyDigits(cardNumber);

//   if (/^4/.test(digits)) return "Visa";
//   if (/^(5[1-5]|2[2-7])/.test(digits)) return "Mastercard";
//   if (/^3[47]/.test(digits)) return "American Express";

//   return "Tarjeta";
// }

// function detectCardBank(cardNumber = "") {
//   const digits = onlyDigits(cardNumber);

//   if (/^(457562|4558|4110)/.test(digits)) return "BBVA";
//   if (/^(528209|530373|552244)/.test(digits)) return "Bancolombia";
//   if (/^(402360|450995|451760)/.test(digits)) return "Davivienda";
//   if (/^(451714|438935)/.test(digits)) return "Banco de Bogotá";

//   return "Entidad financiera";
// }

// function getCardPreviewClasses(cardNumber = "") {
//   const bank = detectCardBank(cardNumber);
//   const brand = detectCardBrand(cardNumber);

//   if (bank === "BBVA") return "from-blue-900 to-sky-500";
//   if (bank === "Bancolombia") return "from-yellow-500 to-blue-700";
//   if (bank === "Davivienda") return "from-red-700 to-red-400";
//   if (bank === "Banco de Bogotá") return "from-red-900 to-rose-500";
//   if (brand === "American Express") return "from-slate-800 to-cyan-600";
//   if (brand === "Visa") return "from-indigo-900 to-blue-500";
//   if (brand === "Mastercard") return "from-zinc-900 to-orange-500";

//   return "from-slate-800 to-slate-500";
// }

// function simulateGatewayDecision({ paymentMethod, cardNumber, documentNumber }) {
//   const safeCardNumber = onlyDigits(cardNumber);
//   const safeDocumentNumber = onlyDigits(documentNumber);

//   if (paymentMethod === "card" && safeCardNumber.endsWith("0")) {
//     return "rejected";
//   }

//   if (paymentMethod === "transfer" && safeDocumentNumber.endsWith("0")) {
//     return "rejected";
//   }

//   return "approved";
// }

// function buildInvoiceNumber() {
//   const stamp = Date.now().toString().slice(-8);
//   return `WEB-${stamp}`;
// }

// function mapCheckoutPaymentToBackend({ paymentMethod, cardType }) {
//   if (paymentMethod === "transfer") {
//     return "Transferencia";
//   }

//   if (paymentMethod === "card" && cardType === "debit") {
//     return "Tarjeta débito";
//   }

//   return "Tarjeta crédito";
// }

// async function extractBlobPayload(response) {
//   if (!response) return null;
//   if (response instanceof Blob) return response;
//   if (response.data instanceof Blob) return response.data;
//   if (typeof response.blob === "function") return await response.blob();
//   if (response.body instanceof Blob) return response.body;
//   return null;
// }

// function triggerBlobDownload(blob, filename) {
//   if (!blob) return;

//   const url = window.URL.createObjectURL(blob);
//   const anchor = document.createElement("a");

//   anchor.href = url;
//   anchor.download = filename;
//   document.body.appendChild(anchor);
//   anchor.click();
//   anchor.remove();

//   window.URL.revokeObjectURL(url);
// }

// export default function WebCheckoutPage() {
//   const navigate = useNavigate();

//   const {
//     cartItems,
//     cartCount,
//     cartSubtotal,
//     clearActiveCart,
//   } = useCart();

//   const { user, isAuthenticated } = useAuth();

//   const [currentStep, setCurrentStep] = useState(1);
//   const [deliveryMethod, setDeliveryMethod] = useState("");

//   const [deliveryForm, setDeliveryForm] = useState({
//     deliveryAddress: user?.direccion || user?.address || "",
//     deliveryCity: "Bogotá",
//     deliveryPhone: user?.telefono || user?.phone || "",

//     pickupPoint: "",
//     pickupContactName: user?.nombre || user?.name || "",
//     pickupContactPhone: user?.telefono || user?.phone || "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("");

//   const [paymentForm, setPaymentForm] = useState({
//     cardType: "debit",
//     cardNumber: "",
//     cardHolder: "",
//     cardExpiry: "",
//     cardCvv: "",
//     cardDocumentType: "CC",
//     cardDocumentNumber: "",
//     installments: "1",

//     transferBank: "",
//     transferDocumentType: "CC",
//     transferDocumentNumber: "",
//     transferPhone: user?.telefono || user?.phone || "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState("idle");
//   const [statusMessage, setStatusMessage] = useState("");
//   const [checkoutSale, setCheckoutSale] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [apiError, setApiError] = useState("");

//   useEffect(() => {
//     if (cartItems.length === 0) {
//       navigate("/cartshop/ver-carrito", { replace: true });
//     }
//   }, [cartItems, navigate]);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login", {
//         replace: true,
//         state: {
//           from: "/checkout",
//           reason: "checkout_required",
//         },
//       });
//     }
//   }, [isAuthenticated, navigate]);

//   const isClientRole = (user?.rol || user?.role) === "Cliente";

//   const discountValue = useMemo(() => {
//     if (cartSubtotal >= 100000) {
//       return 5000;
//     }

//     return 0;
//   }, [cartSubtotal]);

//   const deliveryFee = useMemo(() => {
//     if (deliveryMethod === "delivery") {
//       return 8000;
//     }

//     if (deliveryMethod === "pickup") {
//       return 0;
//     }

//     return 0;
//   }, [deliveryMethod]);

//   const ivaValue = useMemo(() => {
//     const taxableBase = Math.max(cartSubtotal - discountValue, 0);
//     return Math.round(taxableBase * 0.19);
//   }, [cartSubtotal, discountValue]);

//   const grandTotal = useMemo(() => {
//     return Math.max(cartSubtotal - discountValue, 0) + ivaValue + deliveryFee;
//   }, [cartSubtotal, discountValue, ivaValue, deliveryFee]);

//   const handleDeliveryInputChange = (event) => {
//     const { name, value } = event.target;

//     setDeliveryForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   };

//   const handlePaymentInputChange = (event) => {
//     const { name, value } = event.target;

//     let nextValue = value;

//     if (name === "cardNumber") {
//       nextValue = formatCardNumber(value);
//     }

//     if (name === "cardExpiry") {
//       nextValue = formatExpiry(value);
//     }

//     if (name === "cardCvv") {
//       nextValue = onlyDigits(value).slice(0, 4);
//     }

//     if (
//       [
//         "cardDocumentNumber",
//         "transferDocumentNumber",
//         "transferPhone",
//       ].includes(name)
//     ) {
//       nextValue = onlyDigits(value);
//     }

//     setPaymentForm((prev) => ({
//       ...prev,
//       [name]: nextValue,
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   };

//   const validateDeliveryStep = () => {
//     const nextErrors = {};

//     if (!deliveryMethod) {
//       nextErrors.deliveryMethod = "Debes seleccionar una forma de entrega.";
//     }

//     if (deliveryMethod === "delivery") {
//       if (!deliveryForm.deliveryAddress.trim()) {
//         nextErrors.deliveryAddress = "La dirección de entrega es obligatoria.";
//       }

//       if (!deliveryForm.deliveryCity.trim()) {
//         nextErrors.deliveryCity = "La ciudad es obligatoria.";
//       }

//       if (!deliveryForm.deliveryPhone.trim()) {
//         nextErrors.deliveryPhone = "El teléfono de contacto es obligatorio.";
//       }
//     }

//     if (deliveryMethod === "pickup") {
//       if (!deliveryForm.pickupPoint.trim()) {
//         nextErrors.pickupPoint = "Debes seleccionar un punto de entrega.";
//       }

//       if (!deliveryForm.pickupContactName.trim()) {
//         nextErrors.pickupContactName = "El nombre de contacto es obligatorio.";
//       }

//       if (!deliveryForm.pickupContactPhone.trim()) {
//         nextErrors.pickupContactPhone = "El teléfono de contacto es obligatorio.";
//       }
//     }

//     setErrors(nextErrors);
//     return Object.keys(nextErrors).length === 0;
//   };

//   const validatePaymentStep = () => {
//     const nextErrors = {};

//     if (!paymentMethod) {
//       nextErrors.paymentMethod = "Debes seleccionar un método de pago.";
//     }

//     if (paymentMethod === "card") {
//       if (!paymentForm.cardNumber.trim()) {
//         nextErrors.cardNumber = "El número de tarjeta es obligatorio.";
//       }

//       if (onlyDigits(paymentForm.cardNumber).length < 16) {
//         nextErrors.cardNumber = "La tarjeta debe tener 16 dígitos.";
//       }

//       if (!paymentForm.cardHolder.trim()) {
//         nextErrors.cardHolder = "El titular de la tarjeta es obligatorio.";
//       }

//       if (!paymentForm.cardExpiry.trim() || paymentForm.cardExpiry.length < 5) {
//         nextErrors.cardExpiry = "La fecha de vencimiento es obligatoria.";
//       }

//       if (!paymentForm.cardCvv.trim()) {
//         nextErrors.cardCvv = "El CVV es obligatorio.";
//       }

//       if (paymentForm.cardCvv.length < 3) {
//         nextErrors.cardCvv = "El CVV debe tener al menos 3 dígitos.";
//       }

//       if (!paymentForm.cardDocumentType) {
//         nextErrors.cardDocumentType = "El tipo de documento es obligatorio.";
//       }

//       if (!paymentForm.cardDocumentNumber.trim()) {
//         nextErrors.cardDocumentNumber = "El número de documento es obligatorio.";
//       }
//     }

//     if (paymentMethod === "transfer") {
//       if (!paymentForm.transferBank) {
//         nextErrors.transferBank = "Debes seleccionar un banco.";
//       }

//       if (!paymentForm.transferDocumentType) {
//         nextErrors.transferDocumentType = "El tipo de documento es obligatorio.";
//       }

//       if (!paymentForm.transferDocumentNumber.trim()) {
//         nextErrors.transferDocumentNumber = "El número de documento es obligatorio.";
//       }

//       if (!paymentForm.transferPhone.trim()) {
//         nextErrors.transferPhone = "El teléfono es obligatorio.";
//       }
//     }

//     setErrors(nextErrors);
//     return Object.keys(nextErrors).length === 0;
//   };

//   const handleContinueToPayment = () => {
//     const isValid = validateDeliveryStep();

//     if (!isValid) {
//       return;
//     }

//     setCurrentStep(2);
//   };

//   const handleBackToDelivery = () => {
//     setCurrentStep(1);
//     setErrors({});
//   };

//   const handleProcessPayment = async () => {
//     const isValid = validatePaymentStep();

//     if (!isValid) {
//       return;
//     }

//     setApiError("");
//     setIsStatusModalOpen(true);
//     setPaymentStatus("pending_validation");
//     setStatusMessage("Tu pago está siendo validado y la compra está siendo registrada.");
//     setSaving(true);

//     try {
//       const decision = simulateGatewayDecision({
//         paymentMethod,
//         cardNumber: paymentForm.cardNumber,
//         documentNumber:
//           paymentMethod === "card"
//             ? paymentForm.cardDocumentNumber
//             : paymentForm.transferDocumentNumber,
//       });

//       if (decision === "rejected") {
//         setPaymentStatus("rejected");
//         setStatusMessage(
//           "La transacción fue rechazada. Puedes corregir los datos e intentarlo de nuevo."
//         );
//         return;
//       }

//       const response = await createCustomerCheckout(
//         buildCustomerCheckoutBody({
//           invoiceNumber: buildInvoiceNumber(),
//           subtotal: Math.max(cartSubtotal - discountValue, 0),
//           iva: ivaValue,
//           discount: 0,
//           total: grandTotal,
//           paymentType: mapCheckoutPaymentToBackend({
//             paymentMethod,
//             cardType: paymentForm.cardType,
//           }),
//           lines: cartItems.map((item) => ({
//             medicationId: item.id,
//             quantity: item.quantity,
//           })),
//         })
//       );

//       const result = mapCustomerCheckoutResponse(response);

//       setCheckoutSale(result);
//       setPaymentStatus("approved");
//       setStatusMessage("Tu compra fue confirmada correctamente.");
//       setCurrentStep(3);

//       await clearActiveCart();
//     } catch (error) {
//       const fields = error?.error?.fields;
//       let message =
//         error?.error?.message || "No se pudo completar la compra.";

//       if (fields && typeof fields === "object") {
//         const first = Object.values(fields).flat()[0];
//         if (first) {
//           message = `${message} (${first})`;
//         }
//       }

//       setApiError(message);
//       setPaymentStatus("rejected");
//       setStatusMessage(message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDownloadInvoice = async () => {
//     if (!checkoutSale?.id) return;

//     try {
//       const response = await downloadSaleInvoice(checkoutSale.id);
//       const blob = await extractBlobPayload(response);

//       triggerBlobDownload(
//         blob,
//         `factura_${checkoutSale.invoice_number || checkoutSale.id}.pdf`
//       );
//     } catch (error) {
//       setApiError(
//         error?.error?.message || "No se pudo descargar la factura."
//       );
//     }
//   };

//   const handleCloseStatusModal = () => {
//     setIsStatusModalOpen(false);

//     if (paymentStatus === "rejected") {
//       setPaymentStatus("idle");
//       setStatusMessage("");
//       return;
//     }

//     if (paymentStatus === "approved") {
//       navigate("/", { replace: true });
//     }
//   };

//   if (!isClientRole) {
//     return (
//       <div className="min-h-screen px-4 py-8 text-label">
//         <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8">
//           <div className="flex items-center gap-3 mb-4">
//             <CircleAlert className="size-6" />
//             <h1 className="text-2xl font-bold">
//               Checkout exclusivo para clientes
//             </h1>
//           </div>

//           <p className="mb-6">
//             Este flujo está pensado para compras web del cliente autenticado.
//           </p>

//           <div className="flex gap-3">
//             <Button
//               variant="secondary"
//               size="sm"
//               type="button"
//               onClick={() => navigate("/cartshop/ver-carrito")}
//             >
//               Volver al carrito
//             </Button>

//             <Button
//               variant="primary"
//               size="sm"
//               type="button"
//               onClick={() => navigate("/")}
//             >
//               Ir al inicio
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-4 py-8 text-label">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-6 rounded-3xl bg-white/70 backdrop-blur-md shadow-xl p-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold">Checkout y pago seguro</h1>
//               <p className="text-sm mt-1">
//                 Finaliza tu compra y recibe tu factura digital.
//               </p>
//             </div>

//             <div className="flex gap-2 flex-wrap">
//               <StepBadge active={currentStep === 1} completed={currentStep > 1} label="Entrega" />
//               <StepBadge active={currentStep === 2} completed={currentStep > 2} label="Pago" />
//               <StepBadge
//                 active={currentStep === 3}
//                 completed={currentStep >= 3 && paymentStatus === "approved"}
//                 label="Confirmación"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-6">
//           <div className="space-y-6">
//             <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <ReceiptText className="size-5" />
//                 <div>
//                   <h2 className="text-xl font-bold">1. Método de entrega</h2>
//                   <p className="text-sm">Selecciona cómo deseas recibir tu pedido.</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {DELIVERY_METHODS.map((option) => {
//                   const Icon = option.icon;
//                   const isSelected = deliveryMethod === option.value;

//                   return (
//                     <button
//                       key={option.id}
//                       type="button"
//                       onClick={() => {
//                         setDeliveryMethod(option.value);
//                         setErrors((prev) => ({
//                           ...prev,
//                           deliveryMethod: "",
//                         }));
//                       }}
//                       className={`
//                         rounded-2xl border p-4 text-left transition
//                         ${isSelected
//                           ? "border-border-strong bg-white/80 shadow-md"
//                           : "border-border hover:bg-white/60"}
//                       `}
//                     >
//                       <div className="flex items-center gap-3 mb-2">
//                         <Icon className="size-5" />
//                         <span className="font-semibold">{option.label}</span>
//                       </div>

//                       <p className="text-sm">{option.description}</p>
//                     </button>
//                   );
//                 })}
//               </div>

//               {errors.deliveryMethod ? (
//                 <p className="text-mostsmall text-red-600 mt-2">
//                   {errors.deliveryMethod}
//                 </p>
//               ) : null}

//               {deliveryMethod === "delivery" && (
//                 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <Input
//                     label="Dirección de entrega"
//                     name="deliveryAddress"
//                     value={deliveryForm.deliveryAddress}
//                     onChange={handleDeliveryInputChange}
//                     error={errors.deliveryAddress}
//                     wrapperClassName="w-full"
//                   />

//                   <Input
//                     label="Ciudad"
//                     name="deliveryCity"
//                     value={deliveryForm.deliveryCity}
//                     onChange={handleDeliveryInputChange}
//                     error={errors.deliveryCity}
//                     wrapperClassName="w-full"
//                   />

//                   <Input
//                     label="Teléfono de contacto"
//                     name="deliveryPhone"
//                     value={deliveryForm.deliveryPhone}
//                     onChange={handleDeliveryInputChange}
//                     error={errors.deliveryPhone}
//                     wrapperClassName="w-full"
//                   />
//                 </div>
//               )}

//               {deliveryMethod === "pickup" && (
//                 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <Select
//                     label="Punto de entrega"
//                     name="pickupPoint"
//                     value={deliveryForm.pickupPoint}
//                     onChange={handleDeliveryInputChange}
//                     options={[
//                       { id: "north", value: "north", label: "Punto Norte" },
//                       { id: "center", value: "center", label: "Punto Centro" },
//                       { id: "south", value: "south", label: "Punto Sur" },
//                     ]}
//                     placeholder="Selecciona un punto"
//                     error={errors.pickupPoint}
//                     wrapperClassName="w-full"
//                   />

//                   <Input
//                     label="Nombre de quien retira"
//                     name="pickupContactName"
//                     value={deliveryForm.pickupContactName}
//                     onChange={handleDeliveryInputChange}
//                     error={errors.pickupContactName}
//                     wrapperClassName="w-full"
//                   />

//                   <Input
//                     label="Teléfono de contacto"
//                     name="pickupContactPhone"
//                     value={deliveryForm.pickupContactPhone}
//                     onChange={handleDeliveryInputChange}
//                     error={errors.pickupContactPhone}
//                     wrapperClassName="w-full"
//                   />
//                 </div>
//               )}

//               <div className="mt-6 flex justify-end">
//                 <Button
//                   variant="primary"
//                   size="sm"
//                   type="button"
//                   onClick={handleContinueToPayment}
//                   disabled={!deliveryMethod}
//                 >
//                   Continuar al pago
//                 </Button>
//               </div>
//             </section>

//             {currentStep >= 2 && (
//               <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <Wallet className="size-5" />
//                   <div>
//                     <h2 className="text-xl font-bold">2. Método de pago</h2>
//                     <p className="text-sm">Selecciona cómo deseas pagar tu compra.</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {PAYMENT_METHODS.map((option) => {
//                     const Icon = option.icon;
//                     const isSelected = paymentMethod === option.value;

//                     return (
//                       <button
//                         key={option.id}
//                         type="button"
//                         onClick={() => {
//                           setPaymentMethod(option.value);
//                           setErrors((prev) => ({
//                             ...prev,
//                             paymentMethod: "",
//                           }));
//                         }}
//                         className={`
//                           rounded-2xl border p-4 text-left transition
//                           ${isSelected
//                             ? "border-border-strong bg-white/80 shadow-md"
//                             : "border-border hover:bg-white/60"}
//                         `}
//                       >
//                         <div className="flex items-center gap-3 mb-2">
//                           <Icon className="size-5" />
//                           <span className="font-semibold">{option.label}</span>
//                         </div>

//                         <p className="text-sm">{option.description}</p>
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {errors.paymentMethod ? (
//                   <p className="text-mostsmall text-red-600 mt-2">
//                     {errors.paymentMethod}
//                   </p>
//                 ) : null}

//                 {paymentMethod === "card" && (
//                   <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <Select
//                       label="Tipo de tarjeta"
//                       name="cardType"
//                       value={paymentForm.cardType}
//                       onChange={handlePaymentInputChange}
//                       options={[
//                         { id: "debit", value: "debit", label: "Débito" },
//                         { id: "credit", value: "credit", label: "Crédito" },
//                       ]}
//                       placeholder="Tipo"
//                       wrapperClassName="w-full"
//                     />

//                     <Input
//                       label="Número de tarjeta"
//                       name="cardNumber"
//                       value={paymentForm.cardNumber}
//                       onChange={handlePaymentInputChange}
//                       error={errors.cardNumber}
//                       wrapperClassName="w-full"
//                     />

//                     <Input
//                       label="Titular"
//                       name="cardHolder"
//                       value={paymentForm.cardHolder}
//                       onChange={handlePaymentInputChange}
//                       error={errors.cardHolder}
//                       wrapperClassName="w-full"
//                     />

//                     <Input
//                       label="Vencimiento (MM/YY)"
//                       name="cardExpiry"
//                       value={paymentForm.cardExpiry}
//                       onChange={handlePaymentInputChange}
//                       error={errors.cardExpiry}
//                       wrapperClassName="w-full"
//                     />

//                     <Input
//                       label="CVV"
//                       name="cardCvv"
//                       value={paymentForm.cardCvv}
//                       onChange={handlePaymentInputChange}
//                       error={errors.cardCvv}
//                       wrapperClassName="w-full"
//                     />

//                     <Select
//                       label="Tipo de documento"
//                       name="cardDocumentType"
//                       value={paymentForm.cardDocumentType}
//                       onChange={handlePaymentInputChange}
//                       options={DOCUMENT_TYPE_OPTIONS}
//                       placeholder="Tipo"
//                       error={errors.cardDocumentType}
//                       wrapperClassName="w-full"
//                     />

//                     <Input
//                       label="Número de documento"
//                       name="cardDocumentNumber"
//                       value={paymentForm.cardDocumentNumber}
//                       onChange={handlePaymentInputChange}
//                       error={errors.cardDocumentNumber}
//                       wrapperClassName="w-full"
//                     />

//                     {paymentForm.cardType === "credit" && (
//                       <Select
//                         label="Cuotas"
//                         name="installments"
//                         value={paymentForm.installments}
//                         onChange={handlePaymentInputChange}
//                         options={INSTALLMENT_OPTIONS}
//                         placeholder="Cuotas"
//                         wrapperClassName="w-full"
//                       />
//                     )}
//                   </div>
//                 )}

//                 {paymentMethod === "transfer" && (
//                   <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <Select
//                       label="Banco"
//                       name="transferBank"
//                       value={paymentForm.transferBank}
//                       onChange={handlePaymentInputChange}
//                       options={TRANSFER_BANK_OPTIONS}
//                       placeholder="Selecciona un banco"
//                       error={errors.transferBank}
//                       wrapperClassName="w-full"
//                     />

//                     <Select
//                       label="Tipo de documento"
//                       name="transferDocumentType"
//                       value={paymentForm.transferDocumentType}
//                       onChange={handlePaymentInputChange}
//                       options={DOCUMENT_TYPE_OPTIONS}
//                       placeholder="Tipo"
//                       error={errors.transferDocumentType}
//                       wrapperClassName="w-full"
//                     />

//                     <Input
//                       label="Número de documento"
//                       name="transferDocumentNumber"
//                       value={paymentForm.transferDocumentNumber}
//                       onChange={handlePaymentInputChange}
//                       error={errors.transferDocumentNumber}
//                       wrapperClassName="w-full"
//                     />

//                     <Input
//                       label="Teléfono"
//                       name="transferPhone"
//                       value={paymentForm.transferPhone}
//                       onChange={handlePaymentInputChange}
//                       error={errors.transferPhone}
//                       wrapperClassName="w-full"
//                     />
//                   </div>
//                 )}

//                 {apiError ? (
//                   <p className="mt-4 text-sm text-red-600" role="alert">
//                     {apiError}
//                   </p>
//                 ) : null}

//                 <div className="mt-6 flex flex-col-reverse sm:flex-row justify-between gap-3">
//                   <Button
//                     variant="secondary"
//                     size="sm"
//                     type="button"
//                     onClick={handleBackToDelivery}
//                   >
//                     Volver
//                   </Button>

//                   <Button
//                     variant="primary"
//                     size="sm"
//                     type="button"
//                     onClick={handleProcessPayment}
//                     disabled={saving}
//                   >
//                     Pagar ahora
//                   </Button>
//                 </div>
//               </section>
//             )}
//           </div>

//           <div className="space-y-6">
//             {paymentMethod === "card" && (
//               <SaleCardPreview
//                 cardNumber={paymentForm.cardNumber}
//                 cardHolder={paymentForm.cardHolder}
//                 cardExpiry={paymentForm.cardExpiry}
//                 bankName={detectCardBank(paymentForm.cardNumber)}
//                 brandName={detectCardBrand(paymentForm.cardNumber)}
//                 gradientClasses={getCardPreviewClasses(paymentForm.cardNumber)}
//               />
//             )}

//             <section className="rounded-3xl bg-white/70 backdrop-blur-md shadow-xl p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <Wallet className="size-5" />
//                 <div>
//                   <h3 className="text-lg font-bold">Resumen de tu compra</h3>
//                   <p className="text-sm text-label/80">
//                     Revisa el total antes de confirmar.
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <SummaryRow label="Cliente" value={user?.nombre || user?.name || "—"} />
//                 <SummaryRow label="Ítems" value={String(cartCount)} />
//                 <SummaryRow label="Subtotal" value={`$${formatCurrency(cartSubtotal)}`} />
//                 <SummaryRow label="Descuento" value={`$${formatCurrency(discountValue)}`} />
//                 <SummaryRow label="IVA" value={`$${formatCurrency(ivaValue)}`} />
//                 <SummaryRow label="Envío" value={`$${formatCurrency(deliveryFee)}`} />
//                 <div className="pt-3 border-t border-border-strong">
//                   <SummaryRow label="Total" value={`$${formatCurrency(grandTotal)}`} strong={true} />
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>

//       <Modal
//         isOpen={isStatusModalOpen}
//         onClose={handleCloseStatusModal}
//         title={
//           paymentStatus === "approved"
//             ? "Compra confirmada"
//             : paymentStatus === "rejected"
//             ? "Pago rechazado"
//             : "Procesando pago"
//         }
//       >
//         <div className="space-y-4">
//           <p className="text-sm text-label/80">{statusMessage}</p>

//           {paymentStatus === "approved" && checkoutSale ? (
//             <div className="rounded-2xl border border-border-strong bg-white/60 p-4">
//               <h4 className="font-bold text-label mb-3">Comprobante de compra</h4>

//               <div className="space-y-2 text-sm">
//                 <SummaryRow label="Factura" value={checkoutSale.invoice_number} />
//                 <SummaryRow label="Fecha" value={checkoutSale.sale_datetime} />
//                 <SummaryRow label="Cliente" value={checkoutSale.customer?.name || ""} />
//                 <SummaryRow label="Método de pago" value={checkoutSale.payment_type} />
//                 <SummaryRow label="Estado" value={checkoutSale.status} />
//                 <SummaryRow label="Total" value={`$${formatCurrency(checkoutSale.total)}`} strong={true} />
//               </div>
//             </div>
//           ) : null}

//           <div className="flex flex-wrap justify-end gap-3">
//             {paymentStatus === "approved" && (
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 type="button"
//                 onClick={handleDownloadInvoice}
//               >
//                 Descargar factura
//               </Button>
//             )}

//             <Button
//               variant="primary"
//               size="sm"
//               type="button"
//               onClick={handleCloseStatusModal}
//             >
//               Finalizar
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// function StepBadge({ label, active, completed }) {
//   return (
//     <div
//       className={`
//         px-4 py-2 rounded-full text-sm font-semibold border
//         ${completed
//           ? "bg-white border-border-strong"
//           : active
//           ? "bg-white border-border-strong"
//           : "bg-white/40 border-border"}
//       `}
//     >
//       {label}
//     </div>
//   );
// }

// function SummaryRow({ label, value, strong = false }) {
//   return (
//     <div className="flex items-center justify-between gap-4">
//       <span className={strong ? "font-bold text-label" : "text-gray-700"}>
//         {label}
//       </span>
//       <span className={strong ? "font-bold text-label" : "text-gray-700"}>
//         {value}
//       </span>
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
import { useToast } from "@/shared/components/ToastContext";
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
  createCustomerCheckout,
  downloadSaleInvoice,
} from "@/lib/http/sales";
import {
  buildCustomerCheckoutBody,
  mapCustomerCheckoutResponse,
} from "@/lib/adapters/salesAdapter";

// Subcomponente visual separado para la simulación de tarjeta
import SaleCardPreview from "@/features/sales/components/SaleCardPreview";

/**
 * =========================
 * CONSTANTES LOCALES DE UI
 * =========================
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

// Métodos de pago válidos para el flujo web del cliente
const PAYMENT_METHODS = [
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

// Bancos para transferencia / PSE
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

// Tipos de documento
const DOCUMENT_TYPE_OPTIONS = [
  { id: "CC", value: "CC", label: "CC" },
  { id: "CE", value: "CE", label: "CE" },
  { id: "TI", value: "TI", label: "TI" },
  { id: "PEP", value: "PEP", label: "PEP" },
  { id: "PPT", value: "PPT", label: "PPT" },
];

// Cuotas
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
 */

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

function detectCardBank(cardNumber = "") {
  const digits = onlyDigits(cardNumber);

  if (/^(457562|4558|4110)/.test(digits)) return "BBVA";
  if (/^(528209|530373|552244)/.test(digits)) return "Bancolombia";
  if (/^(402360|450995|451760)/.test(digits)) return "Davivienda";
  if (/^(451714|438935)/.test(digits)) return "Banco de Bogotá";

  return "Entidad financiera";
}

function getCardPreviewClasses(cardNumber = "") {
  const bank = detectCardBank(cardNumber);
  const brand = detectCardBrand(cardNumber);

  if (bank === "BBVA") return "from-blue-900 to-sky-500";
  if (bank === "Bancolombia") return "from-yellow-500 to-blue-700";
  if (bank === "Davivienda") return "from-red-700 to-red-400";
  if (bank === "Banco de Bogotá") return "from-red-900 to-rose-500";
  if (brand === "American Express") return "from-slate-800 to-cyan-600";
  if (brand === "Visa") return "from-indigo-900 to-blue-500";
  if (brand === "Mastercard") return "from-zinc-900 to-orange-500";

  return "from-slate-800 to-slate-500";
}

function simulateGatewayDecision({ paymentMethod, cardNumber, documentNumber }) {
  const safeCardNumber = onlyDigits(cardNumber);
  const safeDocumentNumber = onlyDigits(documentNumber);

  if (paymentMethod === "card" && safeCardNumber.endsWith("0")) {
    return "rejected";
  }

  if (paymentMethod === "transfer" && safeDocumentNumber.endsWith("0")) {
    return "rejected";
  }

  return "approved";
}

function buildInvoiceNumber() {
  const stamp = Date.now().toString().slice(-8);
  return `WEB-${stamp}`;
}

function getUserRole(user) {
  return user?.rol || user?.role || "";
}

function getUserName(user) {
  return user?.nombre || user?.name || "";
}

function getUserEmail(user) {
  return user?.email || "";
}

function getUserPhone(user) {
  return user?.telefono || user?.phone || "";
}

function getUserAddress(user) {
  return user?.direccion || user?.address || "";
}

function mapCheckoutPaymentToBackend({ paymentMethod, cardType }) {
  if (paymentMethod === "transfer") {
    return "Transferencia";
  }

  if (paymentMethod === "card" && cardType === "debit") {
    return "Tarjeta débito";
  }

  return "Tarjeta crédito";
}

/**
 * Intenta extraer un Blob independientemente del tipo de cliente HTTP.
 */
async function extractBlobPayload(response) {
  if (!response) {
    return null;
  }

  if (response instanceof Blob) {
    return response;
  }

  if (response.data instanceof Blob) {
    return response.data;
  }

  if (typeof response.blob === "function") {
    return await response.blob();
  }

  if (response.body instanceof Blob) {
    return response.body;
  }

  return null;
}

/**
 * Fuerza la descarga del archivo en navegador.
 */
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

/**
 * =========================
 * COMPONENTE PRINCIPAL
 * =========================
 */
export default function WebCheckoutPage() {
  const navigate = useNavigate();

  /**
   * =========================
   * CONTEXTOS REALES
   * =========================
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
   * ESTADOS DEL CHECKOUT
   * =========================
   */
  const [currentStep, setCurrentStep] = useState(1);

  // Método de entrega
  const [deliveryMethod, setDeliveryMethod] = useState("");

  // Datos de entrega
  const [deliveryForm, setDeliveryForm] = useState({
    deliveryAddress: getUserAddress(user),
    deliveryCity: "Bogotá",
    deliveryPhone: getUserPhone(user),

    pickupPoint: "",
    pickupContactName: getUserName(user),
    pickupContactPhone: getUserPhone(user),
  });

  // Método de pago
  const [paymentMethod, setPaymentMethod] = useState("");

  // Datos de pago
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
    transferPhone: getUserPhone(user),
  });

  // Errores
  const [errors, setErrors] = useState({});

  // Estado general de procesamiento
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [saving, setSaving] = useState(false);

  // Compra persistida
  const [checkoutSale, setCheckoutSale] = useState(null);

  // Mensajes auxiliares
  const [apiError, setApiError] = useState("");

  /**
   * =========================
   * EFFECTS DE SEGURIDAD / UX
   * =========================
   */

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
          from: "/checkout",
          reason: "checkout_required",
        },
      });
    }
  }, [isAuthenticated, navigate]);

  /**
   * Solo el rol Cliente debe usar este flujo.
   * Si entra personal interno por error, se redirige a la venta asistida.
   */
  const role = getUserRole(user);
  const isClientRole = role === "Cliente";

  useEffect(() => {
    if (role === "Administrador" || role === "Farmaceuta") {
      navigate("/sales/factura-electronica", { replace: true });
    }
  }, [role, navigate]);

  /**
   * =========================
   * CÁLCULOS DE RESUMEN
   * =========================
   */
  const discountValue = useMemo(() => {
    if (cartSubtotal >= 100000) {
      return 5000;
    }

    return 0;
  }, [cartSubtotal]);

  const deliveryFee = useMemo(() => {
    if (deliveryMethod === "delivery") {
      return 8000;
    }

    if (deliveryMethod === "pickup") {
      return 0;
    }

    return 0;
  }, [deliveryMethod]);

  const ivaValue = useMemo(() => {
    const taxableBase = Math.max(cartSubtotal - discountValue, 0);
    return Math.round(taxableBase * 0.19);
  }, [cartSubtotal, discountValue]);

  const grandTotal = useMemo(() => {
    return Math.max(cartSubtotal - discountValue, 0) + ivaValue + deliveryFee;
  }, [cartSubtotal, discountValue, ivaValue, deliveryFee]);

  /**
   * =========================
   * CAMBIOS DE FORMULARIO
   * =========================
   */
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

  const handlePaymentInputChange = (event) => {
    const { name, value } = event.target;

    let nextValue = value;

    if (name === "cardNumber") {
      nextValue = formatCardNumber(value);
    }

    if (name === "cardExpiry") {
      nextValue = formatExpiry(value);
    }

    if (name === "cardCvv") {
      nextValue = onlyDigits(value).slice(0, 4);
    }

    if (
      [
        "cardDocumentNumber",
        "transferDocumentNumber",
        "transferPhone",
      ].includes(name)
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

  /**
   * =========================
   * VALIDACIONES
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

  const validatePaymentStep = () => {
    const nextErrors = {};

    if (!paymentMethod) {
      nextErrors.paymentMethod = "Debes seleccionar un método de pago.";
    }

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

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  /**
   * =========================
   * NAVEGACIÓN DE PASOS
   * =========================
   */
  const handleContinueToPayment = () => {
    const isValid = validateDeliveryStep();

    if (!isValid) {
      return;
    }

    setCurrentStep(2);
  };

  const handleBackToDelivery = () => {
    setCurrentStep(1);
    setErrors({});
  };

  /**
   * Toasts globales del sistema.
   */
  const { pushToast } = useToast();
  /**
   * =========================
   * PROCESAR PAGO REAL
   * =========================
   */
    /**
   * =========================
   * PROCESAR PAGO REAL
   * =========================
   */
  const handleProcessPayment = async () => {
    const isValid = validatePaymentStep();

    if (!isValid) {
      return;
    }

    setApiError("");
    setIsStatusModalOpen(true);
    setPaymentStatus("pending_validation");
    setStatusMessage("Tu compra está siendo procesada y el pago está en validación.");
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

      const invoiceNumber = buildInvoiceNumber();

      /**
       * IMPORTANTE:
       * El backend del checkout web valida:
       * total = subtotal + iva - discount
       *
       * Por ahora el costo de envío sigue mostrándose en UI,
       * pero el valor persistido en Venta usa solo subtotal + iva - descuento,
       * según el contrato actual del backend.
       */
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

      /**
       * Body del checkout web.
       *
       * Además de la venta, ahora se envían los datos del método de entrega
       * porque el backend los valida y los persiste en la venta.
       */
      const checkoutBody = buildCustomerCheckoutBody({
        invoiceNumber,
        subtotal: saleSubtotal,
        iva: ivaValue,
        discount: saleDiscount,
        total: saleTotal,
        paymentType: mapCheckoutPaymentToBackend({
          paymentMethod,
          cardType: paymentForm.cardType,
        }),
        lines: normalizedLines,

        deliveryMethod,
        deliveryAddress: deliveryForm.deliveryAddress,
        deliveryCity: deliveryForm.deliveryCity,
        deliveryPhone: deliveryForm.deliveryPhone,
        pickupPoint: deliveryForm.pickupPoint,
        pickupContactName: deliveryForm.pickupContactName,
        pickupContactPhone: deliveryForm.pickupContactPhone,
      });

      const response = await createCustomerCheckout(checkoutBody);
      const result = mapCustomerCheckoutResponse(response);

      setCheckoutSale(result);

      setPaymentStatus("approved");
      setStatusMessage(
        "Tu compra fue registrada correctamente y quedó pendiente de validación por la farmacia."
      );

      /**
       * Toast visual para el cliente.
       *
       * En este flujo aún NO se aprueba internamente la venta;
       * solo se confirma que la compra quedó registrada.
       */
      pushToast({
        type: "success",
        title: "Compra registrada",
        message:
          "Tu compra fue registrada correctamente y está pendiente de validación por la farmacia.",
      });

      setCurrentStep(3);
      await clearActiveCart();
    } catch (error) {
      console.error("Error completo procesando venta:", error);
      console.error("error.error:", error?.error);
      console.error("error.error.fields:", error?.error?.fields);
      console.error("error raw string:", JSON.stringify(error, null, 2));

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

      pushToast({
        type: "error",
        title: "No se pudo completar la compra",
        message,
      });
    } finally {
      setSaving(false);
    }
  };

  /**
   * =========================
   * DESCARGA DE FACTURA REAL
   * =========================
   */
//   const handleDownloadInvoice = async () => {
//     if (!checkoutSale?.id) {
//       return;
//     }

//     try {
//       const response = await downloadSaleInvoice(checkoutSale.id);
//       const blob = await extractBlobPayload(response);

//       triggerBlobDownload(
//         blob,
//         `factura_${checkoutSale.invoice_number || checkoutSale.id}.pdf`
//       );
//     } catch (error) {
//       setApiError(
//         error?.error?.message || "No se pudo descargar la factura."
//       );
//     }
//   };
const handleDownloadInvoice = async () => {
  console.log("Click en descargar factura");
  console.log("checkoutSale:", checkoutSale);

  if (!checkoutSale?.id) {
    console.log("No hay id de venta para descargar factura.");
    return;
  }

  try {
    const response = await downloadSaleInvoice(checkoutSale.id);
    console.log("Respuesta descarga factura:", response);

    const blob = await extractBlobPayload(response);
    console.log("Blob extraído:", blob);

    triggerBlobDownload(
      blob,
      `factura_${checkoutSale.invoice_number || checkoutSale.id}.pdf`
    );
  } catch (error) {
    console.error("Error descargando factura:", error);
    setApiError(
      error?.error?.message || "No se pudo descargar la factura."
    );
  }
};

  /**
   * =========================
   * CERRAR MODAL DE ESTADO
   * =========================
   */
  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);

    if (paymentStatus === "rejected") {
      setPaymentStatus("idle");
      setStatusMessage("");
      return;
    }

    if (paymentStatus === "approved") {
      navigate("/", { replace: true });
    }
  };

  /**
   * =========================
   * GUARDAS DE RENDER
   * =========================
   */
  if (!isClientRole && role !== "Administrador" && role !== "Farmaceuta") {
    return (
      <div className="min-h-screen px-4 py-8 text-label">
        <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <CircleAlert className="size-6" />
            <h1 className="text-2xl font-bold">
              Checkout restringido
            </h1>
          </div>

          <p className="mb-6">
            Esta vista de compra está habilitada para clientes autenticados.
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
        {/* ENCABEZADO */}
        <div className="mb-6 rounded-3xl bg-white/70 backdrop-blur-md shadow-xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                Checkout y pago seguro
              </h1>
              <p className="text-sm mt-1">
                Finaliza tu compra y recibe tu factura digital.
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

        <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-6">
          {/* COLUMNA IZQUIERDA */}
          <div className="space-y-6">
            {/* PASO 1 */}
            <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <PackageSectionIcon currentStep={currentStep} />
                <div>
                  <h2 className="text-xl font-bold">
                    1. Método de entrega
                  </h2>
                  <p className="text-sm">
                    Define cómo deseas recibir tu pedido.
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

            {/* PASO 2 */}
            {currentStep >= 2 && (
              <section className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ReceiptText className="size-5" />
                  <div>
                    <h2 className="text-xl font-bold">
                      2. Método de pago
                    </h2>
                    <p className="text-sm">
                      Selecciona el método y completa la información requerida.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  >
                    Volver
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    type="button"
                    onClick={handleProcessPayment}
                    disabled={saving}
                  >
                    Pagar ahora
                  </Button>
                </div>
              </section>
            )}
          </div>

          {/* COLUMNA DERECHA */}
          <div className="space-y-6">
            {paymentMethod === "card" && (
              <SaleCardPreview
                cardNumber={paymentForm.cardNumber}
                cardHolder={paymentForm.cardHolder}
                cardExpiry={paymentForm.cardExpiry}
                bankName={detectCardBank(paymentForm.cardNumber)}
                brandName={detectCardBrand(paymentForm.cardNumber)}
                gradientClasses={getCardPreviewClasses(paymentForm.cardNumber)}
              />
            )}

            <section className="rounded-3xl bg-white/70 backdrop-blur-md shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Wallet className="size-5" />
                <div>
                  <h3 className="text-lg font-bold">Resumen de la compra</h3>
                  <p className="text-sm text-label/80">
                    Información consolidada del checkout.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <SummaryRow
                  label="Cliente"
                  value={getUserName(user) || "—"}
                />
                <SummaryRow
                  label="Correo"
                  value={getUserEmail(user) || "—"}
                />
                <SummaryRow label="Ítems" value={String(cartCount)} />
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
                <div className="pt-3 border-t border-border-strong">
                  <SummaryRow
                    label="Total"
                    value={`$${formatCurrency(grandTotal)}`}
                    strong={true}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* MODAL DE ESTADO / RESULTADO */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={handleCloseStatusModal}
        title={
          paymentStatus === "approved"
            ? "Compra confirmada"
            : paymentStatus === "rejected"
            ? "Pago rechazado"
            : "Procesando compra"
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-label/80">{statusMessage}</p>

          {paymentStatus === "approved" && checkoutSale ? (
            <div className="rounded-2xl border border-border-strong bg-white/60 p-4">
              <h4 className="font-bold text-label mb-3">
                Comprobante de compra
              </h4>

              <div className="space-y-2 text-sm">
                <SummaryRow label="Factura" value={checkoutSale.invoice_number} />
                <SummaryRow label="Fecha" value={checkoutSale.sale_datetime} />
                <SummaryRow label="Cliente" value={checkoutSale.customer?.name || ""} />
                <SummaryRow label="Método de pago" value={checkoutSale.payment_type} />
                <SummaryRow label="Estado" value={checkoutSale.status} />
                <SummaryRow
                  label="Total"
                  value={`$${formatCurrency(checkoutSale.total)}`}
                  strong={true}
                />
              </div>
            </div>
          ) : null}

          <div className="flex flex-wrap justify-end gap-3">
            {paymentStatus === "approved" && (
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={handleDownloadInvoice}
              >
                Descargar factura
              </Button>
            )}

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
      </Modal>
    </div>
  );
}

/**
 * =========================
 * SUBCOMPONENTES LOCALES
 * =========================
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
      <span className={strong ? "font-bold text-label text-right" : "text-gray-700 text-right"}>
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