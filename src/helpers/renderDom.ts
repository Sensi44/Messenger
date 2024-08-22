export function render(query, block) {
  const root = document.querySelector(query);
  // Можно завязаться на реализации вашего класса Block
  root.appendChild(block.getContent());
  console.log('первичное монтирование в главном файле #app -> getContent()');

  block.dispatchComponentDidMount();

  return root;
}
