import React from "react";
import ProfileForm from "../components/ProfileForm/ProfileForm";
import { ProfileInfo } from "../components/ProfileInfo/ProfileInfo";
import { ProfileHistory } from "../components/ProfileHistory/ProfileHistory";
import { Tab } from "semantic-ui-react";
import "./profile.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  const handleLogout = async () => {
    try {
      // Mostrar Toast de cierre de sesión
      setTimeout(() => {
        toast.success("¡Sesión cerrada exitosamente!");
      }, 1000);

      // Realizar logout después de mostrar el Toast
      await logout();

      // Redirigir a la página principal después del logout
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const panes = [
    {
      menuItem: "Historial",
      render: () => (
        <Tab.Pane attached={false}>
          <ProfileHistory />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 20,
        icon: "settings",
        content: "Ajustes",
      },
      render: () => (
        <Tab.Pane attached={false}>
          <ProfileForm />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 21,
        icon: "log out",
        content: "Cerrar sesión",
        onClick: handleLogout,
      },
    },
  ];

  return (
    <div className="contentProfile">
        <ProfileInfo />
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
          className='tabs'
        />
    </div>
  );
};

export default Profile;
