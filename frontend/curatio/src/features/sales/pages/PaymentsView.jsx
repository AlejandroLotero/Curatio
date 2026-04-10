import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleArrowLeft, CreditCard, Wallet } from "lucide-react";
import { Button, Select, Input, Modal } from "@/shared/components";
import { useCart } from "@/features/cartshop/context/CartContext";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getPaymentsTypes } from "@/features/sales/services/selectServices";

/** IVA Colombia (19 %). */
const IVA_RATE = 0.19;

/**
 * IDs en paymentsTypes.json para tarjeta (débito / crédito).
 * Se compara en minúsculas para cubrir variantes como "Credito".
 */
function isCardPaymentMethod(paymentTypeId) {
  if (!paymentTypeId) return false;
  const id = String(paymentTypeId).toLowerCase();
  return id === "debito" || id === "credito"; // Verifica si el método de pago es débito o crédito
}

/** Solo dígitos, máx. 19 (PAN). */
function digitsOnly(value) { 
  return String(value).replace(/\D/g, "");
}

/** Formato visual 1234 5678 9012 3456 */
function formatCardNumberDisplay(value) {
  const d = digitsOnly(value).slice(0, 19); // Limita a 19 dígitos
  return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim(); // Valida 4 digitos por grupo y agregar un espacio entre cada grupo
}

