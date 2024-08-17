import eventBus from '../../eventBus/eventBus.ts';
import { EventEnum } from '../../eventBus/eventBus.types.ts';

export function initializeTestPage() {
  console.log('init');
  document.getElementById('sendData')?.addEventListener('click', () => {
    const inputData = (document.getElementById('dataInput') as HTMLInputElement).value;
    eventBus.emit(EventEnum.DATA_SENT, inputData);
  });

  eventBus.on(EventEnum.DATA_SENT, (data) => {
    if (document.getElementById('displayData')) {
      document.getElementById('displayData').innerText = data;
    }
  });
}
