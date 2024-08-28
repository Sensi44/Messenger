export interface IInput {
  label?: string;
  name: string;
  type?: string;
  dataName?: string;
  labelClass?: string;
  value?: string;
  blur?: (e: FocusEvent) => void;
  onChange?: (e: InputEvent) => void;
}

type events = {
  blur?: (e: FocusEvent) => void;
  input?: (e: InputEvent) => void;
};

export interface ITest {
  label?: string;
  name: string;
  type?: string;
  value?: string;
  dataName?: string;
  labelClass?: string;
  events?: events;
}
