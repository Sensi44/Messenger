class Block {
  getContent() {}
  // стоит дать другое название, либо понять
  // как это будет работать с тем что у меня в Block

  show() {
    console.log('show');
  }

  hide() {
    console.log('hide');
  }
}

// class Button extends Block {
//   getContent(): string {
//     return 'Button';
//   }
// }

function isEqual(lhs, rhs) {
  return lhs === rhs;
}

function render(query, block) {
  console.log(block, '!');
  // const [Source, context] = block;
  // root.textContent = block.getContent();
  // return root;
  const container = document.getElementById(query);
  if (container) {
    console.log('?');
    container.innerHTML = '';
    const content = block.getContent();
    container.append(content);
  }

}

class Route {
  _pathname;
  _blockClass;
  _block: any;
  _props;

  constructor(pathname: string, view, props) {
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
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      console.log(this._blockClass);
      // const [Source, context] = this._blockClass;
      // console.log('Source:', Source, 'Context: ', context);
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

// const route = new Route('/buttons', Button, {
//   rootQuery: '.app',
// });
//
// route.render();
//
// console.log(route._pathname, route._props);
//
// route.navigate('/buttons');
// route.navigate('/trash');
// route.leave();

// export default Route;
