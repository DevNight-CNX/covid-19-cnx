# API

Promise based HTTP client that wrap `fetch` for easy use

`fetchGet(url: string, queryString: Object, options: { isAuth: boolean, token: string }) => Promise`

`fetchPost(url: string, body: Object, options: { isAuth: boolean, token: string }) => Promise`

`fetchPut(url: string, body: Object, options: { isAuth: boolean, token: string }) => Promise`

`fetchDelete(url: string, queryString: Object, options: { isAuth: boolean, token: string }) => Promise`

All these function return same response object.

**Example**

```js
/*
  assume api service return data as below

  {
    name: 'John',
    lastname: 'Doe',
    age: 30
  }

*/

fetchGet('http://api.com/user', { size: 10, offset: 0 }).then(response => {
  console.log(response.name); //John
  console.log(response.lastname); //Doe
  console.log(response.age); //30
  console.log(response.response); // Response https://developer.mozilla.org/en-US/docs/Web/API/Response
});

/*
  assume api service return data as below

  [
    'John',
    'William',
    'Louise
  ]

*/

fetchPost('http://api.com/user', { size: 10, offset: 0 }).then(response => {
  console.log(response.data); //['John', 'William', 'Louise']
  console.log(response.response); // Response https://developer.mozilla.org/en-US/docs/Web/API/Response
});
```

**Authorization**

You can provide Authorization header via options parameter. When you provide `isAuth` as `true`, it will inject token from localstorage which key is `token`. You also can provide token explictly with `token` option.

```js
/*
  assume localstorage which key is`token` has value as below

  my-api-token

*/

fetchPut('http://api.com/user', { size: 10, offset: 0 }, { isAuth: true });

// Authorization: Bearer my-api-token

fetchDelete(
  'http://api.com/user',
  { size: 10, offset: 0 },
  { isAuth: true, token: 'overide-my-token' }
);

// Authorization: Bearer overide-my-token
```
