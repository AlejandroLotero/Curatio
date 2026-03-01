import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import Select from "@/shared/components/Select";
//import selectService from "@/features/users/services/selectService"
import { useEffect, useState } from "react";
import { getSaleTypes, getStatusCarTypes, getPaymentsTypes } from "../services/selectService";





export default function CartForm() {
  
 
  const [saleTypes, setSaleTypes] = useState([]);

  useEffect(() => {
    getSaleTypes().then(setSaleTypes);
  }, [])

  const [statusCarTypes, setStatusCarTypes] = useState([]);

  useEffect(() => {
    getStatusCarTypes().then(setStatusCarTypes);
  }, [])


  const [paymentsTypes, setPaymentsTypes] = useState([]);

  useEffect(() => {
    getPaymentsTypes().then(setPaymentsTypes);
  }, [])


  

  const handleEmailBlur = (e) => {
    console.log(`email del usuario: ${e.target.value} `);
  };

  

  //Validacion Basica
  const handleNameChange = (e) => {

    console.log("Nombre del usuario: ", e.target.value)

    if(e.target.value === "") {
      console.log(`Este  campo no puede estar vacio`)

    }

  };


    const handleButtonSubmit = (e) => {

    console.log("Email del usuario: ", e.target.value)

    if(e.target.value === "") {
      console.log(`Este  campo no puede estar vacio`)

    }

  };
  
  
  
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-8 p-4">
      {/*Formulario para crear el usuario */}

      <form
        className="px-6 py-12 
        grid grid-cols-1
        bg-white/70
        dark:bg-neutral-500/20 backdrop-md
        backdrop-blur-sm
        shadow-xl
        ring-1
        rounded-xl
         
         "
      >
        <h3 className="text-2xl font-bold text-left text-label">
          Detalles del Carrito
        </h3>
        <div className="grid grid-cols-2">
          <Input label="ID Carrito" placeholder="Ej: CRP-001" />
          <Input label="Nro Factura" placeholder="FAC-001" />

          <Select
            label="Vendedor"
            options={saleTypes}
            name="saleType"
            // placeholder="juan@ejemplo.com"
            // type="email"
            // onBlur={handleEmailBlur}
          ></Select>

          <Input
            label="Correo electronico"
            placeholder="juan@ejemplo.com"
            type="email"
            onBlur={handleEmailBlur}
          />
        </div>

        <h3 className="text-2xl font-bold text-left text-label">
          Medicamentos
        </h3>

        <div className="flex gap-4 ">
          <Input label="Nombre Medicamento" placeholder="Ej: Paracetamol" />
          <Input label="Cantidad" placeholder="Ej: 01" />
          <Input label="Precio" placeholder="Precio" />
        </div>

        <div className="flex justify-left my-4">
          <Button
            variant="primary"
            size="md"
            onClick={() => console.log("Esto es Guadar")}
          >
            Guardar{" "}
          </Button>

          {/* <Button
            variant="primary"
            size="md"
            type="submit"
            onClick={() => console.log("Esto es Submit")}
            onChange={handleButtonSubmit}
          >
            Tipo onSubmit
          </Button> */}
        </div>

        <p className="font-bold">Subtotal: $0.00</p>
        <p className="font-bold">Impuestos: $0.00</p>
        <p className="font-bold">Total: $0.00</p>

        <div className="flex gap-4 my-4">
          <Select
            label="Estado del Carrito"
            options={statusCarTypes}
            name="statusCarTypes"
            // placeholder="juan@ejemplo.com"
            // type="email"
            // onBlur={handleEmailBlur}
          ></Select>

          <Select
            label="Tipo de Pago"
            options={paymentsTypes}
            name="paymentsTypes"
            // placeholder="juan@ejemplo.com"
            // type="email"
            // onBlur={handleEmailBlur}
          ></Select>
        </div>

        <div className="flex items-center  justify-center gap-12">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => console.log("Esto es cancelar")}
          >
            Volver
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => console.log("Esto es Guadar")}
          >
            Confirmar Pago{" "}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => console.log("Esto es cancelar")}
          >
            Crear Carrito
          </Button>

          {/* <Button
            variant="primary"
            size="md"
            type="submit"
            onClick={() => console.log("Esto es Submit")}
            onChange={handleButtonSubmit}
          >
            Tipo onSubmit
          </Button> */}
        </div>
      </form>
    </div>
  );
}
