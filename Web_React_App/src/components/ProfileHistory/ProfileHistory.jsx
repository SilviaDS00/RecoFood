import { useAuth } from "../../hooks/useAuth";
import React, {useState, useEffect} from "react";
import { History } from "../../api/history";
import {map} from "lodash";
import { FoodComponent } from "./FoodComponent/FoodComponent";

const historyCtrl = new History();

export function ProfileHistory() {
  const [history, setHistory] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    (async() => {
      try {
        const response = await historyCtrl.getHistory(user.id);
        console.log(response);
        setHistory(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!history) return <div>Historial vacío</div>;

  return (
    <div >

          {map(history, (hist) => (
            <FoodComponent key={hist.id} history={hist} />
          ))}

    </div>
  );
}
