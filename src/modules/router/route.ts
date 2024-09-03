import Block, { ComponentChildren } from '../block.ts';

class Route {
  _pathname: string;
  _blockClass: Block<object>;
  _props;
  _block: ComponentChildren | null;

  constructor(pathname: string, view: Block<object>, props: object) {
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

  _renderDom(query: string, block) {
    const root = document.getElementById(query);
    if (root) {
      root.append(block.getContent());
    }
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({ ...this._props.componentProps });
      this._renderDom(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

export default Route;
