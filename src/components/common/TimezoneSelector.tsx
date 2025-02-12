import { ChevronDown, Globe } from 'lucide-react';
import moment from 'moment-timezone';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useAmplitude } from '@/hooks/useAmplitude';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { useTimezone } from '@/contexts/TimezoneContext';
import { formatTimezone, formatTimezoneAbbr } from '@/util/timezone';

const TimezoneSelector = () => {
  const { logEvent } = useAmplitude();
  const { selectedTimezone, setSelectedTimezone } = useTimezone();
  const [open, setOpen] = React.useState(false);
  const commandGroupRef = useRef<HTMLDivElement | null>(null);

  const sortedTimezones = useMemo(() => {
    try {
      const tzs = moment.tz.names() || [];
      return tzs
        .filter((tz) => !tz.startsWith('Etc/'))
        .sort((a, b) => {
          const offsetA = moment.tz(a).utcOffset();
          const offsetB = moment.tz(b).utcOffset();
          return offsetA - offsetB; // Descending order (GMT+14 to GMT-12)
        });
    } catch (error) {
      console.error('Error loading timezones:', error);
      return [];
    }
  }, []);

  const handleOpen = useCallback(
    (value: boolean, newTimezone?: string) => {
      setOpen(value);
      const properties: Record<string, string> | undefined = newTimezone ? { timezone: newTimezone } : undefined;
      logEvent(value ? 'Open Timezone' : 'Close Timezone', properties);
    },
    [setOpen, logEvent],
  );

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        const selectedItem = document.querySelector(
          `[data-value="${selectedTimezone}"]`,
        );
        if (selectedItem) {
          selectedItem.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open, selectedTimezone]);

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          role='combobox'
          aria-expanded={open}
          className='w-48 justify-start bg-transparent text-text hover:bg-emphasis hover:text-text px-1'
        >
          <Globe size={16} />
          <span className='truncate'>
            {formatTimezoneAbbr(selectedTimezone)}
          </span>
          <ChevronDown size={12} className='ml-1' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-48 p-0'>
        <Command className='bg-muted'>
          <CommandInput
            placeholder='Search city...'
            className='h-9 bg-muted placeholder:text-text-muted'
          />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandGroup
              ref={commandGroupRef}
              className='max-h-64 overflow-auto'
            >
              {sortedTimezones.map((timezone) => (
                <CommandItem
                  key={timezone}
                  value={timezone}
                  onSelect={(currentValue) => {
                    setSelectedTimezone(currentValue);
                    handleOpen(false, currentValue);
                  }}
                  className={`cursor-pointer ${
                    timezone === selectedTimezone
                      ? 'bg-emphasis hover:bg-emphasis text-text-emphasis'
                      : 'bg-muted text-text-subtle hover:text-emphasis'
                  }`}
                  data-value={timezone}
                >
                  {formatTimezone(timezone)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TimezoneSelector;
