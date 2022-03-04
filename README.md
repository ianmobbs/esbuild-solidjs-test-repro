# esbuild-solidjs-test

This repository is meant to reproduce an issue when attempting to use `--jsx-factory=document.createElement`.
The root of the issue is that I am not using React when building the frontend.
When attempting to use `esbuild` without specifying a `jsx-factory` (`yarn build-with-react`), I am greeted with the following error:
```
app.js:799 Uncaught ReferenceError: React is not defined
    at app.js:799:38
    at app.js:648:55
    at app.js:41:31
    at runUpdates (app.js:384:14)
    at createRoot (app.js:41:14)
    at render (app.js:646:5)
    at app.js:799:3
    at app.js:800:3
```
as `esbuild` generates the following code:
```
  // index.tsx
  var App = () => {
    return /* @__PURE__ */ React.createElement("p", {
      class: "text-center"
    }, "Hello, world!");
  };
  render(() => /* @__PURE__ */ React.createElement(App, null), document.getElementById("root"));
```

When attempting to use `document.createElement` as the JSX factory, per [this issue](https://github.com/solidjs/solid/issues/102),
I am greeted with the following error:
```
Uncaught DOMException: Failed to execute 'createElement' on 'Document': The tag name provided ('() => {
    return /* @__PURE__ */ document.createElement("p", {
      class: "text-center"
    }, "Hello, world!");
  }') is not a valid name.
    at http://127.0.0.1:8000/app.js:799:41
    at http://127.0.0.1:8000/app.js:648:55
    at http://127.0.0.1:8000/app.js:41:31
    at runUpdates (http://127.0.0.1:8000/app.js:384:14)
    at createRoot (http://127.0.0.1:8000/app.js:41:14)
    at render (http://127.0.0.1:8000/app.js:646:5)
    at http://127.0.0.1:8000/app.js:799:3
    at http://127.0.0.1:8000/app.js:800:3
```
as `esbuild` generates the following code:
```
  // index.tsx
  var App = () => {
    return /* @__PURE__ */ document.createElement("p", {
      class: "text-center"
    }, "Hello, world!");
  };
  render(() => /* @__PURE__ */ document.createElement(App, null), document.getElementById("root"));
```

Which is odd, as it's calling `createElement` correctly in `App()`, but not in `render()`.