// components/reservation/FormFields.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReservationFormData } from "@/types/reservation";

interface ReservationFormFieldsProps {
  formData: ReservationFormData;
  setFormData: (data: ReservationFormData) => void;
  isSubmitting: boolean;
}

export const ReservationFormFields = ({
  formData,
  setFormData,
  isSubmitting,
}: ReservationFormFieldsProps) => {
  return (
    <div className="grid gap-5">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="summary" className="text-text">
          Event summary *
        </Label>
        <Input
          id="summary"
          className="input"
          value={formData.summary}
          onChange={(e) =>
            setFormData({ ...formData, summary: e.target.value })
          }
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="grid w-full gap-1.5">
        <Label htmlFor="name" className="text-text">
          Your name *
        </Label>
        <Input
          id="name"
          className="input"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="grid w-full gap-1.5">
        <Label htmlFor="email" className="text-text">
          Email address *
        </Label>
        <Input
          id="email"
          type="email"
          className="input"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="grid w-full gap-1.5">
        <Label htmlFor="description" className="text-text">
          Add notes
        </Label>
        <Textarea
          id="description"
          className="textarea text-sm placeholder:text-opacity-10"
          value={formData.desc}
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          rows={3}
          placeholder="Please share anything that will help prepare for the meeting"
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
};

export default ReservationFormFields;
