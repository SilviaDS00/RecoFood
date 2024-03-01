import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import {useAuth} from "../../../hooks/useAuth";
import {User} from "../../../api/user";
import { initialValues, validationSchema } from "./ChangeWeightHeight.form";
import "../ProfileForm.scss";

const userCtrl = new User();
export function ChangeWeightHeightForm() {
    const { user } = useAuth();
    const [isWeightHeightChanged, setIsWeightHeightChanged] = useState(false);
  
    const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: validationSchema(),
      validateOnChange: false,
      onSubmit: async (formValue) => {
        try {
          await userCtrl.updateMe(user.id, { weight: formValue.weight, height: formValue.height});
          setIsWeightHeightChanged(true);
          setTimeout(() => {
            setIsWeightHeightChanged(false);
          }, 3000);
        } catch (error) {
          throw error;
        }
      },
    });
  
    return (
      <Form onSubmit={formik.handleSubmit}>
        <label>Cambiar Peso y Altura</label>
        <div className="content">
          <Form.Input
            type="text"
            name="weight"
            placeholder="Nuevo peso"
            value={formik.values.weight}
            onChange={formik.handleChange}
            error={formik.errors.weight}
          />
          <Form.Input
            type="text"
            name="height"
            placeholder="Nueva altura"
            value={formik.values.height}
            onChange={formik.handleChange}
            error={formik.errors.height}
          />
          <Form.Button type="submit" loading={formik.isSubmitting}>
            Cambiar
          </Form.Button>
        </div>
  
        {isWeightHeightChanged && (
          <div className="confirmationMessage">
            Se ha cambiado el peso y la altura correctamente.
          </div>
        )}
      </Form>
    );
  }