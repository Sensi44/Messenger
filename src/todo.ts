//todo не забыть реализовать метод componentDidUnmount - так как нам необходимо каждый раз как первый раз при переходах

// merge({ a: { b: { a: 2 } }, d: 5 }, { a: { b: { c: 1 } } });
/*
Как хотелось бы:

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