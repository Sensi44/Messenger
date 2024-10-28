import { StoreEvents } from './store.ts';
import isEqual from '../../utils/isEqual.ts';
// import { BlockProps } from '../block.ts';

import type { PageComponent } from '../router/router.ts';
import type { StoreState } from './store.types.ts';
import { BlockProps } from '../block.ts';
// import type { SomeObject } from '../../types/commonTypes.ts';
// const type TMapStateToProps = (SomeObject) => SomeObject;

export function connect<StateProps extends Record<string, unknown>>(
  mapStateToProps: (props: StoreState) => StateProps
  // dispatch?
) {
  return function (Component: PageComponent) {
    return class extends Component {
      readonly onChangeStoreCallback: (firstRender?: boolean) => void;

      constructor(props: BlockProps) {
        const store = window.store;
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState() as StoreState);
        super({ ...props, ...state });

        // const dispatchHandler = {};
        // Object.entries(dispatch || {}).forEach(([key, hundler]) => {
        //   dispatchHandler[key] = (...args) => {
        //     return hundler(window.store.set.bind(window.store), ...args);
        //   };
        // });
        // console.log(this);
        // this.setProps({ ...dispatchHandler });

        this.onChangeStoreCallback = (firstRender: boolean = false) => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState() as StoreState);
          // console.log('connect');
          // console.log('connectProps', props);
          // console.log('connectState', state);
          // console.log('connectNewState', newState);

          if (firstRender) {
            this.setProps({ ...newState });
          }

          //todo надо её расширить чтоб с массивами корректно работала
          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        };

        // подписываемся на событие
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
        //todo запомни это место, сомнительное возможно решение
        this.onChangeStoreCallback(true);
      }

      componentWillUnmount() {
        super.componentUnMount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
