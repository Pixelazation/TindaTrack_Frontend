import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from './calendar';

interface Props {
  className?: string;
  date: Date | undefined;
  setDate: (date: Date) => void;
}

export function DatePicker(props: Props) {
  const [open, setOpen] = useState(false);

  const { className, date, setDate } = props;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={className}>
        <Button
          variant="outline"
          id="date"
          className="w-32 justify-between font-normal"
        >
          {date ? date.toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date: Date | undefined) => {
            if (date) setDate(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  )
}