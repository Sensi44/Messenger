import Block from '../../modules/block.ts';
// Ваш реализованный шаблонизатор
import { compile } from '../../modules/compile.ts';

import { template } from './template.ts';

export default class Button extends Block {
  constructor(props) {
    // Создаём враппер DOM-элемент button
    super('button', props);
  }

  render() {
    // В данном случае render возвращает строкой разметку из шаблонизатора
    return compile(template, this.props);
  }
}
