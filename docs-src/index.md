---
layout: page.11ty.cjs
title: <hit-points> ⌲ Home
---

# &lt;hit-points>

`<hit-points>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<hit-points>` is just an HTML element. You can it anywhere you can use HTML!

```html
<hit-points></hit-points>
```

  </div>
  <div>

<hit-points></hit-points>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<hit-points>` can be configured with attributed in plain HTML.

```html
<hit-points name="HTML"></hit-points>
```

  </div>
  <div>

<hit-points name="HTML"></hit-points>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<hit-points>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;hit-points&gt;</h2>
    <hit-points .name=${name}></hit-points>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;hit-points&gt;</h2>
<hit-points name="lit-html"></hit-points>

  </div>
</section>
