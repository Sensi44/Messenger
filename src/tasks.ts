// export const namespace = (a: string): object => {
//   const arrayOfString = a.split('.');
//
//   return arrayOfString.reduceRight((acc, elem, currentIndex) => {
//     return {
//       [elem]: { ...acc },
//     };
//   }, {});
// };
// console.log('a');
//
//
//
//
// type Nullable<T> = T | null;
//
// const text: Nullable<HTMLDivElement> = document.getElementById('text') as HTMLDivElement;
//
// const input: Nullable<HTMLInputElement> = document.getElementById('input') as HTMLInputElement;
//
// if (!text || !input) {
//   throw new Error('нет полей');
// }
//
// const data = {
//   title: '',
// };
//
// Object.defineProperty(data, 'title', {});
//
// export default Nullable;
