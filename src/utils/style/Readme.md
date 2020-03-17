# API

`provideVariant: (propName: string, varaints: Object, defaultValue: string | (props) => string) => () => string | () => (props) => string`

`provideVariant` return function which return css value based on `propName` and `varaints`.

**Example**

```js
  const colorVariant = provideVariant(
    'type',
    {
      primary: 'blue',
      danger: ({ theme }) => theme.color.red,
      secondary: ({ theme }) => theme.color.green
    },
    ({ theme }) => theme.color.white
  );

  const Button = styled.button`
    background-color: ${colorVariant};
  `;

  // render

  <Button type="primary" /> // blue
  <Button type="danger" /> // red
  <Button type="secondary" /> // green

  <Button /> // white

```
