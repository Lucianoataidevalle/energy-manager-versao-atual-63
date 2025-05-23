import { Input } from "@/components/ui/input";
import { ComponentPropsWithoutRef } from "react";
import { formatNumberInput, parseFormattedNumber } from "@/utils/numberFormat";

type NumberInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
  allowSpecialChars?: boolean;
};

export const NumberInput = ({ 
  value, 
  onChange, 
  allowSpecialChars = false,
  ...props 
}: NumberInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (allowSpecialChars) {
      // Allow numbers and special characters (/, -)
      if (newValue === "" || /^[0-9/\-]*$/.test(newValue)) {
        onChange(newValue);
      }
    } else {
      // Allow numbers, commas, dots, and minus sign
      if (newValue === "" || /^-?\d*\.?\d*,?\d*$/.test(newValue)) {
        onChange(newValue);
      }
    }
  };

  return (
    <Input
      {...props}
      type="text"
      value={value}
      onChange={handleChange}
    />
  );
};