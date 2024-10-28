export type Indexed<T = unknown> = {
  [key: string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const result: Indexed = { ...lhs }; // Начинаем с копии lhs

  for (const key in rhs) {
    // Проверяем, является ли ключ свойством объекта rhs
    if (Object.prototype.hasOwnProperty.call(rhs, key)) {
      if (
        Object.prototype.hasOwnProperty.call(lhs, key) &&
        typeof lhs[key] === 'object' &&
        typeof rhs[key] === 'object'
      ) {
        // Если оба значения являются объектами, объединяем их рекурсивно
        result[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
      } else {
        // Иначе просто берем значение из rhs
        result[key] = rhs[key];
      }
    }
  }

  return result;
}

export default merge;

// Пример использования
// const mergedResult = merge({ a: { b: { a: 2 } }, d: 5 }, { a: { b: { c: 1 } } });
// console.log(mergedResult);
/*
{
  a: {
    b: {
      a: 2,
      c: 1,
    }
  },
  d: 5,
}
*/

// Вы реализовали функцию merge!
// Очередную полезность можно добавить в свою коллекцию хелперов.
// Есть два способа реализации этой функции: через рекурсию и стек (можно использовать обычный массив).
// Реализация через рекурсию –– эффективное решение, к которому часто прибегают.
// Но если известно, что вложенность может быть довольно большой,
// то есть риск достичь максимальной глубины рекурсии (количество вложенных вызовов),
// которая определяется JavaScript-движком, и получить ошибку выполнения.
// В таком случае стоит использовать реализацию на основе стека.
// Авторское решение https://playcode.io/874524/

// function merge2(lhs: Indexed, rhs: Indexed): Indexed {
//   for (const p in rhs) {
//     if (!rhs.hasOwnProperty(p)) {
//       continue;
//     }
//
//     try {
//       if (rhs[p].constructor === Object) {
//         rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
//       } else {
//         lhs[p] = rhs[p];
//       }
//     } catch (e) {
//       lhs[p] = rhs[p];
//     }
//   }
//
//   return lhs;
// }
