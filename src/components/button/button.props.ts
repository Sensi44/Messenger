export interface IButtonProps {
  type?: string;
  className?: string;
  label?: string;
  submit?: (e: MouseEvent) => void;
  // click?: (e: MouseEvent) => void;
  events?: {
    click?: (e: MouseEvent) => void;
  };
}

