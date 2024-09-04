import Block from '../block.ts';
interface PageComponent<P extends Record<string, unknown> = Record<string, unknown>> {
  new (props: P): Block<P>;
}

type routeProps = {
  rootQuery: string;
};

class Route {
  _pathname: string;
  _blockClass: PageComponent;
  _props;
  _block: Block<Record<string, unknown>, {}> | null;

  constructor(pathname: string, view: PageComponent, props: routeProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
    this._block = null;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  _renderDom(query: string, block: Block<Record<string, unknown>, {}>) {
    const root = document.getElementById(query);
    // console.log(root);
    if (root) {
      root.append(block.getContent() as HTMLElement);
    } else {
      console.warn(`Page content is undefined`);
    }
  }

  render() {
    if (!this._block) {
      // const props = this._props.componentProps || {};
      this._block = new this._blockClass({});
      this._renderDom(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

export default Route;
