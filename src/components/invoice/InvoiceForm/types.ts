import { ConsumerUnit as ContextConsumerUnit } from '@/contexts/types';

export type ConsumerUnit = ContextConsumerUnit;

export interface InvoiceFormProps {
  onCompanyChange: (company: string) => void;
  onUnitChange: (unit: string) => void;
}