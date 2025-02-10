import { Calendar, Globe, Mail } from 'lucide-react';
import moment from 'moment-timezone';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useAvailability } from '@/context/AvailabilityContext';
import { useTimezone } from '@/context/TimezoneContext';
import { TimeSlot } from '@/util/availability';
import { formatTimezone } from '@/util/timezone';

import { ReservationFormData } from '@/types/reservation';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slot: TimeSlot;
  formData: ReservationFormData;
  onClose?: () => void;
}

const ConfirmationDialog = ({
  open,
  onOpenChange,
  slot,
  formData,
  onClose,
}: ConfirmDialogProps) => {
  const { selectedTimezone } = useTimezone();
  const { availabilityData } = useAvailability();

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open && onClose) {
      setTimeout(() => {
        onClose();
      }, 100);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-text-emphasis'>
            <div className='h-8 w-8 bg-success rounded-full flex items-center justify-center'>
              <Calendar className='h-4 w-4 text-text-success' />
            </div>
            Meeting is scheduled
          </DialogTitle>
          <p className='text-sm text-text-subtle mt-2'>
            We sent an email with a calendar invitation with the details to
            everyone.
          </p>
        </DialogHeader>

        <div className='py-6'>
          <h3 className='font-medium mb-2 text-text-emphasis'>
            {formData.summary}
          </h3>

          <div className='space-y-3'>
            <div className='flex items-start gap-3 text-sm'>
              <Calendar className='h-4 w-4 mt-0.5 text-text' />
              <div>
                <p className='text-text'>
                  {moment
                    .tz(slot.startDate, selectedTimezone)
                    .format('dddd, MMMM D, YYYY')}
                </p>
                <p className='text-text'>
                  {moment.tz(slot.startDate, selectedTimezone).format('h:mm a')}{' '}
                  - {moment.tz(slot.endDate, selectedTimezone).format('h:mm a')}
                </p>
              </div>
            </div>

            <div className='flex items-center gap-3 text-sm'>
              <Globe className='h-4 w-4 text-text' />
              <p className='text-text'>{formatTimezone(selectedTimezone)}</p>
            </div>

            <div className='flex gap-3 text-sm'>
              <Mail className='h-4 w-4 text-text mt-1' />
              <div className='space-y-1'>
                <p className='text-text'>{availabilityData.email}</p>
                <p className='text-text'>{formData.email}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
