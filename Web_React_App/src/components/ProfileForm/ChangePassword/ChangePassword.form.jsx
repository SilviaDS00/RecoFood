import * as Yup from "yup";

export function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    password: Yup.string().required("Debes introducir una contraseña"),
    repeatPassword: Yup.string()
      .required("Debes confirmar la contraseña")
      .oneOf([Yup.ref("password")], true),
  });
}
