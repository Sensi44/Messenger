export enum EventEnum {
  CLICK = 'click',
  BLUR = 'blur',
  MOUSE_OVER = 'mouse_over',
  DATA_SENT = 'dataSent',
  // INIT = 'init',
  // FLOW_CDM = 'flow:component-did-mount',
  // FLOW_RENDER = 'flow:render',

  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_UNM = 'flow:component-un-mount',
  FLOW_RENDER = 'flow:render',
}
