export function logProps(thisContext: any) {
  console.log('Пропсы:', thisContext.data.root);
  console.log('hash:', thisContext.hash);
}