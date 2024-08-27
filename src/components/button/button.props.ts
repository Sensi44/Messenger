export interface IButtonProps {
  type: string;
  classname?: string;
  label: string;
  submit: (e: SubmitEvent) => void;
  events?: {
    click: (e: SubmitEvent) => void;
  };
}
