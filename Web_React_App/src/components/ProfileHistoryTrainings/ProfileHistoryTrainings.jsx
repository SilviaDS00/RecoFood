import { useAuth } from "../../hooks/useAuth";
import React, { useState, useEffect } from "react";
import { HistoryTraining } from "../../api/history-training";
import { map } from "lodash";
import { TrainingComponent } from "./TrainingComponent/TrainingComponent";

const historyCtrl = new HistoryTraining();

export function ProfileHistoryTrainings() {
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
        <TrainingComponent key={hist.id} history={hist} />
      ))}
    </div>
  );
}
