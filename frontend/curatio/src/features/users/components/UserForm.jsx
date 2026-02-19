import Input from "@/shared/components/Input";

export default function UserForm() {
  return (
    <div>
      {/*Formulario para crear el usuario */}

      <form>
        {/* <Input label="Nombre y Apellidos" 
                placeholder="Juan Rivera"
                
        
        >
          
        </Input> */}

         <Input label="Correo electrónico" 
         type="email" placeholder="Ingrese su correo" 
         />

        <Input label="Contraseña" type="password" 
        placeholder="Ingrese su contraseña"
        />


         <div className="flex items-center  justify-center gap-12">
          <Button 
          variant="secondary" 
          size="sm"
          onClick={() => console.log("Esto es cancelar")}
          >

            Cancelar
          </Button>

          <Button 
          variant="primary" 
          size="dm"
          onClick={() => console.log("Esto es Guadar")}
          
          >
            Guardar{" "}
          </Button>
        </div>
      
      </form>
    </div>
  );
}
