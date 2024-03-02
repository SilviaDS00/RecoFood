import React, { useState } from "react";
// import * as styles from "./Account.module.scss";
// import { Button } from "semantic-ui-react";
// import { useRouter } from "next/router";
// import { useAuth } from "@/hooks";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightToBracket, faUser, faSpinner } from "@fortawesome/free-solid-svg-icons";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "./ImageUploadComponent.scss";


const Account = () => {
  // const { user, logout } = useAuth();
  // const router = useRouter();
  // const [loading, setLoading] = useState(false);

  // const goToLogin = () => router.push("/join/sign-in");
  // const goToAccount = () => router.push("/account");

  // function logOut() {
  //   setLoading(true);

  //   setTimeout(() => {
  //     logout();
  //     setLoading(false);
  //     // Mostrar mensaje de cerrar sesión exitoso
  //     toast.success("¡Sesión cerrada exitosamente!");
  //     // Redirigir al usuario al inicio después de unos segundos
  //     setTimeout(() => {
  //       router.push("/");
  //     }, 3000);
  //   }, 1000);
  // }

  return (
    <div>
      hola
      {/* {!user && (
        <Button icon className={styles.user} onClick={goToLogin}>
          <FontAwesomeIcon icon={faUser} />
        </Button>
      )}

      {user && (
        <Button icon className={styles.user} onClick={goToAccount}>
          <FontAwesomeIcon icon={faUser} />
        </Button>
      )}

      {user && (
        <Button icon className={styles.user} onClick={logOut}>
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faRightToBracket} />
          )}
        </Button>
      )}

      <ToastContainer /> */}
    </div>
  );
}

export default Account;
