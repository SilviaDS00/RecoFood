import * as Yup from "yup";

export function initialValues() {
  return {
    weight: "",
    height: "",
  };
}

export function validationSchema() {
  return Yup.object({
    weight: Yup.string().required("Debes introducir tu peso"),
    height: Yup.string().required("Debes introducir tu altura"),
  });
}
