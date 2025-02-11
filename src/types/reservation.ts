// types/reservation.ts
export interface ReservationParams {
  token: string;
  summary: string;
  description: string;
  startDate: string;
  endDate: string;
  attendees: string[];
}

export interface ReservationFormData {
  summary: string;
  name: string;
  email: string;
  desc: string;
}
