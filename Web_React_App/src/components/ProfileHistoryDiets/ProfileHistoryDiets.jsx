import { useAuth } from "../../hooks/useAuth";
import React, { useState, useEffect } from "react";
import { HistoryDiet } from "../../api/history-diet";
import { map } from "lodash";
import { DietComponent } from "./DietComponent/DietComponent";

const historyCtrl = new HistoryDiet();

export function ProfileHistoryDiets() {
  const [history, setHistory] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await historyCtrl.getHistory(user.id);
        setHistory(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!history ? <div>Historial vacío</div> : <></>}
      {map(history, (hist) => (
        <DietComponent key={hist.id} history={hist} />
      ))}
    </div>
  );
}
