import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import { useMemo, useState } from "react";

export default function UserForm() { 
 

  // const handleEmailBlur = (e) => {
  //   console.log(`email del usuario: ${e.target.value} `);
  // };

  // //Validacion Basica
  // const handleNameChange = (e) => {

  //   console.log("Nombre del usuario: ", e.target.value)

  //   if(e.target.value === "") {
  //     console.log(`Este  campo no puede estar vacio`)

  //   }

  // };


  //   const handleButtonSubmit = (e) => {

  //   console.log("Email del usuario: ", e.target.value)

  //   if(e.target.value === "") {
  //     console.log(`Este  campo no puede estar vacio`)

  //   }

  // };

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const errors = useMemo(() => {
    const next = {};
    const email = form.email.trim();
    const password = form.password;

    if (!email) next.email = "El correo es obligatorio.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Ingresa un correo válido.";

    if (!password) next.password = "La contraseña es obligatoria.";
    else if (password.length < 6) next.password = "Mínimo 6 caracteres.";

    return next;
  }, [form.email, form.password]);

  const canSubmit = Object.keys(errors).length === 0 && !submitting;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Marcar todo como "touched" para mostrar errores si existen
    setTouched({ email: true, password: true });

    if (Object.keys(errors).length > 0) return;

    try {
      setSubmitting(true);

      // Aquí llamas tu API real:
      // await authService.login(form.email, form.password, form.remember)

      console.log("Login payload:", form);

      // Simulación
      await new Promise((r) => setTimeout(r, 700));

      console.log("✅ Login exitoso");
    } catch (err) {
      console.error("❌ Error login:", err);
    } finally {
      setSubmitting(false);
    }
  };
  
  
  
  
  return (

  <div className="min-h-5 w-125 flex items-center justify-center px-4 py-10 relative overflow-hidden rounded-3xl border border-black/50">
      {/* Fondo con “luces” suaves */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-30 bg-white" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-20 bg-white" />

      {/* Card glass */}
      <div className="w-full max-w-100">
        <div className="rounded-3xl border border-black/50 bg-white/10 backdrop-blur-xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="px-7 py-8">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-text-primary">Iniciar sesión</h1>
              <p className="text-sm text-white/70 mt-1">
                Accede con tu correo y contraseña.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Correo electrónico"
                placeholder="juan@ejemplo.com"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                // Si tu Input soporta "error"
                error={touched.email ? errors.email : ""}
                // Si soporta className, ayuda a “pulir”
                className="bg-white/10 text-white placeholder:text-white/40 border-white/15"
              />

              <div className="relative">
                <Input
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password ? errors.password : ""}
                  className="bg-white/10 text-white placeholder:text-white/40 border-white/15 pr-12"
                />

                {/* Botón show/hide */}
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-[38px] text-xs text-white/70 hover:text-white transition"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-white/80 select-none">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-white/30 bg-transparent"
                  />
                  Recuérdame
                </label>

                <button
                  type="button"
                  onClick={() => console.log("Ir a recuperar contraseña")}
                  className="text-sm text-white/80 hover:text-white underline underline-offset-4"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => {
                    setForm({ email: "", password: "", remember: true });
                    setTouched({ email: false, password: false });
                  }}
                >
                  Cancelar
                </Button>

                <Button variant="primary" size="md" type="submit" disabled={!canSubmit}>
                  {submitting ? "Ingresando..." : "Ingresar"}
                </Button>
              </div>

              {/* Divider + register */}
              <div className="pt-4">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/15" />
                  <span className="text-xs text-white/60">o</span>
                  <div className="h-px flex-1 bg-white/15" />
                </div>

                <button
                  type="button"
                  onClick={() => console.log("Ir a registrarse")}
                  className="mt-3 w-full text-sm text-white/80 hover:text-white transition"
                >
                  ¿No tienes cuenta? <span className="underline underline-offset-4">Crear una</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-white/50 mt-5">
          Al continuar aceptas nuestros Términos y Política de Privacidad.
        </p>
      </div>
    </div>

    
    // <div>
    //   {/*Formulario para Iniciar */}

    //   <h1>Iniciar sesión </h1>
    //   <form>

        
    //     {/* <Input label="Nombre" placeholder="Ingrese su nombre " /> */}
    //     <Input
    //       label="Correo electronico"
    //       placeholder="juan@ejemplo.com"
    //       type="email"
    //       onBlur={handleEmailBlur}

          
          
    //     />

    //     {/*Actions */}

    //     <Input
    //       label="Contraseña"
    //       type="password"
    //       placeholder="Ingrese su contraseña"
    //       onChange={handleNameChange}
    //     />

    //     <div className="flex items-center  justify-center gap-12">
    //       <Button 
    //       variant="secondary" 
    //       size="sm"
    //       onClick={() => console.log("Esto es cancelar")}
    //       >

    //         Cancelar
    //       </Button>

    //       <Button 
    //       variant="primary" 
    //       size="md"
    //       onClick={() => console.log("Esto es Guadar")}
          
    //       >
    //         Guardar{" "}
    //       </Button>

    //        {/* <Button 
    //       variant="primary" 
    //       size="md"
    //       type = "submit"
    //       onClick={() => console.log("Esto es Submit")}
    //       onChange= {handleButtonSubmit}
          
    //       >
    //         Tipo onSubmit
    //       </Button> */}
    //     </div>
    //   </form>
    // </div>
  );
}