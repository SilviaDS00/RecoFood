import React from "react";
import { Form, Message, Dimmer, Loader } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.form";
import { Auth } from "../../../api/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import "./RegisterForm.scss";
import { useNavigate } from "react-router-dom";

const authCtrl = new Auth();
const RegisterForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (formValues, { setSubmitting, setStatus }) => {
      try {
        setIsLoading(true);
        await authCtrl.register(formValues);

        toast.success(
          "¡Registro exitoso! Redirigiendo a la página de inicio de sesión."
        );

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setStatus(error.response.data.message);
        } else {
          setStatus("El email o el usuario ya existe.");
          setIsLoading(false);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className="form-container-signup">
      <h3>Registrarse</h3>
      <Form onSubmit={formik.handleSubmit}>
        {isLoading && (
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        )}
        <p>Datos del usuario</p>
        {formik.status && <Message negative content={formik.status} />}
        <Form.Group widths="equal">
          <Form.Input
            fluid
            className="input-field"
            name="email"
            type="text"
            placeholder="Correo electrónico"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
          />
          <Form.Input
            fluid
            className="input-field"
            name="username"
            type="text"
            placeholder="Nombre de usuario"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : null
            }
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            className="input-field"
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null
            }
          />
          <Form.Input
            fluid
            className="input-field"
            name="passwordConfirmation"
            type="password"
            placeholder="Confirmar Contraseña"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            error={
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
                ? formik.errors.passwordConfirmation
                : null
            }
          />
        </Form.Group >
        <p>Datos personales</p>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            className="input-field"
            name="firstname"
            type="text"
            placeholder="Nombre"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={
              formik.touched.firstname && formik.errors.firstname
                ? formik.errors.firstname
                : null
            }
          />
          <Form.Input
            fluid
            className="input-field"
            name="lastname"
            type="text"
            placeholder="Apellidos"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={
              formik.touched.lastname && formik.errors.lastname
                ? formik.errors.lastname
                : null
            }
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            className="input-field"
            name="age"
            type="text"
            placeholder="Edad"
            value={formik.values.age}
            onChange={formik.handleChange}
            error={
              formik.touched.age && formik.errors.age ? formik.errors.age : null
            }
          />
          </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            className="input-field"
            name="weight"
            type="text"
            placeholder="Peso (kg)"
            value={formik.values.weight}
            onChange={formik.handleChange}
            error={
              formik.touched.weight && formik.errors.weight
                ? formik.errors.weight
                : null
            }
          />
          <Form.Input
            fluid
            className="input-field"
            name="height"
            type="text"
            placeholder="Altura (cm)"
            value={formik.values.height}
            onChange={formik.handleChange}
            error={
              formik.touched.height && formik.errors.height
                ? formik.errors.height
                : null
            }
          />
        </Form.Group>

        <Form.Button type="submit" fluid loading={formik.isSubmitting}>
          Registrarse
        </Form.Button>
        {/* Contenedor para las notificaciones */}
        <ToastContainer />
      </Form>
    </div>
  );
};

export default RegisterForm;
