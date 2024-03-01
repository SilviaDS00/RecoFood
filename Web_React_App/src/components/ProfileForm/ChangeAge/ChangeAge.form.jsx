import * as Yup from "yup";

export function initialValues() {
  return {
    age: "",
  };
}

export function validationSchema() {
  return Yup.object({
    age: Yup.string().required("Debes introducir tu edad"),
  });
}
