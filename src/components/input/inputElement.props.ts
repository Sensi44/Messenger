export interface IInputElement {
  error?: string;
  class?: string;
  label?: string;
  name: string;
  type?: 'text' | 'submit';
  events: {
    blur?: (e: FocusEvent) => void;
    input?: (e: InputEvent) => void;
  };
}
