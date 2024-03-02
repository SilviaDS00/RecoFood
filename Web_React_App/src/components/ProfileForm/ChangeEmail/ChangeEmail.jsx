import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import {useAuth} from "../../../hooks/useAuth";
import {User} from "../../../api/user";
import { initialValues, validationSchema } from "./ChangeEmail.form";
import "../ProfileForm.scss";

const userCtrl = new User();
export function ChangeEmailForm() {
    const { user, logout } = useAuth();
    const [isEmailChanged, setIsEmailChanged] = useState(false);
  
    const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: validationSchema(),
      validateOnChange: false,
      onSubmit: async (formValue) => {
        try {
          await userCtrl.updateMe(user.id, { email: formValue.email });
          setIsEmailChanged(true);
          setTimeout(() => {
            setIsEmailChanged(false);
          }, 3000);
        } catch (error) {
          throw error;
        }
      },
    });
  
    return (
      <Form onSubmit={formik.handleSubmit}>
        <label>Cambiar email</label>
        <div className="content">
          <Form.Input
            type="email"
            name="email"
            placeholder="Nuevo email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
          <Form.Input
            type="email"
            name="repeatEmail"
            placeholder="Repetir email"
            value={formik.values.repeatEmail}
            onChange={formik.handleChange}
            error={formik.errors.repeatEmail}
          />
          <Form.Button type="submit" loading={formik.isSubmitting}>
            Cambiar
          </Form.Button>
        </div>
  
        {isEmailChanged && (
          <div className="confirmationMessageEmail">
            Se ha cambiado la contraseña correctamente.
          </div>
        )}
      </Form>
    );
  }