// hooks/useReservationForm.ts

import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { AvailabilityData } from "@/util/availability";

export const useReservationForm = (
  user: User | null,
  availabilityData: AvailabilityData,
) => {
  const [formData, setFormData] = useState({
    summary: `${availabilityData?.slotDuration}min meeting`,
    name: "",
    email: "",
    desc: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        summary: `Meeting: ${availabilityData.name} x ${user.displayName}`,
        email: user.email ?? "",
        name: user.displayName ?? "",
      }));
    }
  }, [user, availabilityData.name]);

  return {
    formData,
    setFormData,
  };
};
