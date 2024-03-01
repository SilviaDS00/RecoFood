import * as Yup from "yup";

export function initialValues() {
  return {
    firstname: "",
    lastname: "",
  };
}

export function validationSchema() {
  return Yup.object({
    firstname: Yup.string().required("Debes introducir tu nombre"),
    lastname: Yup.string().required("Debes introducir tus apellidos"),
  });
}
