export interface IInput {
  label?: string;
  name: string;
  type?: string;
  dataName?: string;
  labelClass?: string;
  class?: string;
  id?: string;
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
  id?: string;
  value?: string;
  dataName?: string;
  labelClass?: string;
  class?: string;
  events?: events;
}
