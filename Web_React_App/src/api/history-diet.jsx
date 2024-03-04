import { ENV } from "../utils/constant";
import { authFetch } from "../utils/authFetch";

export class HistoryDiet {
  async getHistory(userId) {
    try {
      const filters = `filters[user][id][$eq]=${userId}`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.HISTORY_DIETS}?${filters}`;

      const response = await authFetch(url);
      const result = await response.json();
      if (response.status !== 200) {
        throw result;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async add(userId, diet) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.HISTORY_DIETS}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          "data":{
            "user": userId,
            "diet": diet,
          }
        }),
      };
      const response = await authFetch(url, params);
      const result = await response.json();
      if (response.status !== 200) {
        throw result;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}
