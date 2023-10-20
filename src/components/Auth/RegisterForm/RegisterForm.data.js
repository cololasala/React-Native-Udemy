import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
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
    repeatPassword: Yup.string()
      .required("La contraseña es obligatoria")
      .min(6, "Mínimo debe ser 6 caracteres")
      .oneOf([Yup.ref("password")], "Las contraseñas deben ser iguales"), //validacion de contraseñas iguales
  });
}
