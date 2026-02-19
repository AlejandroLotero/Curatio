import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

export default function UserForm() {
  
  // const handleNameChange = (e) => {

  //   console.log("Nombre del usuario: ", e.target.value)

  // };

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
    <div>
      {/*Formulario para crear el usuario */}

      <form>
        <Input label="Nombre" placeholder="Ingrese su nombre " />
        <Input
          label="Correo electronico"
          placeholder="juan@ejemplo.com"
          type="email"
          onBlur={handleEmailBlur}

          
          
        />

        {/*Actions */}

        <Input
          label="Contraseña"
          type="password"
          placeholder="Ingrese su contraseña"
          onChange={handleNameChange}
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
          size="md"
          onClick={() => console.log("Esto es Guadar")}
          
          >
            Guardar{" "}
          </Button>

           <Button 
          variant="primary" 
          size="md"
          type = "submit"
          onClick={() => console.log("Esto es Submit")}
          onChange= {handleButtonSubmit}
          
          >
            Tipo onSubmit
          </Button>
        </div>
      </form>
    </div>
  );
}