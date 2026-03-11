import Input from "@/shared/components/Input";
import Buttom from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import { useEffect, useState } from "react";
import { getStateSaleTypes, getPaymentsTypes } from "../services/selectServices";

export default function ElectronicInvoiceSalesPage() {
  const [stateSaleTypes, setStateSaleTypes] = useState([]);
  const [paymentsTypes, setPaymentsTypes] = useState([]);

  useEffect(() => {
    getStateSaleTypes().then(setStateSaleTypes);
  }, []);

  useEffect(() => {
    getPaymentsTypes().then(setPaymentsTypes);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen text-label px-4 py-6 sm:px-6 sm:py-8 w-full min-w-0 overflow-x-hidden">
      <form
        className="
          w-full max-w-full sm:max-w-xl md:max-w-2xl
          min-w-0
          px-4 py-8 sm:px-6 sm:py-12
          grid grid-cols-1 gap-4
          bg-white/70 dark:bg-neutral-900/20
          backdrop-blur-md
          shadow-xl
          ring-1
          rounded-2xl sm:rounded-3xl
        "
      >
        <h2
          className="
            text-center
            text-base sm:text-lg md:text-subtittles
            font-bold
            text-label
            col-span-full
            mb-2 sm:mb-4
            wrap-break-word
          "
        >
          RECIBO DE VENTA
        </h2>

        {/* Campos en columna única */}
        <div className="flex flex-col gap-4 w-full max-w-full sm:max-w-[320px] mx-auto min-w-0">
          <Input
            label="Número de factura"
            placeholder="FEV00001"
            name="invoiceNumber"
          />
          <Input
            label="Fecha y hora de la venta"
            placeholder="2025-11-30 19:40:55"
            name="saleDateTime"
          />
          <Input label="Cliente" placeholder="Juan Pérez" name="customer" />
          <Input label="Farmaceuta" placeholder="Ana Vázquez" name="pharmacist" />
        </div>

        {/* Campos financieros en grid 2 columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-full sm:max-w-130 mx-auto min-w-0 items-start">
          <Input
            label="Subtotal"
            placeholder="100000,00"
            name="subtotal"
            type="number"
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="IVA"
            placeholder="19"
            name="iva"
            type="number"
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="Descuento"
            placeholder="25"
            name="discount"
            type="number"
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="Total"
            placeholder="750000,00"
            name="total"
            type="number"
            wrapperClassName="w-full min-w-0"
          />
        </div>

        {/* Selects en grid 2 columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-full sm:max-w-130 mx-auto min-w-0 items-start">
          <Select
            label="Tipo de pago"
            name="paymentType"
            options={paymentsTypes}
            placeholder="Tipo de pago"
            wrapperClassName="w-full min-w-0"
          />
          <Select
            label="Estado de venta"
            name="saleStatus"
            options={stateSaleTypes}
            placeholder="Estado de venta"
            wrapperClassName="w-full min-w-0"
          />
        </div>

        {/* Botones */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-0 w-full max-w-full sm:max-w-130 mx-auto mt-6 min-w-0">
          <Buttom variant="secondary" size="sm" type="button">
            Cancelar
          </Buttom>
          <Buttom variant="primary" size="sm" type="button">
            Ver carrito
          </Buttom>
        </div>
      </form>
    </div>
  );
}