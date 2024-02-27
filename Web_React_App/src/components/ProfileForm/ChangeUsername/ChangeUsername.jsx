import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import {useAuth} from "../../../hooks/useAuth";
import {User} from "../../../api/user";
import { initialValues, validationSchema } from "./ChangeUsername.form";
import "../ProfileForm.scss";

const userCtrl = new User();
export function ChangeUsernameForm() {
    const { user, logout } = useAuth();
    const [isUsernameChanged, setIsUsernameChanged] = useState(false);
  
    const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: validationSchema(),
      validateOnChange: false,
      onSubmit: async (formValue) => {
        try {
          await userCtrl.updateMe(user.id, { username: formValue.username });
          setIsUsernameChanged(true);
          setTimeout(() => {
            setIsUsernameChanged(false);
          }, 3000);
        } catch (error) {
          throw error;
        }
      },
    });
  
    return (
      <Form onSubmit={formik.handleSubmit}>
        <label>Cambiar nombre de usuario</label>
        <div className="content">
          <Form.Input
            type="text"
            name="username"
            placeholder="Nuevo usuario"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.errors.username}
          />
          <Form.Input
            type="text"
            name="repeatUsername"
            placeholder="Repetir usuario"
            value={formik.values.repeatUsername}
            onChange={formik.handleChange}
            error={formik.errors.repeatUsername}
          />
          <Form.Button type="submit" loading={formik.isSubmitting}>
            Cambiar
          </Form.Button>
        </div>
  
        {isUsernameChanged && (
          <div className="confirmationMessage">
            Se ha cambiado la contraseña correctamente.
          </div>
        )}
      </Form>
    );
  }