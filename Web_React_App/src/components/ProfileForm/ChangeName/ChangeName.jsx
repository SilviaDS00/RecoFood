import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import {useAuth} from "../../../hooks/useAuth";
import {User} from "../../../api/user";
import { initialValues, validationSchema } from "./ChangeName.form";
import "../ProfileForm.scss";

const userCtrl = new User();
export function ChangeName() {
    const { user } = useAuth();
    const [isNameChanged, setIsNameChanged] = useState(false);
  
    const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: validationSchema(),
      validateOnChange: false,
      onSubmit: async (formValue) => {
        try {
          await userCtrl.updateMe(user.id, { firstname: formValue.firstname, lastname: formValue.lastname});
          setIsNameChanged(true);
          setTimeout(() => {
            setIsNameChanged(false);
          }, 3000);
        } catch (error) {
          throw error;
        }
      },
    });
  
    return (
      <Form onSubmit={formik.handleSubmit}>
        <label>Cambiar nombre y apellidos</label>
        <div className="content">
          <Form.Input
            type="text"
            name="firstname"
            placeholder="Nombre"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={formik.errors.firstname}
          />
          <Form.Input
            type="text"
            name="lastname"
            placeholder="Apellidos"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.errors.lastname}
          />
          <Form.Button type="submit" loading={formik.isSubmitting}>
            Cambiar
          </Form.Button>
        </div>
  
        {isNameChanged && (
          <div className="confirmationMessage">
            Se ha cambiado el nombre y apellidos correctamente.
          </div>
        )}
      </Form>
    );
  }