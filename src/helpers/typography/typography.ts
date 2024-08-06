import './typography.scss';

export function Typography(context) {
  const { as: tagName, style, className = '' } = context.hash;
  const content = context.fn(this);
  return `<${tagName} class="viChat ${style} ${className}">${content}</${tagName}>`;
}
