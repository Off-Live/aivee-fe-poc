'use client';

import { Calendar, Clock, Globe, Loader2 } from 'lucide-react';
import moment from 'moment-timezone';
import { ReactNode, useState } from 'react';

import { useAmplitude } from '@/hooks/useAmplitude';
import { useReservationForm } from '@/hooks/useReservationForm';

import ConfirmationDialog from '@/components/ConfirmationDialog';
import ReservationFormFields from '@/components/reservation/ReservationFormFields';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useAuth } from '@/contexts/AuthContext';
import { useAvailability } from '@/contexts/AvailabilityContext';
import { useTimezone } from '@/contexts/TimezoneContext';
import { reservationService } from '@/services/reservation';
import { TimeSlot } from '@/util/availability';
import { createAiveeSignature } from '@/util/signature';
import { formatTimezoneAbbr } from '@/util/timezone';

import { ReservationFormData, ReservationParams } from '@/types/reservation';

interface ReservationDialogProps {
  open: boolean;
  selectedSlot: TimeSlot;
  token: string;
  onOpenChange: (open: boolean) => void;
}

const ReservationDialog = ({
  open,
  selectedSlot,
  token,
  onOpenChange,
}: ReservationDialogProps) => {
  const { logEvent } = useAmplitude();
  const { selectedTimezone } = useTimezone();
  const { user } = useAuth();
  const { availabilityData } = useAvailability();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { formData, setFormData } = useReservationForm(user, availabilityData);

  const formatReservationParams = (
    formData: ReservationFormData,
    selectedSlot: TimeSlot,
    token: string,
  ): ReservationParams => {
    return {
      token,
      summary: formData.summary,
      description: `${formData.desc}\n${createAiveeSignature(formData.email)}`,
      startDate: selectedSlot.startDate.toISOString(),
      endDate: selectedSlot.endDate.toISOString(),
      attendees: [formData.email],
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const params = formatReservationParams(formData, selectedSlot, token);

      await reservationService.makeReservation(params);
      onOpenChange(false);
      setShowConfirmation(true);
      logEvent('Create Event', {
        summary: params.summary,
        description: params.description,
        attendees: params.attendees.join(','),
        startDate: params.startDate,
        endDate: params.endDate,
      });
    } catch (error: unknown) {
      console.error('[Reservation Error]', error);
      const errorMessage = error instanceof Error
        ? error.message
        : 'An unknown error occurred';

      logEvent('Fail Event Creation', {
        error: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmation(false);
    setFormData((prev) => ({
      ...prev,
      summary: '',
      desc: '',
    }));
  };

  const handleConfirmationClosed = () => {
    window.location.reload();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Confirm your details</DialogTitle>
            <div className='flex flex-col md:flex-col gap-x-2 gap-y-1 pt-3'>
              <div>
                <span className='inline-flex items-center gap-1 bg-emphasis rounded px-1 py-0.5 text-sm'>
                  <Calendar size={14} />
                  {moment
                    .tz(selectedSlot.startDate, selectedTimezone)
                    .format('ddd, MMM D, YYYY, h:mm a')}
                </span>
              </div>
              <div>
                <span className='inline-flex items-center gap-1 bg-emphasis rounded px-1 py-0.5 text-sm'>
                  <Globe size={14} />
                  {formatTimezoneAbbr(selectedTimezone)}
                </span>
              </div>
              <div>
                <span className='inline-flex items-center gap-1 bg-emphasis rounded px-1 py-0.5 text-sm'>
                  <Clock size={14} />
                  {availabilityData?.slotDuration}m
                </span>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className='space-y-6 pt-6'>
            <ReservationFormFields
              formData={formData}
              setFormData={setFormData}
              isSubmitting={isSubmitting}
            />

            <DialogFooter>
              <Button
                variant='ghost'
                type='button'
                className='text-text-subtle'
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button
                type='submit'
                className='w-[90px]'
                disabled={isSubmitting}
              >
                {
                  (isSubmitting ? (
                    <div className='flex items-center'>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      <span>Loading</span>
                    </div>
                  ) : (
                    <span>Confirm</span>
                  )) as ReactNode
                }
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={showConfirmation}
        onOpenChange={handleConfirmClose}
        slot={selectedSlot}
        formData={formData}
        onClose={handleConfirmationClosed}
      />
    </>
  );
};

export default ReservationDialog;
