import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    repeatEmail: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().required("Debes introducir un email"),
    repeatEmail: Yup.string()
      .required("Debes confirmar el email")
      .oneOf([Yup.ref("email")], true),
  });
}
