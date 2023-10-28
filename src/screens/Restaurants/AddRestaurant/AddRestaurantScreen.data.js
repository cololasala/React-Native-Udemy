import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    location: null,
    images: [],
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    address: Yup.string().required("La dirección es obligatoria"),
    phone: Yup.string().required("El teléfono es obligatorio"),
    email: Yup.string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    description: Yup.string().required("La descripción es obligatoria"),
    location: Yup.string().required("La localización es obligatoria"),
    images: Yup.array()
      .min(1, "Se requiere una imagen como mínimo")
      .required("La imagen es requerida"),
  });
}
