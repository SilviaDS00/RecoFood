import * as Yup from "yup";

export function initialValues() {
  return {
    username: "",
    repeatUsername: "",
  };
}

export function validationSchema() {
  return Yup.object({
    username: Yup.string().required("Debes introducir una usuario"),
    repeatUsername: Yup.string()
      .required("Debes confirmar el usuario")
      .oneOf([Yup.ref("username")], true),
  });
}
