import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import {useAuth} from "../../../hooks/useAuth";
import {User} from "../../../api/user";
import { initialValues, validationSchema } from "./ChangeAge.form";
import "../ProfileForm.scss";

const userCtrl = new User();
export function ChangeAge() {
    const { user, logout } = useAuth();
    const [isAgeChanged, setIsAgeChanged] = useState(false);
  
    const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: validationSchema(),
      validateOnChange: false,
      onSubmit: async (formValue) => {
        try {
          await userCtrl.updateMe(user.id, { age: formValue.age });
          setIsAgeChanged(true);
          setTimeout(() => {
            setIsAgeChanged(false);
          }, 3000);
        } catch (error) {
          throw error;
        }
      },
    });
  
    return (
      <Form onSubmit={formik.handleSubmit}>
        <label>Cambiar edad</label>
        <div className="content">
          <Form.Input
            type="text"
            name="age"
            placeholder="Edad"
            value={formik.values.age}
            onChange={formik.handleChange}
            error={formik.errors.age}
          />
          <Form.Button type="submit" loading={formik.isSubmitting}>
            Cambiar
          </Form.Button>
        </div>
  
        {isAgeChanged && (
          <div className="confirmationMessageEmail">
            Se ha cambiado la edad correctamente.
          </div>
        )}
      </Form>
    );
  }