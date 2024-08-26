import Block from '../../modules/block';

class Link extends Block {
  constructor(props) {
    super(props);
  }

  render() {
    return `
      <a href={{url}} data-page={{url}} class="{{class}}">
        {{ text }}
      </a>
    `;
  }
}

export default Link;
