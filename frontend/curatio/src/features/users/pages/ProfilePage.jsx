// import Input from "@/shared/components/Input";
// import Buttom from "@/shared/components/Button";
// import Card from "@/shared/components/CardProfile";
// import pf2 from "@/assets/images/pf2.png";
// import bgAll from "@/assets/images/bgAll.jpg";
// import { Link, useParams } from "react-router-dom";


// export default function ProfilePage() {
//   const { id } = useParams();
//   return (
//     <div
//       className="min-h-screen flex items-center justify-center text-label px-6 bg-cover bg-center"
//       style={{ backgroundImage: `url(${bgAll})` }}
//     >
//       <div className="w-full max-w-5xl grid grid-cols-2 gap-16 items-center">
//         {/* Columna izquierda: avatar en Card */}
//         <div className="flex flex-col items-center">
//           <div className="text-center [&_h2]:text-primarybtntext">
//             <Card
//               product={{
//                 title: "Perfil de usuario",
//                 image: pf2,
//                 price: 0,
//                 description: "",
//               }}
//               hidePrice
//             />
//           </div>
//         </div>

//         {/* Columna derecha: contenido */}
//         <div className="flex-1 flex flex-col gap-6 items-center">
//           <h1 className="text-center text-subtittles font-heading font-bold w-full">
//             NOMBRE DEL USUARIO
//           </h1>

//           {/* Formulario con labels */}
//           <div className="w-full flex flex-col items-center">
//             <div className="grid grid-cols-2 gap-x-4 w-full">
//               <Input
//                 label="Nombres y apellidos:"
//                 wrapperClassName="w-full"
//                 className="bg-surface/60"
//                 value="Juan Rivera"
//                 readOnly
//               />
//               <Input
//                 label="Tipo de Documento:"
//                 wrapperClassName="w-full"
//                 className="bg-surface/60"
//                 value="CC"
//                 readOnly
//               />
//               <Input
//                 label="Número de documento:"
//                 wrapperClassName="w-full"
//                 className="bg-surface/60"
//                 value="1000000"
//                 readOnly
//               />
//               <Input
//                 label="Rol:"
//                 wrapperClassName="w-full"
//                 className="bg-surface/60"
//                 value="Cliente"
//                 readOnly
//               />
//               <Input
//                 label="Fecha inicio:"
//                 wrapperClassName="w-full"
//                 className="bg-surface/60"
//                 value="N/A"
//                 readOnly
//               />
//               <Input
//                 label="Fecha fin:"
//                 wrapperClassName="w-full"
//                 className="bg-surface/60"
//                 value="N/A"
//                 readOnly
//               />
//               <Input
//                 label="Dirección:"
//                 wrapperClassName="w-full"
//                 className="bg-surface/60"
//                 value="Mz 7 Cs 15 Dosquebradas"
//                 readOnly
//               />
//               <Input
//                 label="Teléfonos:"
//                 wrapperClassName="w-full"
//                 className="bg-surface/60"
//                 value="3000000000"
//                 readOnly
//               />
//               <Input
//                 label="Correo:"
//                 wrapperClassName="w-full"
//                 className="bg-surface/60"
//                 value="aaaaa@mail.com"
//                 readOnly
//               />
//             </div>

//             {/* Botones */}
//             <div className="mt-8 flex gap-4 w-full max-w-md justify-between">
//               <Link
//                 to="/accounts/list">
//                 <Buttom variant="secondary" size="sm" type="button">
//                 Cancelar
//               </Buttom>
//               </Link>
//               <Link to={id ? `/accounts/editar-datos-basicos/${id}` : "/accounts/list"}>
//                 <Buttom variant="primary" size="sm" type="button">
//                 Editar
//               </Buttom>
//               </Link>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Input from "@/shared/components/Input";
import Buttom from "@/shared/components/Button";
import Card from "@/shared/components/CardProfile";
import pf2 from "@/assets/images/pf2.png";
import bgAll from "@/assets/images/bgAll.jpg";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useEffect, useState } from "react";
import { getUserById } from "@/lib/http/users";
import { adaptBackendUserToUi } from "@/lib/adapters/userAdapter";

export default function ProfilePage() {
  const { id } = useParams();
  const { user: authenticatedUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);

        if (id) {
          const response = await getUserById(id);
          setProfile(adaptBackendUserToUi(response?.data?.user));
        } else if (authenticatedUser?.id) {
          const response = await getUserById(authenticatedUser.id);
          setProfile(adaptBackendUserToUi(response?.data?.user));
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id, authenticatedUser?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-label">
        Cargando perfil...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-label">
        No se pudo cargar el perfil.
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center text-label px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgAll})` }}
    >
      <div className="w-full max-w-5xl grid grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-center">
          <div className="text-center [&_h2]:text-primarybtntext">
            <Card
              product={{
                title: "Perfil de usuario",
                image: profile.photoUrl || pf2,
                price: 0,
                description: "",
              }}
              hidePrice
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6 items-center">
          <h1 className="text-center text-subtittles font-heading font-bold w-full">
            {profile.name}
          </h1>

          <div className="w-full flex flex-col items-center">
            <div className="grid grid-cols-2 gap-x-4 w-full">
              <Input
                label="Nombres y apellidos:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value={profile.name || ""}
                readOnly
              />
              <Input
                label="Tipo de Documento:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value={profile.documentType || ""}
                readOnly
              />
              <Input
                label="Número de documento:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value={profile.documentNumber || ""}
                readOnly
              />
              <Input
                label="Rol:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value={profile.role || ""}
                readOnly
              />
              <Input
                label="Fecha inicio:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value={profile.startDate || "N/A"}
                readOnly
              />
              <Input
                label="Fecha fin:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value={profile.endDate || "N/A"}
                readOnly
              />
              <Input
                label="Dirección:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value={profile.address || ""}
                readOnly
              />
              <Input
                label="Teléfonos:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value={profile.phone || ""}
                readOnly
              />
              <Input
                label="Correo:"
                wrapperClassName="w-full"
                className="bg-surface/60"
                value={profile.email || ""}
                readOnly
              />
            </div>

            <div className="mt-8 flex gap-4 w-full max-w-md justify-between">
              <Link to="/accounts/list">
                <Buttom variant="secondary" size="sm" type="button">
                  Cancelar
                </Buttom>
              </Link>

              <Link to={id ? `/accounts/editar-datos-basicos/${id}` : "/accounts/list"}>
                <Buttom variant="primary" size="sm" type="button">
                  Editar
                </Buttom>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}