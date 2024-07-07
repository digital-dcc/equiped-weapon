---
layout: page.11ty.cjs
title: <weapon-item> ⌲ Home
---

# &lt;weapon-item>

`<weapon-item>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<weapon-item>` is just an HTML element. You can it anywhere you can use HTML!

```html
<weapon-item></weapon-item>
```

  </div>
  <div>

<weapon-item></weapon-item>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<weapon-item>` can be configured with attributed in plain HTML.

```html
<weapon-item name="HTML"></weapon-item>
```

  </div>
  <div>

<weapon-item name="HTML"></weapon-item>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<weapon-item>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;weapon-item&gt;</h2>
    <weapon-item .name=${name}></weapon-item>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;weapon-item&gt;</h2>
<weapon-item name="lit-html"></weapon-item>

  </div>
</section>
