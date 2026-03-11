import Input from "@/shared/components/Input";
import Buttom from "@/shared/components/Button";
import Card from "@/shared/components/CardProfile";
import pf2 from "@/assets/images/pf2.png";
import bgAll from "@/assets/images/bgAll.jpg";

export default function ProfilePage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center text-label px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgAll})` }}
    >
      <div className="w-full max-w-5xl flex gap-16 items-center">
        {/* Columna izquierda: avatar en Card */}
        <div className="flex flex-col items-center">
          <div className="text-center [&_h2]:text-primarybtntext">
            <Card
              product={{
                title: "Perfil de usuario",
                image: pf2,
                price: 0,
                description: "",
              }}
              hidePrice
            />
          </div>
        </div>

        {/* Columna derecha: contenido */}
        <div className="flex-1 flex flex-col gap-6 items-center">
          <h1 className="text-center text-subtittles font-heading font-bold w-full">
            NOMBRE DEL USUARIO
          </h1>

          {/* Formulario con labels */}
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-col gap-3 w-full max-w-md">
              <Input
                label="Nombres y apellidos:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value="Juan Rivera"
                readOnly
              />
              <Input
                label="Tipo de Documento:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value="CC"
                readOnly
              />
              <Input
                label="Número de documento:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value="1000000"
                readOnly
              />
              <Input
                label="Rol:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value="Cliente"
                readOnly
              />
              <Input
                label="Fecha inicio:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value="N/A"
                readOnly
              />
              <Input
                label="Fecha fin:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value="N/A"
                readOnly
              />
              <Input
                label="Dirección:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value="Mz 7 Cs 15 Dosquebradas"
                readOnly
              />
              <Input
                label="Teléfonos:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value="3000000000"
                readOnly
              />
              <Input
                label="Correo:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value="aaaaa@mail.com"
                readOnly
              />
            </div>

            {/* Botones */}
            <div className="mt-8 flex gap-4 w-full max-w-md justify-between">
              <Buttom variant="secondary" size="sm" type="button">
                Cancelar
              </Buttom>
              <Buttom variant="primary" size="sm" type="button">
                Editar
              </Buttom>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}