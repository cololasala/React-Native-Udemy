import * as Yup from "yup";

export function initialValues() {
  return {
    password: "",
    newPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    password: Yup.string().min(6, "Mínimo debe ser 6 caracteres").required("La contraseña es oblitoria"),
    newPassword: Yup.string()
      .min(6, "Mínimo debe ser 6 caracteres")
      .required("La nueva contraseña es oblitoria"),
    confirmNewPassword: Yup.string()
      .min(6, "Mínimo debe ser 6 caracteres")
      .required("La confirmacion es oblitoria")
      .oneOf([Yup.ref("newPassword")], "Las contraseñas deben ser iguales"), //validacion de contraseñas iguales
  });
}
