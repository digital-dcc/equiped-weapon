---
layout: page.11ty.cjs
title: <equipped-weapon> ⌲ Home
---

# &lt;equipped-weapon>

`<equipped-weapon>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<equipped-weapon>` is just an HTML element. You can it anywhere you can use HTML!

```html
<equipped-weapon></equipped-weapon>
```

  </div>
  <div>

<equipped-weapon></equipped-weapon>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<equipped-weapon>` can be configured with attributed in plain HTML.

```html
<equipped-weapon name="HTML"></equipped-weapon>
```

  </div>
  <div>

<equipped-weapon name="HTML"></equipped-weapon>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<equipped-weapon>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;equipped-weapon&gt;</h2>
    <equipped-weapon .name=${name}></equipped-weapon>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;equipped-weapon&gt;</h2>
<equipped-weapon name="lit-html"></equipped-weapon>

  </div>
</section>