/** MM/AA con barra automática al escribir. */
function formatExpiryInput(value) {
  const d = digitsOnly(value).slice(0, 4); // Limita a 4 dígitos
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`; // Agrega una barra entre el mes y el año
}

/** Enmascara el PAN(pan es el número de tarjeta) mostrando solo las últimas 4 cifras (nunca el CVV). */
function maskCardNumber(value) {
  const d = digitsOnly(value);
  if (d.length < 4) return "•••• •••• •••• ••••";
  const last4 = d.slice(-4);
  return `•••• •••• •••• ${last4}`;
}

const MERCHANT_DISPLAY_NAME = "Curatio";

/**
 * PaymentsView
 * --------------
 * Paso de pago tras "Ir a pagar" con sesión activa.
 *
 * - Resume líneas del carrito (mismos datos que ViewCartShopPage).
 * - Permite elegir método de pago (catálogo local paymentsTypes.json).

 *
 * Siguiente paso en el flujo real: generar venta
 */
export default function PaymentsView() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, cartSubtotal, cartCount, clearActiveCart } = useCart();

  const [paymentTypes, setPaymentTypes] = useState([]);
  const [paymentTypeId, setPaymentTypeId] = useState("");

  /**
   * Datos de tarjeta (solo si el método es débito o crédito).
   */
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  /** Modal de confirmación antes de registrar el pago y ver la pantalla de éxito. */
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  /**
   * Al cambiar a transferencia u otro método, limpiar datos sensibles de tarjeta.
   */
  useEffect(() => {
    if (!isCardPaymentMethod(paymentTypeId)) {
      setCardHolder("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvv("");
    }
  }, [paymentTypeId]);

  /**
   * Opciones de método de pago (mismo origen que ElectronicInvoiceSalesPage).
   */
  useEffect(() => {
    let cancelled = false;
    getPaymentsTypes().then((data) => {
      if (!cancelled && Array.isArray(data)) setPaymentTypes(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const subtotal = Number(cartSubtotal) || 0;
  const taxAmount = useMemo(
    () => Math.round(subtotal * IVA_RATE),
    [subtotal]
  );
  const totalAPagar = subtotal + taxAmount;

  const showCardFields = isCardPaymentMethod(paymentTypeId); // Verifica si el método de pago es débito o crédito y muestra los campos de la tarjeta

  const isCardFormValid = useMemo(() => {
    if (!showCardFields) return true;
    // Verifica si el formulario de la tarjeta es válido
    const pan = digitsOnly(cardNumber); // Obtiene el número de tarjeta
    const exp = cardExpiry.trim(); // Obtiene la fecha de vencimiento
    const expOk = /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp); // Verifica si la fecha de vencimiento es válida (MM/AA)
    const cvvOk = /^[0-9]{3,4}$/.test(cardCvv.trim()); // Verifica si el CVV es válido (3 o 4 dígitos)
    return (
      cardHolder.trim().length >= 3 && // Verifica si el nombre del titular es válido (al menos 3 caracteres)
      pan.length >= 13 && pan.length <= 19 && expOk && // Verifica si el número de tarjeta es válido (al menos 13 dígitos) y no más de 19 dígitos
      cvvOk // Verifica si el CVV es válido (3 o 4 dígitos)
    );
  }, [showCardFields, cardHolder, cardNumber, cardExpiry, cardCvv]);

  const canConfirmPayment = Boolean(paymentTypeId) && isCardFormValid;

  const customerLabel =
    user?.name?.trim() || user?.email?.trim() || "Cliente registrado";

  const goToCart = () => navigate("/cartshop/ver-carrito");

  /** Etiqueta legible del método elegido (select). */
  const paymentMethodLabel = useMemo(() => {
    const opt = paymentTypes.find(
      (p) => String(p.id) === String(paymentTypeId)
    );
    return opt?.label ?? paymentTypeId ?? "—";
  }, [paymentTypes, paymentTypeId]);

  /** Texto de concepto para el comprobante (primer ítem + conteo). */
  const orderConcept = useMemo(() => {
    if (!cartItems.length) return "—"; // Si no hay productos, retorna un guión
    if (cartItems.length === 1) return cartItems[0].productName ?? "Pedido"; // Si hay un producto, retorna el nombre del producto
    const first = cartItems[0].productName ?? "Medicamentos"; // Si hay más de un producto, retorna el nombre del primer producto
    return `${first} y ${cartItems.length - 1} artículo(s) más`; // Retorna el nombre del primer producto y la cantidad de productos restantes
  }, [cartItems]);

  /** Abre el modal de revisión (no ejecuta el pago aún). */
  const handleOpenConfirmModal = () => {
    if (!canConfirmPayment) return;
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  /**
   * Confirma en el modal: vacía carrito local y navega a la vista de transacción exitosa.
   * En producción: llamar API primero y solo entonces clear + navigate.
   */
  const handleModalPay = () => {
    if (!canConfirmPayment) return;

    /** Fecha local AAAA-MM-DD (misma forma que en el diseño de referencia). */
    const now = new Date();
    const paymentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    navigate("/sales/confirmacion-pago", {
      replace: true,
      state: {
        transactionStatus: "Aprobada",
        merchantName: MERCHANT_DISPLAY_NAME,
        paymentDate,
        concept: orderConcept,
        paymentMethod: paymentMethodLabel,
        subtotal,
        total: totalAPagar,
      },
    });

    clearActiveCart();
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="min-h-screen px-4 py-6 text-label sm:px-6 sm:py-8"> 
      <div className="mx-auto max-w-4xl">
        {/* Cabecera: volver al carrito + título */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={goToCart}
              className="flex h-12 w-12 items-center justify-center transition-all duration-300 hover:scale-110 hover:rounded-full hover:bg-primarybtnhoverbg"
              aria-label="Volver al carrito"
            >
              <CircleArrowLeft className="h-9 w-9" strokeWidth={1.75} />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold text-label">
                Pago del pedido
              </h1>
              <p className="mt-0.5 truncate text-sm text-label/80">
                Sesión: <span className="font-medium">{customerLabel}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
            <Wallet className="h-4 w-4" aria-hidden />
            {cartCount} ítem(s)
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-border-strong bg-white/70 p-10 text-center shadow-xl backdrop-blur-md">
            <p className="mb-4 text-lg font-medium">
              No hay productos para pagar. Tu carrito está vacío o ya se procesó el
              pedido.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="secondary" size="sm" type="button" onClick={goToCart}>
                Ir al carrito
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="button"
                onClick={() => navigate("/")}
              >
                Seguir comprando
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-5">
            {/*
              Columna izquierda: detalle del pedido (misma información enriquecida
              que expone CartContext para la vista del carrito).
            */}
            <section
              className="
                lg:col-span-3 rounded-2xl border border-border-strong
                bg-white/70 p-4 shadow-xl backdrop-blur-md sm:p-6
              "
            >
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-label">
                <CreditCard className="h-5 w-5 shrink-0" aria-hidden />
                Resumen del pedido
              </h2>

              <ul className="divide-y divide-border-strong/40">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div
                      className="
                        flex h-14 w-14 shrink-0 items-center justify-center
                        overflow-hidden rounded-lg bg-white/80
                      "
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.productName ?? "Medicamento"}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <span className="px-1 text-center text-[10px] text-label/60">
                          Sin img
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold leading-tight text-label">
                        {item.productName}
                      </p>
                      {item.presentation ? (
                        <p className="mt-0.5 text-xs text-label/75">
                          {item.presentation}
                        </p>
                      ) : null}
                      <p className="mt-1 text-sm text-label/80">
                        Cantidad: {item.quantity} × $
                        {Number(item.unitPrice || 0).toLocaleString("es-CO")}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-label">
                      ${Number(item.subtotal || 0).toLocaleString("es-CO")}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/*
              Columna derecha: método de pago y totales (IVA referencial 19 %).
            */}
            <section
              className="
                flex flex-col gap-5 lg:col-span-2 rounded-2xl border border-border-strong
                bg-white/70 p-4 shadow-xl backdrop-blur-md sm:p-6
              "
            >
              <div>
                <Select
                  label="Método de pago"
                  name="paymentType"
                  options={paymentTypes}
                  placeholder="Selecciona cómo pagar"
                  value={paymentTypeId}
                  onChange={(e) => setPaymentTypeId(e.target.value)}
                  wrapperClassName="w-full"
                />
              </div>

              {/*
                Datos de tarjeta: solo para débito o crédito según el select.
                Titular, PAN, vencimiento (MM/AA) y CVV (oculto).
              */}
              {showCardFields ? (
                <div className="space-y-3 rounded-xl border border-border-strong bg-white/50 p-4">
                  <p className="text-xs font-medium text-label/80">
                    Datos de la tarjeta
                  </p>
                  <Input
                    label="Titular de la tarjeta"
                    name="cardHolder"
                    type="text"
                    placeholder="Juan Pérez"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    wrapperClassName="w-full"
                    error={cardHolder.trim().length < 3 ? "El nombre del titular debe tener al menos 3 caracteres" : ""}
                  />
                  <Input
                    label="Número de tarjeta"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumberDisplay(e.target.value)) //Formato visual 1234 5678 9012 3456
                    }
                    wrapperClassName="w-full"
                    //error message validation
                    error={cardNumber.trim().length < 13 || cardNumber.trim().length > 19 ? "El número de tarjeta debe tener entre 13 y 19 dígitos" : ""}
                  />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Input
                      label="Vencimiento (MM/AA)"
                      name="cardExpiry"
                      placeholder="MM/AA"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      value={cardExpiry}
                      onChange={(e) =>
                        setCardExpiry(formatExpiryInput(e.target.value))
                      }
                      maxLength={5}
                      wrapperClassName="w-full"
                      error={cardExpiry.trim().length < 5 ? "La fecha de vencimiento debe tener 4 dígitos" : ""}
                    />
                    <Input
                      label="CVV"
                      name="cardCvv"
                      type="password"
                      placeholder="•••"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      value={cardCvv}
                      onChange={(e) =>
                        setCardCvv(digitsOnly(e.target.value).slice(0, 4))
                      }
                      maxLength={4}
                      wrapperClassName="w-full"
                      error={cardCvv.trim().length < 3 || cardCvv.trim().length > 4 ? "El CVV debe tener entre 3 y 4 dígitos" : ""}
                    />
                  </div>

                </div>
              ) : null}

              <div className="space-y-2 rounded-xl border border-black/10 bg-white/40 p-4 text-sm">
                <div className="flex justify-between text-label">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    ${subtotal.toLocaleString("es-CO")}
                  </span>
                </div>
                <div className="flex justify-between text-label/85">
                  <span>IVA (19 %)</span>
                  <span>${taxAmount.toLocaleString("es-CO")}</span>
                </div>
                <div className="border-t border-border-strong pt-2 text-base font-bold text-label">
                  <div className="flex justify-between">
                    <span>Total a pagar</span>
                    <span>${totalAPagar.toLocaleString("es-CO")}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-label/70">
                Los importes son referenciales en esta vista. La factura electrónica y
                el cobro definitivo se registrarán al integrar el servicio de ventas.
              </p>

              <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button variant="secondary" size="sm" type="button" onClick={goToCart}>
                  Volver al carrito
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  type="button"
                  disabled={!canConfirmPayment}
                  onClick={handleOpenConfirmModal}
                >
                  Confirmar pago
                </Button>
              </div>
            </section>
          </div>
        )}
      </div>

      {/*
        Modal: resume datos de tarjeta (sin CVV) si aplica, método y total.
        Pagar → ConfirmPayment; Cancelar → cierra.
      */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        title="Confirmar pago"
        contentClassName="w-[min(100vw-2rem,26rem)] max-w-lg px-6 py-6 text-left sm:px-8 sm:py-8" //Estas propiedades son para el modal de confirmación de pago se manejan entre corchetes para que se pueda ajustar el ancho y el alto del modal
      >
        <p className="mb-4 text-sm text-label/80"> 
          Revisa la información antes de procesar el pago.
        </p>

        {showCardFields ? ( // Si el método de pago es débito o crédito, muestra los datos de la tarjeta
          <ul className="mb-4 space-y-2 rounded-lg border border-border-strong bg-white/60 p-3 text-sm text-label">
            <li>
              <span className="font-medium text-label/70">Titular: </span>
              {cardHolder.trim() || "—"}
            </li>
            <li>
              <span className="font-medium text-label/70">Tarjeta: </span>
              {maskCardNumber(cardNumber)}
            </li>
            <li>
              <span className="font-medium text-label/70">Vencimiento: </span>
              {cardExpiry.trim() || "—"}
            </li>
          </ul>
        ) : null}

        <ul className="mb-6 space-y-2 text-sm text-label">
          <li className="flex justify-between gap-2">
            <span className="text-label/75">Método</span>
            <span className="font-medium">{paymentMethodLabel}</span>
          </li>
          <li className="flex justify-between gap-2 border-t border-border-strong/50 pt-2">
            <span className="font-semibold">Total a pagar</span>
            <span className="font-bold">
              ${totalAPagar.toLocaleString("es-CO")}
            </span>
          </li>
        </ul>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={handleCloseConfirmModal}
          >
            Cancelar
          </Button>
          <Button variant="primary" size="sm" type="button" onClick={handleModalPay}>
            Pagar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
