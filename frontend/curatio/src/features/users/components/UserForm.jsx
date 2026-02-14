import Input from "../../../shared/components/Input";

export default function UserForm() {
  return (
    <div>
      {/*Formulario para crear el usuario REALIZADO POR JHONIER G */}

      <form>
        {/*DATOS BASICOS */}
        <Input
          label="Nombre y Apellidos"
          placeholder="Juan Rivera Grisales"
          name="fullNames">
        </Input>

        <Input
          label="Numero de documento"
          placeholder="123456789"
          type="number"
          name="documentNumber">
        </Input>

        {/*DATOS DE CONTACTO*/}
        <Input
          label="Direccion"
          placeholder="Calle 123 #45-67"
          name="address">
        </Input>

        <Input
          label="Numero de telefono"
          placeholder="123456789"
          type="number"
          name="phoneNumber">
        </Input>

        <Input
          label="Correo electronico"
          placeholder="juan@ejemplo.com"
          type="email"
          name="email">
        </Input>

        <Input
          label="Confirmar correo electronico"
          placeholder="juan@ejemplo.com"
          type="email"
          name="confirmEmail">
        </Input>

        {/*DATOS DE ROL*/}
        <Input
          label="fecha de inicio"
          placeholder="2023-01-01"
          type="date"
          name="startDate">
        </Input>

        <Input
          label="fecha de fin"
          placeholder="2023-12-31"
          type="date"
          name="endDate">
        </Input>



      </form>
    </div>
  );
}
