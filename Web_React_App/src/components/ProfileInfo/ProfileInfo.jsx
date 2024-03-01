import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button, Icon } from "semantic-ui-react";
import { DateTime } from "luxon";
import styles from "./ProfileInfo.scss";

export function ProfileInfo() {
  const { user } = useAuth();


  return (
    <div className="info">
      <Button icon className="iconUser">
        <Icon name="user outline" />
      </Button>
      <h2 className="title">Perfil de usuario</h2>
      <h3 className="username">@{user.username}</h3>
      <h4 className="name">
        {user.firstname} {user.lastname}
      </h4>
      <h4 className="email">{user.email}</h4>
      <p className="createdAt">
        Miembro desde:{" "}
        {DateTime.fromISO(user.createdAt, { locale: "es" }).toFormat("DDD")}
      </p>
      <h3>Datos personales</h3>
      <div className="user-personal-data">
      <p>Edad: {user.age}</p>
      <p>Peso: {user.weight}</p>
      <p>Altura: {user.height}</p>
      </div>
    </div>
  );
}
