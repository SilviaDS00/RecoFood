import { useAuth } from "../../hooks/useAuth";
import { Button, Icon } from "semantic-ui-react";
import { DateTime } from "luxon";
// import styles fromProfileInfo.scss";

export function ProfileHistory() {
  const { user } = useAuth();

  return (
    <div >
      {/* <Button icon className={styles.iconUser}>
        <Icon name="user outline" />
      </Button> */}
      <h3>@{user.username}</h3>
      <h4 >{user.firstname} {user.lastname}</h4>
      <h4>{user.email}</h4>
      <p>
        Miembro desde:{" "}
        {DateTime.fromISO(user.createdAt, { locale: "es" }).toFormat("DDD")}
      </p>
    </div>
  );
}
