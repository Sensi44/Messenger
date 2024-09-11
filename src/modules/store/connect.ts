import { StoreEvents } from './store.ts';
import isEqual from '../../utils/isEqual.ts';
import Block, { BlockProps } from '../block.ts';

import type { PageComponent } from '../router/router.ts';
// import type { SomeObject } from '../../types/commonTypes.ts';
// const type TMapStateToProps = (SomeObject) => SomeObject;

export function connect(
  mapStateToProps: (props: BlockProps) => BlockProps,
  dispatch?
) {
  return function (Component: PageComponent) {
    return class extends Component {
      readonly onChangeStoreCallback: () => void;
      constructor(props: BlockProps) {
        console.log(props);
        const store = window.store;
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        const dispatchHandler = {};
        Object.entries(dispatch || {}).forEach(([key, hundler]) => {
          dispatchHandler[key] = (...args) => {
            return hundler(window.store.set.bind(window.store), ...args);
          };
        });

        this.setProps({ ...dispatchHandler });

        this.onChangeStoreCallback = () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        };

        // подписываемся на событие
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
