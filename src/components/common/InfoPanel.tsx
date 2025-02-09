// components/InfoPanel.tsx
import React from "react";
import { Clock, Video } from "lucide-react";
import { useAvailability } from "@/context/AvailabilityContext";
import TimezoneSelector from "@/components/common/TimezoneSelector";

export default function InfoPanel() {
  const { availabilityData } = useAvailability();
  return (
    <div className="bg-transparent p-5 flex flex-col items-start gap-4 md:w-[240px] lg:w-[280px] w-full md:h-full h-auto">
      <div className="space-y-3">
        {/*profile zone*/}
        <div className="space-y-2 px-1">
          <div className="h-7 w-7 rounded-full bg-[#8B5CF6]" />

          <div className="text-sm text-text-subtle font-medium">
            {availabilityData.name}
          </div>

          <div className="text-xl font-semibold text-text">
            {availabilityData.slotDuration} Min Meeting
          </div>
        </div>

        <div className="space-y-4 px-1">
          <div className="flex items-center space-x-2 text-text">
            <Clock size={16} />
            <span className="text-sm">{availabilityData.slotDuration} m</span>
          </div>

          <div className="flex items-center space-x-2 text-text">
            <Video size={16} />
            <span className="text-sm">Google Meet</span>
          </div>
        </div>

        <TimezoneSelector />
      </div>
    </div>
  );
}
