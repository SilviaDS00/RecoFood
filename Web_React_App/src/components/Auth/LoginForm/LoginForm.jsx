// LoginForm.jsx
import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './LoginForm.form';
import { useAuth } from '../../../hooks/useAuth';
import { Auth } from '../../../api/auth';
import './LoginForm.scss'; // Importa los estilos

const authCtrl = new Auth();

const LoginForm = () => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const response = await authCtrl.login(formValues);
        login(response.jwt);
      } catch (error) {
        formik.setStatus('Correo o contraseña incorrectos');
        console.error(error);
      }
    },
  });

  return (
    <div className="form-container">
      <h3>Iniciar sesión</h3>
      <Form onSubmit={formik.handleSubmit}>
        {formik.status && <Message negative content={formik.status} />}

        <Form.Input
          className="input-field"
          fluid
          name="identifier"
          type="text"
          placeholder="Correo electrónico o nombre de usuario"
          value={formik.values.identifier}
          onChange={formik.handleChange}
          error={formik.errors.identifier ? true : false}
        />

        <Form.Input
          className="input-field"
          fluid
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password ? true : false}
        />

        <Form.Button
          className="submit-button"
          type="submit"
          fluid
          loading={formik.isSubmitting}
        >
          Entrar
        </Form.Button>
      </Form>
    </div>
  );
};

export default LoginForm;
