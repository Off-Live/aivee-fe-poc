'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useAmplitude } from '@/hooks/useAmplitude';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { AIVEE_HOME_URL } from '@/config/config';
import { useAuth } from '@/contexts/AuthContext';

interface OverlaySwitchProps {
  showGuestCalendar: boolean;
  setShowGuestCalendar: (show: boolean) => void;
}

export default function OverlaySwitch({
  showGuestCalendar,
  setShowGuestCalendar,
}: OverlaySwitchProps) {
  const { logEvent } = useAmplitude();
  const { user, signInWithGoogle } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isProcessing && user != null) {
      setShowGuestCalendar(true);
      setIsProcessing(false);
    }
  }, [isProcessing, user, setShowGuestCalendar]);

  const handleSwitchChange = (checked: boolean) => {
    if (checked && !user) {
      setShowDialog(true);
      logEvent('Overlay My Calendar', {
        authenticated: 'false',
      });
      return;
    }
    setShowGuestCalendar(checked);
    logEvent(checked ? 'Overlay My Calendar' : 'Disoverlay My Calendar');
  };

  return (
    <>
      <div className='flex items-center space-x-2'>
        <Switch
          checked={showGuestCalendar}
          onCheckedChange={handleSwitchChange}
          className='h-6 w-11 data-[state=checked]:bg-emphasis
                     [&>span]:h-4 [&>span]:w-4 [&>span]:bg-inverted
                     [&>span]:dark:bg-inverted
                     [&>span]:translate-x-0.5
                     data-[state=checked]:[&>span]:translate-x-5'
        />
        <Label className='text-sm text-text-subtle'>Overlay my calendar</Label>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className='sm:max-w-[480px] bg-default border-border'>
          <DialogHeader className='text-left'>
            <DialogTitle className='text-lg text-inverted '>
              Overlay my calendar
            </DialogTitle>
            <DialogDescription className='text-text-subtle mt-2'>
              By connecting to your calendar, you accept our{' '}
              <Link
                href={`${AIVEE_HOME_URL}/privacy-policy`}
                className='text-inverted hover:underline'
                target='_blank'
                rel='noopener noreferrer'
              >
                privacy policy
              </Link>{' '}
              and{' '}
              <Link
                href={`${AIVEE_HOME_URL}/terms-of-use`}
                className='text-inverted hover:underline'
                target='_blank'
                rel='noopener noreferrer'
              >
                terms of use
              </Link>
              . You may revoke access at any time.
            </DialogDescription>
          </DialogHeader>

          <div className='mt-8'>
            <button
              className='w-full flex items-center justify-center gap-2 h-9 px-3
                       bg-inverted bg-opacity-85 text-text-inverted rounded-md
                       transition-colors hover:bg-emphasis/80'
              onClick={() => {
                signInWithGoogle();
                setShowDialog(false);
                setIsProcessing(true);
              }}
            >
              <Image
                src='/google.svg'
                alt='Google'
                width={16}
                height={16}
                priority
              />
              <span>Continue with Google</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
