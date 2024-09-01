import Block, { BlockProps } from '../../modules/block';

class Link extends Block {
  constructor(props: BlockProps<unknown>) {
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
