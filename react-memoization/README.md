## Мемоизация в реакте

> **Мемоизация** (запоминание, от англ. memoization) — в программировании сохранение
> результатов выполнения функций для предотвращения повторных вычислений.
> Это один из способов оптимизации, применяемый для увеличения скорости
> выполнения компьютерных программ. Перед вызовом функции проверяется,
> вызывалась ли функция ранее:
>
> - если не вызывалась, то функция вызывается, и результат её выполнения сохраняется;
> - если вызывалась, то используется сохранённый результат.<br>
>
> [Статья на вики](https://ru.wikipedia.org/wiki/Мемоизация)

В Реакте для мемоизации используются 3 метода:

- `React.memo`
- `React.useMemo`
- `React.useCallback`

---

### `React.memo`

`React.memo` — компонент высшего порядка (_High Order Component - HOC_), который позволяет мемоизировать компоненты.
Его следует использовать если компонент всегда рендерит одинаковый результат для одних и тех же пропсов. Это значит,
что **React** будет использовать результат последнего рендера, избегая повтороного рендеринга.

```javascript
const MyComponent = React.memo(function MyComponent(props) {
    /* рендер с использованием пропсов *
})
```

Если компонент использует `useState` или `useContext`, то он будет повторно рендерится при изменении состояния или
контекста.
<br><br>
По умолчанию `React.memo` поверхностно сравнивает вложенные объекты в объекте `props`.<br>
Вторым аргументом в `React.memo` можно передать свою функцию сравнения.

### Пример

```javascript
const App = () => {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  const increaseCounter1 = () => {
    setCount1((count1) => count1 + 1);
  };

  return (
    <>
      <button onClick={increaseCounter1}>Increase counter 1</button>
      <Counter value={count1}>Counter 1</Counter>
      <Counter value={count2}>Coutner 2</Counter>
    </>
  );
};
```

```javascript
const Counter = ({ value, children }) => {
  console.log("Render: ", children);

  return (
    <div>
      {children}: {value}
    </div>
  );
};

export default Counter;
```

Каждый раз при нажатии на кнопку, состояние `count1` меняется, и `App` рендерит заново оба счетчика, что является
излишним рендером.<br><br>
Если мы обернем компонент `Counter` в `React.memo`, то `React.memo` предотвратит излишний рендер второго счетчика.

```javascript
export default React.memo(Counter);
```

Так же можно передать свою функцию сравнения:

```javascript
const areEqual = ((prevProps, nextProps) = {
  /*
     возвращает true если рендер с nextProps вернет тот же результат
     что и рендер с prevProps
     иначе возвращает false
     */
});

export default React.memo(Counter, areEqual);
```

---

### `React.useMemo` и `React.useCallback`

`React.useMemo` и `React.useCallback` являются хуками _(Hook)_, которые принимают первым аргументом функцию, а вторым массив
зависимостей.<br><br>
Главное отличие между ними в том, что `React.useMemo` вызывает функцию и возвращает ее результат, а `React.useCallback`
вернет функцию без ее вызова.

```javascript
React.useMemo(() => {
  fn();
}, [dependencies]);
```

> возвращает fn() — **результат вызова функции**

```javascript
React.useCallback(() => {
  fn();
}, [dependencies]);
```

> возвращает fn — **функцию**

Данные хуки следует использовать для предотвращения повторных, **дорогостоящих** вычислений.

### Примеры

#### `React.useMemo`

```javascript
const SomeSeriousData = () => {
  const calculateSomeSeriousData = (number) => {
    /*
        чистая функция, которая, при одинаковом number,
        всегда выдает один и тот же результат,
        но вычисления занимают 10 секунд
        */
  };

  return <div>{calculateSomeSeriousData()}</div>;
};
```

Воспользуемся `React.useMemo`:

```javascript
const SomeSeriousData = () => {
  const calculateSomeSeriousData = React.useMemo(
    (number) => {
      /*
        чистая функция, которая, при одинаковом number,
        всегда выдает один и тот же результат,
        но вычисления занимают 10 секунд
        */
    },
    [number]
  );

  return <div>{calculateSomeSeriousData()}</div>;
};
```

Теперь когда **React** будет повторно рендерить компонент `SomeSeriousData`, вычисления для `number` (при условии
что он не изменился) производиться не будут, а возьмется готовый результат из памяти.

#### `React.useCallback`

Добавим в `App` из предыдущего примера **callback** для второго счетчика.

```javascript
const App = () => {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  const increaseCounter1 = () => {
    setCount1((count1) => count1 + 1);
  };
  // callback для второго счетчика
  const increaseCounter2 = () => {
    setCount1((count2) => count1 + 1);
  };

  return (
    <>
      <button onClick={increaseCounter1}>Increase counter 1</button>
      <Counter value={count1}>Counter 1</Counter>
      <Counter value={count2}>Coutner 2</Counter>
    </>
  );
};
```

Теперь даже если использовать `React.memo`, `App` будет рендерить `Counter2` каждый раз при изменении
`Counter1`. Это происходит потому, что `React.memo` делает сравнение ссылок, а при рендере `App` каждый раз
создается новая функция (новая ссылка на нее), даже если она не изменилась.<br><br>

Если использовать `React.useCallback` для функций `increaseCounter1` и `increaseCounter2`, то можно снова добиться того,
что `Counter2` не будет рендериться каждый раз при изменении `Counter1`

```javascript
const increaseCounter1 = React.useCallback(() => {
  setCount1((count1) => count1 + 1);
}, []);

const increaseCounter2 = React.useCallback(() => {
  setCount2((count2) => count1 + 1);
}, []);
```

В зависимости ничего не передается, таким образом функции будут созданы только один раз.
