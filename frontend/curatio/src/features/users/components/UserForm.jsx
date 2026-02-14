import Input from "../../../shared/components/Input";

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
      
      </form>
    </div>
  );
}
