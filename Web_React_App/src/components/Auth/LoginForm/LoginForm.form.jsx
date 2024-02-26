import * as Yup from "yup";

export function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    identifier: Yup.string().required("Introduce tu correo electrónico"),
    password: Yup.string().required("Introduce tu contraseña"),
  });
}
