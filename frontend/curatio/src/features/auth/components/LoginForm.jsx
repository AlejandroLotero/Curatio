// import { useMemo, useState } from "react";
// import {Input,Button} from "@/shared/components"
// import {useNavigate } from "react-router-dom";
// import logo from "@/assets/images/Curatio.png";

// export default function LoginForm({
//   onSubmit,
//   loading = false,
//   error = "",
//   onForgotPassword,
// }) {

//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     remember: true,
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const [touched, setTouched] = useState({
//     email: false,
//     password: false,
//   });

//     const errors = useMemo(() => {
//     const next = {};
//     const email = form.email.trim();
//     const password = form.password;

//     if (!email) next.email = "El correo es obligatorio.";
//     else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Ingresa un correo válido.";

//     if (!password) next.password = "La contraseña es obligatoria.";
//     else if (password.length < 8) next.password = "Mínimo 8 caracteres.";
//     else if (password.length > 10) next.password = "Máximo 10 caracteres.";

//     return next;
//   }, [form.email, form.password]);

//   const canSubmit = Object.keys(errors).length === 0 && !loading;

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouched((prev) => ({ ...prev, [name]: true }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setTouched({ email: true, password: true });

//     if (Object.keys(errors).length > 0) return;

//     onSubmit?.({
//       email: form.email.trim(),
//       password: form.password,
//       remember: form.remember,
//     });
//   };

//   const inputClass =
//     "!text-label placeholder:text-text-muted w-full h-10 !border-0 !border-b-2 border-black/60 px-4 !rounded-none  " +
//     "focus:outline-none focus:!border-black transition-colors duration-200 !ring-0 ";

//   return (
//     <div className="flex flex-col items-center">
//       {/* Encabezado */}
//       <header className="mb-2 text-center">
//         {/* <h1 className="font-body font-heading text-tittles text-label">
//           CURATIO
//         </h1> */}
//         <div className="flex items-center ">
//           <img
//             src={logo}
//             alt="Curatio Logo"
//             className="h-18 drop-shadow-[0_6px_18px_rgba(0,0,0,0.18)]  "
//           />
//         </div>
//         <p className="mt-1 font-body text-small text-label font-black">
//           Iniciar sesión
//         </p>
//       </header>

//       {/* Error general del login (viene del padre) */}
//       {error ? (
//         <div className="mb-4 w-full max-w-[320px] rounded-xl border border-error/40 bg-error/10 px-4 py-3">
//           <p className="font-body text-small text-error">{error}</p>
//         </div>
//       ) : null}

//       <form
//         onSubmit={handleSubmit}
//         className="flex w-full max-w-[320px] flex-col gap-4"
//       >
//         <div>
//           <Input
//             label="Correo electrónico"
//             placeholder="juan@ejemplo.com"
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             // error={touched.email ? errors.email : ""}
//             className={`${inputClass}`}
//           />
//           {touched.email && errors.email && (
//             <p className="mt-1 font-body text-red-600 text-mostsmall text-error">
//               {errors.email}
//             </p>
//           )}
//         </div>

//         <div>
//           <Input
//             label="Contraseña"
//             placeholder="Ingresa tu contraseña"
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             // error={touched.password ? errors.password : ""}
//             showPassword={showPassword}
//             onTogglePassword={() => setShowPassword((s) => !s)}
//             className={`${inputClass}`}
//           />

//           {touched.password && errors.password && (
//             <p className="mt-1 font-body text-red-600 text-mostsmall text-error">
//               {errors.password}
//             </p>
//           )}
//         </div>

//         <div>{/* <Card></Card> */}</div>

//         <div className="flex items-center justify-between">
//           <label className="flex cursor-pointer items-center gap-2 font-body text-small text-label select-none">
//             <input
//               type="checkbox"
//               name="remember"
//               checked={form.remember}
//               onChange={handleChange}
//               className="size-4 rounded border-border bg-transparent accent-primary "
//             />
//             Recuérdame
//           </label>

//           <button
//             type="button"
//             onClick={onForgotPassword}
//             className="font-body text-[14px] text-label underline underline-offset-4 transition hover:text-label"
//           >
//             ¿Olvidaste tu contraseña?
//           </button>
//         </div>

//         <div className="flex justify-between pt-2">
//           <Button
//             variant="secondary"
//             size="sm"
//             type="button"
//             onClick={() => navigate("/", { replace: true })}
//           >
//             Cancelar
//           </Button>

//           <Button
//             variant="primary"
//             size="md"
//             type="submit"
//             disabled={!canSubmit}
//           >
//             {loading ? "Ingresando..." : "Ingresar"}
//           </Button>
//         </div>

//         <div className="pt-2">
//           <div className="flex items-center gap-2">
//             <div className="h-px flex-1 bg-border" />
//             <span className="font-body text-mostsmall text-label">o</span>
//             <div className="h-px flex-1 bg-border" />
//           </div>

//           <button
//             type="button"
//             onClick={() => console.log("Ir a registrarse")}
//             className="mt-3 w-full font-body text-small text-label transition hover:text-label"
//           >
//             ¿No tienes cuenta?{" "}
//             <span className="underline underline-offset-4">Crear una</span>
//           </button>
//         </div>
//       </form>

//       <p className="mt-4 text-center font-body text-[14px] text-text-muted">
//         Al continuar aceptas nuestros Términos y Política de Privacidad.
//       </p>
//     </div>
//   );
// }
import { useMemo, useState } from "react";
import { Input, Button } from "@/shared/components";
import Modal from "@/shared/components/Modal";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/Curatio.png";
import { Mail, Phone, UserPlus } from "lucide-react";

export default function LoginForm({
  onSubmit,
  loading = false,
  error = "",
  onForgotPassword,
}) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterInfoModalOpen, setIsRegisterInfoModalOpen] = useState(false);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const errors = useMemo(() => {
    const next = {};
    const email = form.email.trim();
    const password = form.password;

    if (!email) next.email = "El correo es obligatorio.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) {
      next.email = "Ingresa un correo válido.";
    }

    if (!password) next.password = "La contraseña es obligatoria.";
    else if (password.length < 8) next.password = "Mínimo 8 caracteres.";
    else if (password.length > 10) next.password = "Máximo 10 caracteres.";

    return next;
  }, [form.email, form.password]);

  const canSubmit = Object.keys(errors).length === 0 && !loading;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (Object.keys(errors).length > 0) return;

    onSubmit?.({
      email: form.email.trim(),
      password: form.password,
      remember: form.remember,
    });
  };

  const inputClass =
    "!text-label placeholder:text-text-muted w-full h-10 !border-0 !border-b-2 border-black/60 px-4 !rounded-none " +
    "focus:outline-none focus:!border-black transition-colors duration-200 !ring-0 ";

  return (
    <div className="flex flex-col items-center">
      <header className="mb-2 text-center">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Curatio Logo"
            className="h-18 drop-shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
          />
        </div>
        <p className="mt-1 font-body text-small text-label font-black">
          Iniciar sesión
        </p>
      </header>

      {error ? (
        <div className="mb-4 w-full max-w-[320px] rounded-xl border border-error/40 bg-error/10 px-4 py-3">
          <p className="font-body text-small text-error">{error}</p>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[320px] flex-col gap-4"
      >
        <div>
          <Input
            label="Correo electrónico"
            placeholder="juan@ejemplo.com"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass}
          />
          {touched.email && errors.email && (
            <p className="mt-1 font-body text-red-600 text-mostsmall text-error">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <Input
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((s) => !s)}
            className={inputClass}
          />

          {touched.password && errors.password && (
            <p className="mt-1 font-body text-red-600 text-mostsmall text-error">
              {errors.password}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 font-body text-small text-label select-none">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              className="size-4 rounded border-border bg-transparent accent-primary"
            />
            Recuérdame
          </label>

          <button
            type="button"
            onClick={onForgotPassword}
            className="font-body text-[14px] text-label underline underline-offset-4 transition hover:text-label"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <div className="flex justify-between pt-2">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => navigate("/", { replace: true })}
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            size="md"
            type="submit"
            disabled={!canSubmit}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </div>

        <div className="pt-2">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="font-body text-mostsmall text-label">o</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={() => setIsRegisterInfoModalOpen(true)}
            className="mt-3 w-full font-body text-small text-label transition hover:text-label"
          >
            ¿No tienes cuenta?{" "}
            <span className="underline underline-offset-4">Crear una</span>
          </button>
        </div>
      </form>

      <p className="mt-4 text-center font-body text-[14px] text-text-muted">
        Al continuar aceptas nuestros Términos y Política de Privacidad.
      </p>

      <Modal
        isOpen={isRegisterInfoModalOpen}
        onClose={() => setIsRegisterInfoModalOpen(false)}
        title=""
        contentClassName="w-[92%] max-w-[560px] rounded-3xl !p-0 overflow-hidden"
      >
        <div className="bg-white/90 backdrop-blur-md">
          <div className="border-b border-black/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10">
                <UserPlus className="size-5 text-label" />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-bold text-label">
                  Solicitud de creación de cuenta
                </h2>
                <p className="text-sm text-label/70">
                  Información para nuevos usuarios de Curatio
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-5 text-left">
            <p className="text-sm leading-6 text-label">
              Si no tienes cuenta en nuestro sistema <span className="font-semibold">Curatio</span>,
              debes enviar una solicitud con tus datos personales al correo:
            </p>

            <div className="mt-4 rounded-2xl border border-black/10 bg-black/5 p-4">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-5 text-label/80" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-label/60">
                    Correo de administración
                  </p>
                  <a
                    href="mailto:administracioncuratio@curatio.com"
                    className="mt-1 inline-block font-semibold text-label underline underline-offset-4 break-all"
                  >
                    administracioncuratio@curatio.com
                  </a>
                </div>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-label">
              O, si lo prefieres, puedes comunicarte con nuestro call center,
              disponible las 24 horas, al siguiente número:
            </p>

            <div className="mt-4 rounded-2xl border border-black/10 bg-black/5 p-4">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-5 text-label/80" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-label/60">
                    Línea de atención 24 horas
                  </p>
                  <a
                    href="tel:3165838625"
                    className="mt-1 inline-block font-semibold text-label underline underline-offset-4"
                  >
                    3165838625
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() => setIsRegisterInfoModalOpen(false)}
              >
                Cerrar
              </Button>

              <a href="mailto:administracioncuratio@curatio.com">
                <Button variant="primary" size="sm" type="button">
                  Enviar correo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}