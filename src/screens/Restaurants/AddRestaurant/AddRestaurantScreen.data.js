import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    street: "",
    phone: "",
    email: "",
    description: ""
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    password: Yup.string()
      .min(6, "Mínimo debe ser 6 caracteres")
      .required("La contraseña es obligatoria"),
  });
}
