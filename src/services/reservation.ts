// services/reservation.ts
import { ReservationParams } from "@/types/reservation";
import { AIVEE_BACKEND_URL } from "@/config/config";

export const reservationService = {
  makeReservation: async (params: ReservationParams) => {
    const response = await fetch(`${AIVEE_BACKEND_URL}/availability/reserve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return data;
  },
};
